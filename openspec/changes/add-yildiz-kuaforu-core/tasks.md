## 1. Planning & Setup

- [x] 1.1 Confirm proposal scope and capabilities map (this change)
- [x] 1.2 Finalize Prisma schema draft for core models (User, Service, Appointment, AppointmentService, WorkingHours, SpecialWorkingDay, StaffLeave, Review, GalleryImage, Payment, NotificationLog, AuditLog, PasswordResetToken, InvitationToken)
- [x] 1.3 Initialize Next.js 15 app, Tailwind v4 + shadcn/ui baseline, date-fns TR locale

## 2. Auth & RBAC

- [x] 2.1 NextAuth v4 (JWT) setup; bcryptjs hashing; session callbacks
- [x] 2.2 Zod schemas + RHF forms for sign-in/sign-up
- [x] 2.3 RBAC abilities matrix `lib/auth/abilities.ts` and `lib/auth/guards.ts` with violation handling messages
- [ ] 2.4 Password reset flow (email link, token 3 days)
- [ ] 2.5 Invitation link flow (single-use, 3 days)

## 3. Appointments & Availability

- [x] 3.1 Request form (registered/guest) → PENDING with unique follow-up code
- [x] 3.2 Working hours + special days priority check (warn outside hours)
- [x] 3.3 Staff leaves model and validation on approval
- [x] 3.4 Duration-based conflict detection at approval, list overlaps
- [x] 3.5 Approval/Revise/Cancel actions with RBAC constraints
- [ ] 3.6 Follow-up code page (status view)

## 4. Notifications & Real-time

- [ ] 4.1 Provider interfaces for Email, SMS, WhatsApp; mock + real drivers
- [ ] 4.2 Templates: pending/approved/revised/cancelled/receipt
- [ ] 4.3 Notification logging `NotificationLog`
- [ ] 4.4 WebSocket broadcast for panel badge/notification updates

## 5. Payments

- [ ] 5.1 Payment page with line items, discounts, totals
- [ ] 5.2 Persist `Payment` and mark Appointment → COMPLETED
- [ ] 5.3 PDF receipt generation and email/share delivery

## 6. Reviews & Gallery

- [ ] 6.1 Review flow: registered edit/delete; guest single-use 5-day link
- [ ] 6.2 Admin moderation controls
- [ ] 6.3 Gallery CRUD with constraints (JPEG/PNG, ≤ 5MB)

## 7. Reports & Settings

- [ ] 7.1 Financial reports: date filter, payment breakdown, employee/service charts (Recharts), CSV export
- [ ] 7.2 Operational metrics: cancel rate, avg approval time, staff load
- [ ] 7.3 Settings: salon info, contact/social links, services CRUD, notification channel toggles

## 8. Cron & Backups

- [ ] 8.1 Redis queue scheduled job: auto-cancel overdue PENDING appointments, notify parties
- [ ] 8.2 DB daily dump strategy doc + scripts
- [ ] 8.3 Media backup to Supabase Storage/S3

## 9. UX & L10N

- [ ] 9.1 Implement pages per sequence: Home → Auth → Create Appointment → Follow-up → Admin/Staff Panel → Payment → Reports → Gallery/Reviews → Settings
- [x] 9.2 TR locale and TRY currency formatting; Europe/Istanbul time zone; date-fns integration

## 10. Validation & Delivery

- [ ] 10.1 Manual flow verification per page: UI, validation, data model, RBAC, notifications, audit
- [x] 10.2 Docker Compose up, seed, demo tour
- [ ] 10.3 Document known limitations and next-phase items
