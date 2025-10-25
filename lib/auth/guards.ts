import { Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  type Permission,
} from "./abilities";

/**
 * Error thrown when user lacks required permissions.
 */
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Get the current session or throw if not authenticated.
 * @throws UnauthorizedError if no session exists
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new UnauthorizedError("Bu işlem için giriş yapmalısınız");
  }

  return session;
}

/**
 * Require user to have a specific role.
 * @param allowedRoles - Single role or array of roles
 * @throws UnauthorizedError if user role doesn't match
 */
export async function requireRole(allowedRoles: Role | Role[]) {
  const session = await requireAuth();
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(session.user.role as Role)) {
    throw new UnauthorizedError(
      "Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır"
    );
  }

  return session;
}

/**
 * Require user to have a specific permission.
 * @param permission - Permission to check
 * @throws UnauthorizedError if user lacks permission
 */
export async function requirePermission(permission: Permission) {
  const session = await requireAuth();

  if (!hasPermission(session.user.role as Role, permission)) {
    throw new UnauthorizedError(
      "Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır"
    );
  }

  return session;
}

/**
 * Require user to have ALL of the specified permissions.
 * @param permissions - Array of permissions to check (AND logic)
 * @throws UnauthorizedError if user lacks any permission
 */
export async function requireAllPermissions(permissions: Permission[]) {
  const session = await requireAuth();

  if (!hasAllPermissions(session.user.role as Role, permissions)) {
    throw new UnauthorizedError(
      "Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır"
    );
  }

  return session;
}

/**
 * Require user to have AT LEAST ONE of the specified permissions.
 * @param permissions - Array of permissions to check (OR logic)
 * @throws UnauthorizedError if user lacks all permissions
 */
export async function requireAnyPermission(permissions: Permission[]) {
  const session = await requireAuth();

  if (!hasAnyPermission(session.user.role as Role, permissions)) {
    throw new UnauthorizedError(
      "Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır"
    );
  }

  return session;
}

/**
 * Check if current user is ADMIN.
 * @throws UnauthorizedError if user is not admin
 */
export async function requireAdmin() {
  return requireRole(Role.ADMIN);
}

/**
 * Check if current user is STAFF or ADMIN.
 * @throws UnauthorizedError if user is neither staff nor admin
 */
export async function requireStaffOrAdmin() {
  return requireRole([Role.STAFF, Role.ADMIN]);
}

/**
 * Check if current user can access a specific user's data.
 * Admins can access any user, others can only access their own data.
 * @param userId - ID of the user whose data is being accessed
 * @throws UnauthorizedError if user cannot access the data
 */
export async function requireOwnershipOrAdmin(userId: string) {
  const session = await requireAuth();

  const isAdmin = session.user.role === Role.ADMIN;
  const isOwner = session.user.id === userId;

  if (!isAdmin && !isOwner) {
    throw new UnauthorizedError("Bu bilgilere erişim yetkiniz bulunmamaktadır");
  }

  return session;
}
