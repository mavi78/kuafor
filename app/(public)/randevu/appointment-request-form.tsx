"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { WorkingHours, SpecialWorkingDay } from "@prisma/client";
import { appointmentRequestSchema } from "@/lib/validation/appointment";
import { checkWorkingHours } from "@/lib/utils/appointment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";
import { z } from "zod";

type FormValues = z.infer<typeof appointmentRequestSchema>;

interface ServiceForClient {
  id: string;
  name: string;
  duration_min: number;
  price_try: number;
  is_active: boolean;
}

interface AppointmentRequestFormProps {
  services: ServiceForClient[];
  workingHours: WorkingHours[];
  specialWorkingDays: SpecialWorkingDay[];
}

export function AppointmentRequestForm({
  services,
  workingHours,
  specialWorkingDays,
}: AppointmentRequestFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [appointmentCode, setAppointmentCode] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [workingHoursWarning, setWorkingHoursWarning] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentRequestSchema),
    defaultValues: {
      customer_name: session?.user?.name || "",
      customer_phone: session?.user?.phone || "",
      customer_email: session?.user?.email || "",
      people_count: 1,
      service_ids: [],
    },
  });

  const watchedDate = watch("date");
  const watchedTime = watch("time");
  const watchedServiceIds = watch("service_ids");

  // Check working hours when date/time changes
  useEffect(() => {
    if (watchedDate && watchedTime) {
      const selectedDate = new Date(watchedDate);
      const weekday = selectedDate.getDay();
      const hoursCheck = checkWorkingHours(
        weekday,
        watchedTime,
        workingHours,
        specialWorkingDays,
        watchedDate
      );

      if (!hoursCheck.isWithinHours && hoursCheck.message) {
        setWorkingHoursWarning(hoursCheck.message);
      } else {
        setWorkingHoursWarning(null);
      }
    }
  }, [watchedDate, watchedTime, workingHours, specialWorkingDays]);

  // Calculate total price and duration
  const selectedServices = services.filter(
    (s) => Array.isArray(watchedServiceIds) && watchedServiceIds.includes(s.id)
  );
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price_try, 0);
  const totalDuration = selectedServices.reduce(
    (sum, s) => sum + s.duration_min,
    0
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    setWarnings([]);

    try {
      const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu");
      }

      setAppointmentCode(result.appointment.code);
      setWarnings(result.warnings || []);
      setSubmitSuccess(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Randevu Talebiniz Alındı!
        </h2>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2">Takip Kodunuz</p>
          <p className="text-3xl font-bold text-pink-600 mb-4">
            {appointmentCode}
          </p>
          <p className="text-sm text-gray-600">
            Bu kodu kullanarak randevunuzu takip edebilirsiniz
          </p>
        </div>

        {warnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-yellow-800 mb-2">Uyarı:</p>
            <ul className="text-sm text-yellow-700 space-y-1">
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={() =>
              (window.location.href = `/takip?code=${appointmentCode}`)
            }
            className="w-full"
          >
            Randevuyu Takip Et
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full"
          >
            Yeni Randevu Oluştur
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          İletişim Bilgileri
        </h2>

        <div>
          <Label htmlFor="customer_name">Ad Soyad *</Label>
          <Input
            id="customer_name"
            {...register("customer_name")}
            placeholder="Adınız Soyadınız"
          />
          {errors.customer_name && (
            <p className="text-sm text-red-600 mt-1">
              {errors.customer_name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="customer_phone">Telefon *</Label>
          <Input
            id="customer_phone"
            {...register("customer_phone")}
            placeholder="5551234567"
            type="tel"
          />
          {errors.customer_phone && (
            <p className="text-sm text-red-600 mt-1">
              {errors.customer_phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="customer_email">E-posta (İsteğe bağlı)</Label>
          <Input
            id="customer_email"
            {...register("customer_email")}
            placeholder="ornek@email.com"
            type="email"
          />
          {errors.customer_email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.customer_email.message}
            </p>
          )}
        </div>
      </div>

      {/* Service Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Hizmetler *</h2>

        <div className="space-y-2">
          {services.map((service) => (
            <Card key={service.id} className="p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={service.id}
                  {...register("service_ids")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {service.name}
                    </span>
                    <span className="text-pink-600 font-semibold">
                      {formatCurrency(service.price_try)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Süre: {service.duration_min} dakika
                  </p>
                </div>
              </label>
            </Card>
          ))}
        </div>

        {errors.service_ids && (
          <p className="text-sm text-red-600">{errors.service_ids.message}</p>
        )}

        {selectedServices.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Toplam Süre:</span>
              <span className="font-medium">{totalDuration} dakika</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Toplam Tutar:</span>
              <span className="font-semibold text-pink-600">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Tarih *</Label>
          <Input
            id="date"
            type="date"
            {...register("date")}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.date && (
            <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="time">Saat *</Label>
          <Input id="time" type="time" {...register("time")} />
          {errors.time && (
            <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Working Hours Warning */}
      {workingHoursWarning && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 text-yellow-600 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                {workingHoursWarning}
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Randevunuz takvim dışı bir saatte. Yine de talep
                oluşturabilirsiniz, ekibimiz size en kısa sürede dönüş
                yapacaktır.
              </p>
              <div className="flex gap-3 mt-3">
                <a
                  href="tel:+905551234567"
                  className="text-sm font-medium text-yellow-800 hover:underline"
                >
                  📞 Hemen Ara
                </a>
                <a
                  href="https://wa.me/905551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-yellow-800 hover:underline"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* People Count */}
      <div>
        <Label htmlFor="people_count">Kişi Sayısı</Label>
        <Input
          id="people_count"
          type="number"
          min={1}
          max={10}
          {...register("people_count", { valueAsNumber: true })}
        />
        {errors.people_count && (
          <p className="text-sm text-red-600 mt-1">
            {errors.people_count.message}
          </p>
        )}
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes">Notlar (İsteğe bağlı)</Label>
        <textarea
          id="notes"
          {...register("notes")}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Özel istekleriniz varsa buraya yazabilirsiniz"
        />
        {errors.notes && (
          <p className="text-sm text-red-600 mt-1">{errors.notes.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Gönderiliyor..." : "Randevu Talebi Oluştur"}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Randevunuz onaylandığında size bildirim gönderilecektir
      </p>
    </form>
  );
}
