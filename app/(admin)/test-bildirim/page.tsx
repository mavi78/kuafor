import { requireStaffOrAdmin } from "@/lib/auth/guards";
import { NotificationTestForm } from "./notification-test-form";
import { TemplateTestForm } from "./template-test-form";

export const metadata = {
  title: "Bildirim Testi - Yıldız Kuaförü",
  description: "Email, SMS ve WhatsApp bildirimlerini test edin",
};

export default async function TestNotificationPage() {
  await requireStaffOrAdmin();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bildirim Sistemi Testi
            </h1>
            <p className="text-gray-600">
              Email, SMS ve WhatsApp bildirimlerini test edin. Mock provider'lar
              konsola yazdırır, gerçek provider'lar için .env dosyasında ilgili
              değişkenleri ayarlayın.
            </p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              🔧 Provider Konfigürasyonu
            </h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Email:</strong> SMTP_HOST, SMTP_PORT, SMTP_USER,
                SMTP_PASS, SMTP_FROM
              </p>
              <p>
                <strong>SMS (Netgsm):</strong> NETGSM_USER, NETGSM_PASS,
                NETGSM_HEADER
              </p>
              <p>
                <strong>WhatsApp:</strong> WHATSAPP_API_TOKEN,
                WHATSAPP_PHONE_NUMBER_ID
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                📝 Randevu Şablonları ile Test
              </h2>
              <TemplateTestForm />
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold mb-4">
                ⚙️ Manuel Bildirim Testi
              </h2>
              <NotificationTestForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
