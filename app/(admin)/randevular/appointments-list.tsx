"use client";

import { useState } from "react";
import { AppointmentStatus } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AppointmentApprovalDialog } from "./appointment-approval-dialog";
import { formatCurrency } from "@/lib/utils/currency";

interface Service {
  id: string;
  name: string;
  duration_min: number;
  price_try: number;
  is_active: boolean;
}

interface AppointmentService {
  id: string;
  appointment_id: string;
  service_id: string;
  price_try_at_booking: number;
  service: Service;
}

interface Staff {
  id: string;
  name: string;
  phone: string | null;
}

interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Appointment {
  id: string;
  code: string;
  customer_name: string;
  customer_phone: string;
  customer_user_id: string | null;
  people_count: number;
  date: Date;
  time: string;
  status: AppointmentStatus;
  assigned_staff_id: string | null;
  notes_internal: any;
  created_at: Date;
  updated_at: Date;
  appointment_services: AppointmentService[];
  assigned_staff: Staff | null;
  customer_user: CustomerUser | null;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  staff: StaffMember[];
}

export function AppointmentsList({
  appointments,
  staff,
}: AppointmentsListProps) {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [cancellingAppointment, setCancellingAppointment] =
    useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [filter, setFilter] = useState<AppointmentStatus | "ALL">("ALL");

  const filteredAppointments = appointments.filter((apt) =>
    filter === "ALL" ? true : apt.status === filter
  );

  const pendingCount = appointments.filter(
    (a) => a.status === AppointmentStatus.PENDING
  ).length;
  const approvedCount = appointments.filter(
    (a) => a.status === AppointmentStatus.APPROVED
  ).length;
  const cancelledCount = appointments.filter(
    (a) => a.status === AppointmentStatus.CANCELLED
  ).length;

  const handleCancelAppointment = async () => {
    if (!cancellingAppointment || !cancelReason.trim()) {
      alert("Lütfen iptal nedenini giriniz");
      return;
    }

    setIsCancelling(true);
    try {
      const response = await fetch("/api/appointments/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: cancellingAppointment.id,
          reason: cancelReason,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu");
      }

      alert("Randevu başarıyla iptal edildi");
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-3">
        <Button
          variant={filter === "ALL" ? "default" : "outline"}
          onClick={() => setFilter("ALL")}
        >
          Tümü ({appointments.length})
        </Button>
        <Button
          variant={filter === AppointmentStatus.PENDING ? "default" : "outline"}
          onClick={() => setFilter(AppointmentStatus.PENDING)}
        >
          Bekleyen ({pendingCount})
        </Button>
        <Button
          variant={
            filter === AppointmentStatus.APPROVED ? "default" : "outline"
          }
          onClick={() => setFilter(AppointmentStatus.APPROVED)}
        >
          Onaylanan ({approvedCount})
        </Button>
        <Button
          variant={
            filter === AppointmentStatus.CANCELLED ? "default" : "outline"
          }
          onClick={() => setFilter(AppointmentStatus.CANCELLED)}
        >
          İptal Edilen ({cancelledCount})
        </Button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 && (
          <Card className="p-8 text-center text-gray-500">
            {filter === "ALL"
              ? "Henüz randevu bulunmuyor"
              : `${
                  filter === AppointmentStatus.PENDING
                    ? "Bekleyen"
                    : "Onaylanmış"
                } randevu bulunmuyor`}
          </Card>
        )}

        {filteredAppointments.map((appointment) => {
          const totalDuration = appointment.appointment_services.reduce(
            (sum, as) => sum + as.service.duration_min,
            0
          );
          const totalPrice = appointment.appointment_services.reduce(
            (sum, as) => sum + as.price_try_at_booking,
            0
          );

          return (
            <Card key={appointment.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.customer_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.customer_phone}
                    </p>
                  </div>
                  {appointment.status === AppointmentStatus.PENDING && (
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-800 border-yellow-200"
                    >
                      Bekliyor
                    </Badge>
                  )}
                  {appointment.status === AppointmentStatus.APPROVED && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-800 border-green-200"
                    >
                      Onaylandı
                    </Badge>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm font-mono text-gray-600">
                    {appointment.code}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(appointment.created_at).toLocaleDateString(
                      "tr-TR"
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Tarih</p>
                  <p className="font-medium">
                    {new Date(appointment.date).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Saat</p>
                  <p className="font-medium">{appointment.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Kişi Sayısı</p>
                  <p className="font-medium">{appointment.people_count} kişi</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Atanan Çalışan</p>
                  <p className="font-medium">
                    {appointment.assigned_staff?.name || "—"}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Hizmetler</p>
                <div className="space-y-1">
                  {appointment.appointment_services.map((as) => (
                    <div key={as.id} className="flex justify-between text-sm">
                      <span>
                        {as.service.name} ({as.service.duration_min} dk)
                      </span>
                      <span className="font-medium">
                        {formatCurrency(as.price_try_at_booking)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t">
                  <span>Toplam ({totalDuration} dk)</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              {/* Customer Notes */}
              {appointment.notes_internal?.customer_notes && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-medium text-blue-800 mb-1">
                    💬 Müşteri Notu:
                  </p>
                  <p className="text-sm text-blue-900 italic">
                    "{appointment.notes_internal.customer_notes}"
                  </p>
                </div>
              )}

              {/* Cancellation Reason */}
              {appointment.status === AppointmentStatus.CANCELLED &&
                appointment.notes_internal?.cancellation_reason && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs font-medium text-red-800 mb-1">
                      ❌ İptal Nedeni:
                    </p>
                    <p className="text-sm text-red-900">
                      {appointment.notes_internal.cancellation_reason}
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      İptal tarihi:{" "}
                      {new Date(
                        appointment.notes_internal.cancelled_at
                      ).toLocaleString("tr-TR")}
                    </p>
                  </div>
                )}

              <div className="flex gap-2">
                {appointment.status === AppointmentStatus.PENDING && (
                  <>
                    <Button
                      onClick={() => setSelectedAppointment(appointment)}
                      className="flex-1"
                    >
                      Onayla / Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setCancellingAppointment(appointment);
                        setCancelReason("");
                      }}
                    >
                      İptal Et
                    </Button>
                  </>
                )}
                {appointment.status === AppointmentStatus.APPROVED && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedAppointment(appointment)}
                      className="flex-1"
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setCancellingAppointment(appointment);
                        setCancelReason("");
                      }}
                    >
                      İptal Et
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Approval Dialog */}
      {selectedAppointment && (
        <AppointmentApprovalDialog
          appointment={selectedAppointment}
          staff={staff}
          onClose={() => setSelectedAppointment(null)}
        />
      )}

      {/* Cancel Dialog */}
      {cancellingAppointment && (
        <Dialog
          open
          onOpenChange={() => {
            setCancellingAppointment(null);
            setCancelReason("");
          }}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Randevuyu İptal Et</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Card className="p-3 bg-gray-50">
                <div className="text-sm">
                  <p className="font-medium">
                    {cancellingAppointment.customer_name}
                  </p>
                  <p className="text-gray-600">
                    {new Date(cancellingAppointment.date).toLocaleDateString(
                      "tr-TR"
                    )}{" "}
                    - {cancellingAppointment.time}
                  </p>
                </div>
              </Card>

              <div>
                <Label htmlFor="cancel_reason">İptal Nedeni *</Label>
                <textarea
                  id="cancel_reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="İptal nedenini giriniz..."
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCancelAppointment}
                  disabled={isCancelling || !cancelReason.trim()}
                  variant="destructive"
                  className="flex-1"
                >
                  {isCancelling ? "İptal Ediliyor..." : "İptal Et"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCancellingAppointment(null);
                    setCancelReason("");
                  }}
                  disabled={isCancelling}
                  className="flex-1"
                >
                  Vazgeç
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
