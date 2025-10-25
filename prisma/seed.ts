import { PrismaClient, Role, AppointmentStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create users
  const adminPass = await hash("admin123", 10);
  const staffPass = await hash("staff123", 10);
  const customerPass = await hash("customer123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@yildizkuaforu.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@yildizkuaforu.com",
      phone: "+905551234567",
      role: Role.ADMIN,
      password_hash: adminPass,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@yildizkuaforu.com" },
    update: {},
    create: {
      name: "Ayşe Yılmaz",
      email: "staff@yildizkuaforu.com",
      phone: "+905559876543",
      role: Role.STAFF,
      password_hash: staffPass,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "Fatma Demir",
      email: "customer@example.com",
      phone: "+905551112233",
      role: Role.CUSTOMER,
      password_hash: customerPass,
    },
  });

  console.log("✅ Users created");
  console.log(`   Admin: admin@yildizkuaforu.com / admin123`);
  console.log(`   Staff: staff@yildizkuaforu.com / staff123`);
  console.log(`   Customer: customer@example.com / customer123`);

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "Saç Kesimi",
        duration_min: 30,
        price_try: 150,
      },
    }),
    prisma.service.create({
      data: {
        name: "Fön",
        duration_min: 45,
        price_try: 200,
      },
    }),
    prisma.service.create({
      data: {
        name: "Boya",
        duration_min: 120,
        price_try: 500,
      },
    }),
    prisma.service.create({
      data: {
        name: "Manikür",
        duration_min: 60,
        price_try: 100,
      },
    }),
    prisma.service.create({
      data: {
        name: "Pedikür",
        duration_min: 60,
        price_try: 120,
      },
    }),
  ]);

  console.log(`✅ ${services.length} services created`);

  // Create working hours (Monday-Saturday: 09:00-18:00, Sunday closed)
  const workingHoursDefs = [
    { weekday: 0, is_open: false }, // Sunday
    { weekday: 1, open_time: "09:00", close_time: "18:00", is_open: true },
    { weekday: 2, open_time: "09:00", close_time: "18:00", is_open: true },
    { weekday: 3, open_time: "09:00", close_time: "18:00", is_open: true },
    { weekday: 4, open_time: "09:00", close_time: "18:00", is_open: true },
    { weekday: 5, open_time: "09:00", close_time: "18:00", is_open: true },
    { weekday: 6, open_time: "09:00", close_time: "18:00", is_open: true },
  ];

  for (const wh of workingHoursDefs) {
    await prisma.workingHours.create({ data: wh });
  }

  console.log("✅ Working hours created");

  // Create sample appointment
  const sampleAppointment = await prisma.appointment.create({
    data: {
      code: "APT-DEMO-001",
      customer_name: customer.name,
      customer_phone: customer.phone!,
      customer_user_id: customer.id,
      people_count: 1,
      date: new Date("2025-10-27"),
      time: "10:00",
      status: AppointmentStatus.PENDING,
      appointment_services: {
        create: [
          {
            service_id: services[0].id,
            price_try_at_booking: services[0].price_try,
          },
          {
            service_id: services[1].id,
            price_try_at_booking: services[1].price_try,
          },
        ],
      },
    },
  });

  console.log(
    `✅ Sample appointment created (code: ${sampleAppointment.code})`
  );

  console.log("");
  console.log("🎉 Seed complete!");
  console.log("👉 Start the app with: pnpm dev");
  console.log("👉 Login credentials above ⬆");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
