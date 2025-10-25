"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentStatus } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { appointmentApprovalSchema } from "@/lib/validation/appointment";
import { checkWorkingHours } from "@/lib/utils/appointment";
import { formatCurrency } from "@/lib/utils/currency";
import { z } from "zod";

type FormValues = z.infer<typeof appointmentApprovalSchema>;

interface AppointmentApprovalDialogProps {
  appointment: any;
  staff: Array<{ id: string; name: string; role: string }>;
  onClose: () => void;
}

export function AppointmentApprovalDialog({
  appointment,
  staff,
  onClose,
}: AppointmentApprovalDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workingHoursWarning, setWorkingHoursWarning] = useState<string | null>(
    null
  );
  const [staffLeaveWarning, setStaffLeaveWarning] = useState<string | null>(
    null
  );
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [loadingValidations, setLoadingValidations] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentApprovalSchema),
    defaultValues: {
      appointment_id: appointment.id,
      assigned_staff_id: appointment.assigned_staff_id || "",
      date: new Date(appointment.date).toISOString().split("T")[0],
      time: appointment.time,
      service_ids: appointment.appointment_services.map(
        (as: any) => as.service_id
      ),
      people_count: appointment.people_count,
      notes_internal: "",
    },
  });

  const watchedStaffId = watch("assigned_staff_id");
  const watchedDate = watch("date");
  const watchedTime = watch("time");

  // Validate working hours, staff leaves, and conflicts
  useEffect(() => {
    async function validateAppointment() {
      if (!watchedDate || !watchedTime) return;

      setLoadingValidations(true);
      try {
        const response = await fetch("/api/appointments/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: watchedDate,
            time: watchedTime,
            staff_id: watchedStaffId,
            service_ids: watch("service_ids"),
            appointment_id: appointment.id,
          }),
        });

        const result = await response.json();

        setWorkingHoursWarning(result.workingHoursWarning || null);
        setStaffLeaveWarning(result.staffLeaveWarning || null);
        setConflicts(result.conflicts || []);
      } catch (error) {
        console.error("Validation error:", error);
      } finally {
        setLoadingValidations(false);
      }
    }

    validateAppointment();
  }, [watchedDate, watchedTime, watchedStaffId]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu");
      }

      alert("Randevu başarıyla onaylandı!");
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalDuration = appointment.appointment_services.reduce(
    (sum: number, as: any) => sum + as.service.duration_min,
    0
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Randevu Onayla / Düzenle</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Appointment Info */}
          <Card className="p-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Müşteri:</span>{" "}
                <span className="font-medium">{appointment.customer_name}</span>
              </div>
              <div>
                <span className="text-gray-600">Telefon:</span>{" "}
                <span className="font-medium">
                  {appointment.customer_phone}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Kişi Sayısı:</span>{" "}
                <span className="font-medium">{appointment.people_count}</span>
              </div>
              <div>
                <span className="text-gray-600">Toplam Süre:</span>{" "}
                <span className="font-medium">{totalDuration} dakika</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-600 mb-2">Hizmetler:</p>
              {appointment.appointment_services.map((as: any) => (
                <div key={as.id} className="text-sm">
                  • {as.service.name} ({as.service.duration_min} dk) -{" "}
                  {formatCurrency(as.price_try_at_booking)}
                </div>
              ))}
            </div>
            {appointment.notes_internal?.customer_notes && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-600 mb-1">Müşteri Notu:</p>
                <p className="text-sm text-gray-800 italic">
                  "{appointment.notes_internal.customer_notes}"
                </p>
              </div>
            )}
          </Card>

          {/* Staff Assignment */}
          <div>
            <Label htmlFor="assigned_staff_id">Atanan Çalışan *</Label>
            <Select
              value={watchedStaffId}
              onValueChange={(value) => setValue("assigned_staff_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Çalışan seçin" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({s.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assigned_staff_id && (
              <p className="text-sm text-red-600 mt-1">
                {errors.assigned_staff_id.message}
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Tarih *</Label>
              <Input
                id="date"
                type="date"
                {...register("date")}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.date && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="time">Saat *</Label>
              <Input id="time" type="time" {...register("time")} />
              {errors.time && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          {/* Warnings */}
          {loadingValidations && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <p className="text-sm text-blue-800">Kontroller yapılıyor...</p>
            </Card>
          )}

          {workingHoursWarning && (
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Çalışma Saati Uyarısı
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    {workingHoursWarning}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {staffLeaveWarning && (
            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="flex items-start gap-2">
                <span className="text-lg">🏖️</span>
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    İzin Uyarısı
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    {staffLeaveWarning}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    Admin olarak devam edebilirsiniz.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {conflicts.length > 0 && (
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    Çakışan Randevular ({conflicts.length})
                  </p>
                  <div className="space-y-2">
                    {conflicts.map((conflict: any) => (
                      <div
                        key={conflict.id}
                        className="text-sm text-red-700 bg-white p-2 rounded"
                      >
                        <div className="font-medium">
                          {conflict.customer_name} - {conflict.time}
                        </div>
                        <div className="text-xs">
                          {conflict.services.join(", ")} ({conflict.duration}{" "}
                          dk)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Internal Notes */}
          <div>
            <Label htmlFor="notes_internal">İç Notlar (İsteğe bağlı)</Label>
            <textarea
              id="notes_internal"
              {...register("notes_internal")}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Admin/personel notları"
            />
            {errors.notes_internal && (
              <p className="text-sm text-red-600 mt-1">
                {errors.notes_internal.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || loadingValidations}
              className="flex-1"
            >
              {isSubmitting ? "Onaylanıyor..." : "Onayla"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              İptal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
