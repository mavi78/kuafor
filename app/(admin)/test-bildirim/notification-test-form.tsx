"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function NotificationTestForm() {
  const [channel, setChannel] = useState<"EMAIL" | "SMS" | "WHATSAPP">("EMAIL");
  const [name, setName] = useState("Test Kullanıcı");
  const [email, setEmail] = useState("test@example.com");
  const [phone, setPhone] = useState("5551234567");
  const [subject, setSubject] = useState("Test Bildirimi");
  const [body, setBody] = useState("Bu bir test mesajıdır.");
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch("/api/test/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          to: { name, email, phone },
          subject,
          body,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="mb-3 block">Bildirim Kanalı</Label>
        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant={channel === "EMAIL" ? "default" : "outline"}
            onClick={() => setChannel("EMAIL")}
            className="w-full"
          >
            📧 Email
          </Button>
          <Button
            type="button"
            variant={channel === "SMS" ? "default" : "outline"}
            onClick={() => setChannel("SMS")}
            className="w-full"
          >
            📱 SMS
          </Button>
          <Button
            type="button"
            variant={channel === "WHATSAPP" ? "default" : "outline"}
            onClick={() => setChannel("WHATSAPP")}
            className="w-full"
          >
            💬 WhatsApp
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">İsim</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Test Kullanıcı"
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="5551234567"
            disabled={channel === "EMAIL"}
          />
        </div>
      </div>

      {channel === "EMAIL" && (
        <>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
            />
          </div>
          <div>
            <Label htmlFor="subject">Konu</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Test Bildirimi"
            />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="body">Mesaj</Label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Mesaj içeriği..."
          className="w-full min-h-[150px] px-3 py-2 border rounded-md"
        />
      </div>

      <Button type="submit" disabled={isSending} className="w-full">
        {isSending ? "Gönderiliyor..." : "Bildirim Gönder"}
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
            {result.messageId && (
              <p className="text-sm">
                <strong>Message ID:</strong> {result.messageId}
              </p>
            )}
            {result.error && (
              <p className="text-sm text-red-800">
                <strong>Hata:</strong> {result.error}
              </p>
            )}
            {result.metadata && (
              <details className="text-sm">
                <summary className="cursor-pointer font-medium">
                  Metadata
                </summary>
                <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
                  {JSON.stringify(result.metadata, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </Card>
      )}

      <Card className="p-4 bg-gray-50 border-gray-200">
        <p className="text-sm text-gray-700 mb-2">
          <strong>💡 Not:</strong> Gerçek provider'lar yapılandırılmadıysa mock
          provider'lar kullanılır. Mock mesajlar terminal konsolunda görünür.
        </p>
        <p className="text-xs text-gray-600">
          Terminal çıktısını görmek için VS Code terminalini kontrol edin.
        </p>
      </Card>
    </form>
  );
}
