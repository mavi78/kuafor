"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { canCancelAppointment } from "@/lib/utils/appointment";

export function AppointmentTracker() {
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get("code");

  const [code, setCode] = useState(codeFromUrl || "");
  const [isSearching, setIsSearching] = useState(false);
  const [appointment, setAppointment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError(null);
    setAppointment(null);

    try {
      const response = await fetch(
        `/api/appointments/track?code=${encodeURIComponent(code)}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Randevu bulunamadı");
      }

      setAppointment(result.appointment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!cancelReason.trim()) {
      setError("Lütfen iptal nedenini belirtin");
      return;
    }

    setIsCancelling(true);
    setError(null);

    try {
      const response = await fetch("/api/appointments/cancel-by-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: appointment.code,
          reason: cancelReason,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "İptal işlemi başarısız");
      }

      // Randevuyu güncelle
      setAppointment(result.appointment);
      setShowCancelDialog(false);
      setCancelReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <Label htmlFor="code">Takip Kodu</Label>
          <Input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="APT-2025-00001"
            className="text-center text-lg font-mono"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">
            Örnek: APT-2025-00001
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSearching || !code}
          className="w-full"
        >
          {isSearching ? "Sorgulanıyor..." : "Randevumu Sorgula"}
        </Button>
      </form>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-800">{error}</p>
        </Card>
      )}

      {appointment && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold">Randevu Detayları</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : appointment.status === "APPROVED"
                    ? "bg-green-100 text-green-800"
                    : appointment.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {appointment.status === "PENDING"
                  ? "Onay Bekliyor"
                  : appointment.status === "APPROVED"
                  ? "Onaylandı"
                  : appointment.status === "CANCELLED"
                  ? "İptal Edildi"
                  : appointment.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ad Soyad</p>
                <p className="font-medium">{appointment.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefon</p>
                <p className="font-medium">{appointment.customer_phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tarih</p>
                <p className="font-medium">
                  {new Date(appointment.date).toLocaleDateString("tr-TR")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Saat</p>
                <p className="font-medium">{appointment.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kişi Sayısı</p>
                <p className="font-medium">{appointment.people_count} kişi</p>
              </div>
            </div>

            {appointment.appointment_services &&
              appointment.appointment_services.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Seçilen Hizmetler
                  </p>
                  <ul className="space-y-1">
                    {appointment.appointment_services.map((as: any) => (
                      <li key={as.id} className="text-sm">
                        • {as.service?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {appointment.status === "CANCELLED" &&
              appointment.notes_internal?.cancellation_reason && (
                <div className="pt-4 border-t">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800 mb-2">
                      ❌ Randevunuz İptal Edildi
                    </p>
                    <p className="text-sm text-red-900 mb-2">
                      <span className="font-medium">İptal Nedeni:</span>{" "}
                      {appointment.notes_internal.cancellation_reason}
                    </p>
                    {appointment.notes_internal.cancelled_at && (
                      <p className="text-xs text-red-600">
                        İptal tarihi:{" "}
                        {new Date(
                          appointment.notes_internal.cancelled_at
                        ).toLocaleString("tr-TR")}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Yeni randevu almak için lütfen bizimle iletişime geçin.
                  </p>
                </div>
              )}

            {appointment.status === "PENDING" && (
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  Randevunuz henüz onaylanmadı. En kısa sürede size dönüş
                  yapılacaktır.
                </p>
                {canCancelAppointment(
                  new Date(appointment.date).toISOString().split("T")[0],
                  appointment.time
                ) ? (
                  <>
                    {!showCancelDialog ? (
                      <Button
                        variant="outline"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => setShowCancelDialog(true)}
                      >
                        Randevuyu İptal Et
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="cancelReason">İptal Nedeni</Label>
                          <textarea
                            id="cancelReason"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Lütfen iptal nedeninizi belirtin..."
                            className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setShowCancelDialog(false);
                              setCancelReason("");
                              setError(null);
                            }}
                            disabled={isCancelling}
                          >
                            Vazgeç
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={handleCancelAppointment}
                            disabled={isCancelling || !cancelReason.trim()}
                          >
                            {isCancelling ? "İptal Ediliyor..." : "İptal Et"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      ⚠️ Randevu saatine 12 saatten az kaldığı için web
                      üzerinden iptal edilemez. Lütfen bizimle iletişime geçin.
                    </p>
                  </div>
                )}
              </div>
            )}

            {appointment.status === "APPROVED" && (
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  ✅ Randevunuz onaylandı. Belirlenen tarih ve saatte görüşmek
                  üzere!
                </p>
                {canCancelAppointment(
                  new Date(appointment.date).toISOString().split("T")[0],
                  appointment.time
                ) ? (
                  <>
                    {!showCancelDialog ? (
                      <Button
                        variant="outline"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => setShowCancelDialog(true)}
                      >
                        Randevuyu İptal Et
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="cancelReason">İptal Nedeni</Label>
                          <textarea
                            id="cancelReason"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Lütfen iptal nedeninizi belirtin..."
                            className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setShowCancelDialog(false);
                              setCancelReason("");
                              setError(null);
                            }}
                            disabled={isCancelling}
                          >
                            Vazgeç
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={handleCancelAppointment}
                            disabled={isCancelling || !cancelReason.trim()}
                          >
                            {isCancelling ? "İptal Ediliyor..." : "İptal Et"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      ⚠️ Randevu saatine 12 saatten az kaldığı için web
                      üzerinden iptal edilemez. Lütfen bizimle iletişime geçin.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
