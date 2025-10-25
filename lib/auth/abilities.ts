import { Role } from "@prisma/client";

/**
 * Permission types for RBAC system.
 * Each permission represents a specific action in the system.
 */
export type Permission =
  // Appointment permissions
  | "appointment:create"
  | "appointment:read"
  | "appointment:read:all"
  | "appointment:update"
  | "appointment:update:all"
  | "appointment:approve"
  | "appointment:cancel"
  | "appointment:delete"
  // Service permissions
  | "service:create"
  | "service:read"
  | "service:update"
  | "service:delete"
  // User permissions
  | "user:create"
  | "user:read"
  | "user:read:all"
  | "user:update"
  | "user:update:all"
  | "user:delete"
  // Review permissions
  | "review:create"
  | "review:read"
  | "review:update:own"
  | "review:update:all"
  | "review:delete:own"
  | "review:delete:all"
  // Gallery permissions
  | "gallery:create"
  | "gallery:read"
  | "gallery:update"
  | "gallery:delete"
  // Payment permissions
  | "payment:create"
  | "payment:read"
  | "payment:read:all"
  | "payment:update"
  | "payment:delete"
  // Report permissions
  | "report:financial:read"
  | "report:operational:read"
  | "report:export"
  // Settings permissions
  | "settings:read"
  | "settings:update"
  // Staff permissions
  | "staff:read"
  | "staff:create"
  | "staff:update"
  | "staff:delete"
  | "staff:invite"
  // Working hours permissions
  | "working-hours:read"
  | "working-hours:update"
  // Notification permissions
  | "notification:read"
  | "notification:send"
  | "notification:send:all";

/**
 * Role-to-permissions mapping.
 * Defines which permissions each role has access to.
 *
 * ADMIN: Full access to all features
 * STAFF: Can manage appointments, payments, view reports, limited user management
 * CUSTOMER: Can create appointments, view own data, create reviews
 */
export const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
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
    "notification:send:all",
  ],

  [Role.STAFF]: [
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
    "notification:send",
  ],

  [Role.CUSTOMER]: [
    // Appointments
    "appointment:create",
    "appointment:read", // Own appointments only
    "appointment:cancel", // Own appointments only, within 12-hour window
    // Services
    "service:read",
    // Users
    "user:read", // Own profile only
    "user:update", // Own profile only
    // Reviews
    "review:create",
    "review:read",
    "review:update:own",
    "review:delete:own",
    // Gallery
    "gallery:read",
    // Payments
    "payment:read", // Own payments only
    // Notifications
    "notification:read", // Own notifications only
  ],
};

/**
 * Check if a role has a specific permission.
 * @param role - User's role
 * @param permission - Permission to check
 * @returns True if role has permission, false otherwise
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

/**
 * Check if a user has multiple permissions (AND logic).
 * @param role - User's role
 * @param permissions - Array of permissions to check
 * @returns True if role has ALL permissions, false otherwise
 */
export function hasAllPermissions(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

/**
 * Check if a user has at least one of the given permissions (OR logic).
 * @param role - User's role
 * @param permissions - Array of permissions to check
 * @returns True if role has AT LEAST ONE permission, false otherwise
 */
export function hasAnyPermission(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}
