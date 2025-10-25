import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get admin and staff users for notifications
 */
export async function getNotificationRecipients() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          in: [Role.ADMIN, Role.STAFF],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return {
      admins: users.filter((u) => u.role === Role.ADMIN),
      staff: users.filter((u) => u.role === Role.STAFF),
      all: users,
    };
  } catch (error) {
    console.error("Failed to fetch notification recipients:", error);
    return {
      admins: [],
      staff: [],
      all: [],
    };
  }
}

/**
 * Get primary admin email (first active admin)
 */
export async function getPrimaryAdminContact(): Promise<{
  email?: string;
  phone?: string;
}> {
  try {
    const admin = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
      },
      select: {
        email: true,
        phone: true,
      },
    });

    if (!admin) {
      return { email: undefined, phone: undefined };
    }

    return {
      email: admin.email,
      phone: admin.phone || undefined,
    };
  } catch (error) {
    console.error("Failed to fetch primary admin:", error);
    return { email: undefined, phone: undefined };
  }
}
