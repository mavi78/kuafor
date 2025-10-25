module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/lib/validation/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "passwordResetConfirmSchema",
    ()=>passwordResetConfirmSchema,
    "passwordResetRequestSchema",
    ()=>passwordResetRequestSchema,
    "signInSchema",
    ()=>signInSchema,
    "signUpSchema",
    ()=>signUpSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
;
const signInSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'E-posta adresi gereklidir'
    }).email({
        message: 'Geçerli bir e-posta adresi giriniz'
    }),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'Şifre gereklidir'
    }).min(6, {
        message: 'Şifre en az 6 karakter olmalıdır'
    })
});
const signUpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'Ad soyad gereklidir'
    }).min(2, {
        message: 'Ad soyad en az 2 karakter olmalıdır'
    }),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'E-posta adresi gereklidir'
    }).email({
        message: 'Geçerli bir e-posta adresi giriniz'
    }),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().refine((val)=>!val || /^(\+90|0)?5\d{9}$/.test(val.replace(/\s/g, '')), {
        message: 'Geçerli bir telefon numarası giriniz (örn: 5551234567)'
    }),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'Şifre gereklidir'
    }).min(6, {
        message: 'Şifre en az 6 karakter olmalıdır'
    }),
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'Şifre tekrarı gereklidir'
    })
}).refine((data)=>data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: [
        'confirmPassword'
    ]
});
const passwordResetRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'E-posta adresi gereklidir'
    }).email({
        message: 'Geçerli bir e-posta adresi giriniz'
    })
});
const passwordResetConfirmSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'Token gereklidir'
    }),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'Şifre gereklidir'
    }).min(6, {
        message: 'Şifre en az 6 karakter olmalıdır'
    }),
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, {
        message: 'Şifre tekrarı gereklidir'
    })
}).refine((data)=>data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: [
        'confirmPassword'
    ]
});
}),
"[project]/lib/utils/password.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$2$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bcryptjs@3.0.2/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
;
const SALT_ROUNDS = 10;
async function hashPassword(password) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$2$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hash"])(password, SALT_ROUNDS);
}
async function verifyPassword(password, hashedPassword) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$2$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compare"])(password, hashedPassword);
}
}),
"[project]/lib/auth.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$16$2e$0_1a505f427d36dfb87565de9efcad5770$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@16.0_1a505f427d36dfb87565de9efcad5770/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$16$2e$0_1a505f427d36dfb87565de9efcad5770$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@16.0_1a505f427d36dfb87565de9efcad5770/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$password$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/password.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/errors.js [app-rsc] (ecmascript)");
// Helper to get session in server components (Next.js App Router)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$16$2e$0_1a505f427d36dfb87565de9efcad5770$2f$node_modules$2f$next$2d$auth$2f$next$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@16.0_1a505f427d36dfb87565de9efcad5770/node_modules/next-auth/next/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$16$2e$0_1a505f427d36dfb87565de9efcad5770$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            credentials: {
                email: {
                    label: "E-posta",
                    type: "email"
                },
                password: {
                    label: "Şifre",
                    type: "password"
                }
            },
            async authorize (credentials) {
                try {
                    // Validate input with Zod
                    const { email, password } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signInSchema"].parseAsync(credentials);
                    // Find user by email
                    const user = await prisma.user.findUnique({
                        where: {
                            email
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            role: true,
                            password_hash: true
                        }
                    });
                    if (!user) {
                        throw new Error("Geçersiz e-posta veya şifre");
                    }
                    // Verify password
                    const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$password$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyPassword"])(password, user.password_hash);
                    if (!isValid) {
                        throw new Error("Geçersiz e-posta veya şifre");
                    }
                    // Return user object without password_hash
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                    };
                } catch (error) {
                    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodError"]) {
                        // Invalid credentials format
                        return null;
                    }
                    // Re-throw other errors
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            // On first sign-in, add user role to token
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.phone = user.phone;
            }
            return token;
        },
        async session ({ session, token }) {
            // Add user ID and role to session
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.phone = token.phone;
            }
            return session;
        }
    }
};
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$16$2e$0_1a505f427d36dfb87565de9efcad5770$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(authOptions);
;
}),
"[project]/lib/auth/abilities.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasAllPermissions",
    ()=>hasAllPermissions,
    "hasAnyPermission",
    ()=>hasAnyPermission,
    "hasPermission",
    ()=>hasPermission,
    "rolePermissions",
    ()=>rolePermissions
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const rolePermissions = {
    [__TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Role"].ADMIN]: [
        // Appointments
        "appointment:create",
        "appointment:read",
        "appointment:read:all",
        "appointment:update",
        "appointment:update:all",
        "appointment:approve",
        "appointment:cancel",
        "appointment:delete",
        // Services
        "service:create",
        "service:read",
        "service:update",
        "service:delete",
        // Users
        "user:create",
        "user:read",
        "user:read:all",
        "user:update",
        "user:update:all",
        "user:delete",
        // Reviews
        "review:create",
        "review:read",
        "review:update:own",
        "review:update:all",
        "review:delete:own",
        "review:delete:all",
        // Gallery
        "gallery:create",
        "gallery:read",
        "gallery:update",
        "gallery:delete",
        // Payments
        "payment:create",
        "payment:read",
        "payment:read:all",
        "payment:update",
        "payment:delete",
        // Reports
        "report:financial:read",
        "report:operational:read",
        "report:export",
        // Settings
        "settings:read",
        "settings:update",
        // Staff
        "staff:read",
        "staff:create",
        "staff:update",
        "staff:delete",
        "staff:invite",
        // Working hours
        "working-hours:read",
        "working-hours:update",
        // Notifications
        "notification:read",
        "notification:send",
        "notification:send:all"
    ],
    [__TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Role"].STAFF]: [
        // Appointments
        "appointment:create",
        "appointment:read",
        "appointment:read:all",
        "appointment:update",
        "appointment:update:all",
        "appointment:approve",
        "appointment:cancel",
        // Services
        "service:read",
        // Users
        "user:read",
        // Reviews
        "review:read",
        // Gallery
        "gallery:read",
        // Payments
        "payment:create",
        "payment:read",
        "payment:read:all",
        "payment:update",
        // Reports
        "report:financial:read",
        "report:operational:read",
        "report:export",
        // Settings
        "settings:read",
        // Staff
        "staff:read",
        // Working hours
        "working-hours:read",
        // Notifications
        "notification:read",
        "notification:send"
    ],
    [__TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Role"].CUSTOMER]: [
        // Appointments
        "appointment:create",
        "appointment:read",
        "appointment:cancel",
        // Services
        "service:read",
        // Users
        "user:read",
        "user:update",
        // Reviews
        "review:create",
        "review:read",
        "review:update:own",
        "review:delete:own",
        // Gallery
        "gallery:read",
        // Payments
        "payment:read",
        // Notifications
        "notification:read"
    ]
};
function hasPermission(role, permission) {
    return rolePermissions[role]?.includes(permission) ?? false;
}
function hasAllPermissions(role, permissions) {
    return permissions.every((permission)=>hasPermission(role, permission));
}
function hasAnyPermission(role, permissions) {
    return permissions.some((permission)=>hasPermission(role, permission));
}
}),
"[project]/lib/auth/guards.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnauthorizedError",
    ()=>UnauthorizedError,
    "requireAdmin",
    ()=>requireAdmin,
    "requireAllPermissions",
    ()=>requireAllPermissions,
    "requireAnyPermission",
    ()=>requireAnyPermission,
    "requireAuth",
    ()=>requireAuth,
    "requireOwnershipOrAdmin",
    ()=>requireOwnershipOrAdmin,
    "requirePermission",
    ()=>requirePermission,
    "requireRole",
    ()=>requireRole,
    "requireStaffOrAdmin",
    ()=>requireStaffOrAdmin
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$16$2e$0_1a505f427d36dfb87565de9efcad5770$2f$node_modules$2f$next$2d$auth$2f$next$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@16.0_1a505f427d36dfb87565de9efcad5770/node_modules/next-auth/next/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$abilities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/abilities.ts [app-rsc] (ecmascript)");
;
;
;
;
class UnauthorizedError extends Error {
    constructor(message){
        super(message);
        this.name = "UnauthorizedError";
    }
}
async function requireAuth() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$16$2e$0_1a505f427d36dfb87565de9efcad5770$2f$node_modules$2f$next$2d$auth$2f$next$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["authOptions"]);
    if (!session || !session.user) {
        throw new UnauthorizedError("Bu işlem için giriş yapmalısınız");
    }
    return session;
}
async function requireRole(allowedRoles) {
    const session = await requireAuth();
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [
        allowedRoles
    ];
    if (!roles.includes(session.user.role)) {
        throw new UnauthorizedError("Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır");
    }
    return session;
}
async function requirePermission(permission) {
    const session = await requireAuth();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$abilities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasPermission"])(session.user.role, permission)) {
        throw new UnauthorizedError("Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır");
    }
    return session;
}
async function requireAllPermissions(permissions) {
    const session = await requireAuth();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$abilities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasAllPermissions"])(session.user.role, permissions)) {
        throw new UnauthorizedError("Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır");
    }
    return session;
}
async function requireAnyPermission(permissions) {
    const session = await requireAuth();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$abilities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasAnyPermission"])(session.user.role, permissions)) {
        throw new UnauthorizedError("Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır");
    }
    return session;
}
async function requireAdmin() {
    return requireRole(__TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Role"].ADMIN);
}
async function requireStaffOrAdmin() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Role"].STAFF,
        __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Role"].ADMIN
    ]);
}
async function requireOwnershipOrAdmin(userId) {
    const session = await requireAuth();
    const isAdmin = session.user.role === __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Role"].ADMIN;
    const isOwner = session.user.id === userId;
    if (!isAdmin && !isOwner) {
        throw new UnauthorizedError("Bu bilgilere erişim yetkiniz bulunmamaktadır");
    }
    return session;
}
}),
"[project]/app/(admin)/randevular/appointments-list.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "AppointmentsList",
    ()=>AppointmentsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_f156bc6623ddf8742ccdddf749dd3b25/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AppointmentsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AppointmentsList() from the server but AppointmentsList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(admin)/randevular/appointments-list.tsx <module evaluation>", "AppointmentsList");
}),
"[project]/app/(admin)/randevular/appointments-list.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "AppointmentsList",
    ()=>AppointmentsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_f156bc6623ddf8742ccdddf749dd3b25/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AppointmentsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AppointmentsList() from the server but AppointmentsList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(admin)/randevular/appointments-list.tsx", "AppointmentsList");
}),
"[project]/app/(admin)/randevular/appointments-list.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$admin$292f$randevular$2f$appointments$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/(admin)/randevular/appointments-list.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$admin$292f$randevular$2f$appointments$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/(admin)/randevular/appointments-list.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$admin$292f$randevular$2f$appointments$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(admin)/randevular/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RandevularPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_f156bc6623ddf8742ccdddf749dd3b25/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$guards$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/guards.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$admin$292f$randevular$2f$appointments$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(admin)/randevular/appointments-list.tsx [app-rsc] (ecmascript)");
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
const metadata = {
    title: "Randevular - Yıldız Kuaförü Admin",
    description: "Randevu yönetimi"
};
async function getAppointments() {
    const appointments = await prisma.appointment.findMany({
        where: {
            status: {
                in: [
                    __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["AppointmentStatus"].PENDING,
                    __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["AppointmentStatus"].APPROVED,
                    __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["AppointmentStatus"].CANCELLED
                ]
            }
        },
        include: {
            appointment_services: {
                include: {
                    service: true
                }
            },
            assigned_staff: {
                select: {
                    id: true,
                    name: true,
                    phone: true
                }
            },
            customer_user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            }
        },
        orderBy: [
            {
                date: "asc"
            },
            {
                time: "asc"
            }
        ]
    });
    return appointments;
}
async function getStaff() {
    const staff = await prisma.user.findMany({
        where: {
            role: {
                in: [
                    "STAFF",
                    "ADMIN"
                ]
            }
        },
        select: {
            id: true,
            name: true,
            role: true
        }
    });
    return staff;
}
async function RandevularPage() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$guards$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStaffOrAdmin"])();
    const [appointments, staff] = await Promise.all([
        getAppointments(),
        getStaff()
    ]);
    // Serialize Decimal values for client component
    const appointmentsForClient = appointments.map((appointment)=>({
            ...appointment,
            appointment_services: appointment.appointment_services.map((as)=>({
                    ...as,
                    price_try_at_booking: Number(as.price_try_at_booking),
                    service: {
                        ...as.service,
                        price_try: Number(as.service.price_try)
                    }
                }))
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-8 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900",
                            children: "Randevular"
                        }, void 0, false, {
                            fileName: "[project]/app/(admin)/randevular/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mt-2",
                            children: "Bekleyen ve onaylanmış randevuları yönetin"
                        }, void 0, false, {
                            fileName: "[project]/app/(admin)/randevular/page.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(admin)/randevular/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_f156bc6623ddf8742ccdddf749dd3b25$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$admin$292f$randevular$2f$appointments$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AppointmentsList"], {
                    appointments: appointmentsForClient,
                    staff: staff
                }, void 0, false, {
                    fileName: "[project]/app/(admin)/randevular/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(admin)/randevular/page.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(admin)/randevular/page.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/(admin)/randevular/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(admin)/randevular/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f063b3be._.js.map