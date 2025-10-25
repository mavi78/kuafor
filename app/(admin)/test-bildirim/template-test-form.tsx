"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function TemplateTestForm() {
  const [status, setStatus] = useState<
    "PENDING" | "APPROVED" | "REVISED" | "CANCELLED" | "COMPLETED"
  >("PENDING");
  const [role, setRole] = useState<"CUSTOMER" | "ADMIN">("CUSTOMER");
  const [channels, setChannels] = useState<string[]>(["EMAIL"]);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch("/api/test/notify-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          recipient: {
            name: "Test Kullanıcı",
            email: "test@example.com",
            phone: "5551234567",
            role,
          },
          appointment: {
            appointmentCode: "APT-2025-00001",
            customerName: "Ahmet Yılmaz",
            appointmentDate: "25 Ekim 2025",
            appointmentTime: "14:00",
            services: "Saç Kesimi, Fön",
            staffName: "Ayşe Hanım",
            cancelReason:
              status === "CANCELLED"
                ? "Müşteri talebine göre iptal edildi"
                : undefined,
            totalAmount: status === "COMPLETED" ? "150,00 ₺" : undefined,
          },
          channels,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      });
    } finally {
      setIsSending(false);
    }
  };

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter((c) => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="mb-3 block">Randevu Durumu</Label>
        <div className="grid grid-cols-3 gap-2">
          {["PENDING", "APPROVED", "REVISED", "CANCELLED", "COMPLETED"].map(
            (s) => (
              <Button
                key={s}
                type="button"
                variant={status === s ? "default" : "outline"}
                onClick={() =>
                  setStatus(
                    s as
                      | "PENDING"
                      | "APPROVED"
                      | "REVISED"
                      | "CANCELLED"
                      | "COMPLETED"
                  )
                }
                className="w-full text-xs"
              >
                {s}
              </Button>
            )
          )}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Alıcı Rolü</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant={role === "CUSTOMER" ? "default" : "outline"}
            onClick={() => setRole("CUSTOMER")}
            className="w-full"
          >
            👤 Müşteri
          </Button>
          <Button
            type="button"
            variant={role === "ADMIN" ? "default" : "outline"}
            onClick={() => setRole("ADMIN")}
            className="w-full"
          >
            👨‍💼 Admin
          </Button>
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Bildirim Kanalları</Label>
        <div className="grid grid-cols-3 gap-3">
          {["EMAIL", "SMS", "WHATSAPP"].map((channel) => (
            <Button
              key={channel}
              type="button"
              variant={channels.includes(channel) ? "default" : "outline"}
              onClick={() => toggleChannel(channel)}
              className="w-full"
            >
              {channel === "EMAIL" && "📧"}
              {channel === "SMS" && "📱"}
              {channel === "WHATSAPP" && "💬"}
              {" " + channel}
            </Button>
          ))}
        </div>
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Test Verisi:</strong>
        </p>
        <ul className="text-xs text-blue-700 mt-2 space-y-1">
          <li>• Müşteri: Ahmet Yılmaz</li>
          <li>• Takip Kodu: APT-2025-00001</li>
          <li>• Tarih: 25 Ekim 2025 14:00</li>
          <li>• Hizmetler: Saç Kesimi, Fön</li>
          <li>• Personel: Ayşe Hanım</li>
        </ul>
      </Card>

      <Button
        type="submit"
        disabled={isSending || channels.length === 0}
        className="w-full"
      >
        {isSending ? "Gönderiliyor..." : "Şablon ile Bildirim Gönder"}
      </Button>

      {result && (
        <Card
          className={`p-4 ${
            result.success
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="space-y-2">
            <p className="font-semibold">
              {result.success ? "✅ Başarılı" : "❌ Başarısız"}
            </p>
            {result.error && (
              <p className="text-sm text-red-800">
                <strong>Hata:</strong> {result.error}
              </p>
            )}
            {result.results && (
              <details className="text-sm">
                <summary className="cursor-pointer font-medium">
                  Sonuçlar
                </summary>
                <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
                  {JSON.stringify(result.results, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </Card>
      )}
    </form>
  );
}
