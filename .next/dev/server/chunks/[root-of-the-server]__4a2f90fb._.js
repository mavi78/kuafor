module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/utils/appointment.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canCancelAppointment",
    ()=>canCancelAppointment,
    "checkWorkingHours",
    ()=>checkWorkingHours,
    "generateAppointmentCode",
    ()=>generateAppointmentCode
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function generateAppointmentCode() {
    const currentYear = new Date().getFullYear();
    const yearPrefix = `APT-${currentYear}-`;
    // Find the highest sequential number for this year
    const lastAppointment = await prisma.appointment.findFirst({
        where: {
            code: {
                startsWith: yearPrefix
            }
        },
        orderBy: {
            code: "desc"
        },
        select: {
            code: true
        }
    });
    let nextNumber = 1;
    if (lastAppointment) {
        // Extract the sequential number from the last code
        const lastNumber = parseInt(lastAppointment.code.split("-")[2], 10);
        nextNumber = lastNumber + 1;
    }
    // Format with leading zeros (5 digits)
    const sequentialNumber = nextNumber.toString().padStart(5, "0");
    return `${yearPrefix}${sequentialNumber}`;
}
function canCancelAppointment(appointmentDate, appointmentTime) {
    const now = new Date();
    const [year, month, day] = appointmentDate.split("-").map(Number);
    const [hours, minutes] = appointmentTime.split(":").map(Number);
    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);
    const hoursUntilAppointment = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilAppointment > 12;
}
function checkWorkingHours(weekday, time, workingHours, specialWorkingDays, selectedDate) {
    // Check if there's a special working day for this date
    const selectedDateObj = new Date(selectedDate);
    const specialDay = specialWorkingDays.find((sd)=>{
        const sdDate = new Date(sd.date);
        return sdDate.getFullYear() === selectedDateObj.getFullYear() && sdDate.getMonth() === selectedDateObj.getMonth() && sdDate.getDate() === selectedDateObj.getDate();
    });
    if (specialDay) {
        if (!specialDay.is_open) {
            return {
                isWithinHours: false,
                message: "Seçtiğiniz tarihte salonumuz kapalıdır. Lütfen başka bir tarih seçin."
            };
        }
        if (specialDay.open_time && specialDay.close_time) {
            if (time < specialDay.open_time || time >= specialDay.close_time) {
                return {
                    isWithinHours: false,
                    message: `Seçtiğiniz saat çalışma saatlerimiz dışındadır. Çalışma saatlerimiz: ${specialDay.open_time} - ${specialDay.close_time}`
                };
            }
        }
        return {
            isWithinHours: true
        };
    }
    // Check regular working hours
    const workingDay = workingHours.find((wh)=>wh.weekday === weekday);
    if (!workingDay || !workingDay.is_open) {
        return {
            isWithinHours: false,
            message: "Seçtiğiniz gün salonumuz kapalıdır. Lütfen başka bir gün seçin."
        };
    }
    if (workingDay.open_time && workingDay.close_time) {
        if (time < workingDay.open_time || time >= workingDay.close_time) {
            return {
                isWithinHours: false,
                message: `Seçtiğiniz saat çalışma saatlerimiz dışındadır. Çalışma saatlerimiz: ${workingDay.open_time} - ${workingDay.close_time}`
            };
        }
    }
    return {
        isWithinHours: true
    };
}
}),
"[project]/app/api/appointments/validate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_f156bc6623ddf8742ccdddf749dd3b25/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$appointment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/appointment.ts [app-route] (ecmascript)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function POST(request) {
    try {
        const body = await request.json();
        const { date, time, staff_id, service_ids, appointment_id } = body;
        const warnings = {
            workingHoursWarning: null,
            staffLeaveWarning: null,
            conflicts: []
        };
        // Check working hours
        const [workingHours, specialWorkingDays] = await Promise.all([
            prisma.workingHours.findMany(),
            prisma.specialWorkingDay.findMany({
                where: {
                    date: {
                        gte: new Date(date),
                        lte: new Date(date)
                    }
                }
            })
        ]);
        const selectedDate = new Date(date);
        const weekday = selectedDate.getDay();
        const hoursCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$appointment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkWorkingHours"])(weekday, time, workingHours, specialWorkingDays, date);
        if (!hoursCheck.isWithinHours && hoursCheck.message) {
            warnings.workingHoursWarning = hoursCheck.message;
        }
        // Check staff leaves
        if (staff_id) {
            const staffLeave = await prisma.staffLeave.findFirst({
                where: {
                    staff_user_id: staff_id,
                    start_date: {
                        lte: new Date(date)
                    },
                    end_date: {
                        gte: new Date(date)
                    }
                }
            });
            if (staffLeave) {
                warnings.staffLeaveWarning = `Seçilen çalışan ${new Date(staffLeave.start_date).toLocaleDateString("tr-TR")} - ${new Date(staffLeave.end_date).toLocaleDateString("tr-TR")} tarihleri arasında izinlidir.`;
            }
        }
        // Check conflicts
        if (staff_id && service_ids && service_ids.length > 0) {
            const services = await prisma.service.findMany({
                where: {
                    id: {
                        in: service_ids
                    }
                }
            });
            const totalDuration = services.reduce((sum, s)=>sum + s.duration_min, 0);
            // Parse time (HH:mm)
            const [hours, minutes] = time.split(":").map(Number);
            const appointmentStart = new Date(date);
            appointmentStart.setHours(hours, minutes, 0, 0);
            const appointmentEnd = new Date(appointmentStart);
            appointmentEnd.setMinutes(appointmentEnd.getMinutes() + totalDuration);
            // Find overlapping appointments for the same staff
            const overlappingAppointments = await prisma.appointment.findMany({
                where: {
                    id: {
                        not: appointment_id
                    },
                    assigned_staff_id: staff_id,
                    date: new Date(date),
                    status: {
                        in: [
                            "PENDING",
                            "APPROVED"
                        ]
                    }
                },
                include: {
                    appointment_services: {
                        include: {
                            service: true
                        }
                    }
                }
            });
            const conflicts = overlappingAppointments.filter((apt)=>{
                const [aptHours, aptMinutes] = apt.time.split(":").map(Number);
                const aptStart = new Date(date);
                aptStart.setHours(aptHours, aptMinutes, 0, 0);
                const aptDuration = apt.appointment_services.reduce((sum, as)=>sum + as.service.duration_min, 0);
                const aptEnd = new Date(aptStart);
                aptEnd.setMinutes(aptEnd.getMinutes() + aptDuration);
                // Check if times overlap
                return appointmentStart >= aptStart && appointmentStart < aptEnd || appointmentEnd > aptStart && appointmentEnd <= aptEnd || appointmentStart <= aptStart && appointmentEnd >= aptEnd;
            });
            warnings.conflicts = conflicts.map((apt)=>({
                    id: apt.id,
                    customer_name: apt.customer_name,
                    time: apt.time,
                    duration: apt.appointment_services.reduce((sum, as)=>sum + as.service.duration_min, 0),
                    services: apt.appointment_services.map((as)=>as.service.name)
                }));
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(warnings);
    } catch (error) {
        console.error("Validation error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Doğrulama sırasında bir hata oluştu"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a2f90fb._.js.map