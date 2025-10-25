import { Suspense } from "react";
import { AppointmentTracker } from "./appointment-tracker";

export const metadata = {
  title: "Randevu Takip - Yıldız Kuaförü",
  description: "Randevunuzu takip kodunuz ile sorgulayın",
};

export default function TakipPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Randevu Takip
            </h1>
            <p className="text-gray-600">
              Randevu takip kodunuzu girerek randevunuzun durumunu
              öğrenebilirsiniz
            </p>
          </div>

          <Suspense fallback={<div className="text-center">Yükleniyor...</div>}>
            <AppointmentTracker />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
