import { PrismaClient, NotificationChannel } from "@prisma/client";
import type { NotificationResult } from "./types";

const prisma = new PrismaClient();

export type NotificationLogData = {
  channel: NotificationChannel;
  to: string;
  templateKey: string;
  payloadJson: Record<string, any>;
  result: NotificationResult;
};

/**
 * Log notification to database
 *
 * Records all notification attempts with their results for audit trail.
 */
export async function logNotification(data: NotificationLogData) {
  try {
    const log = await prisma.notificationLog.create({
      data: {
        channel: data.channel,
        to: data.to,
        template_key: data.templateKey,
        payload_json: data.payloadJson,
        result: JSON.stringify({
          success: data.result.success,
          messageId: data.result.messageId,
          error: data.result.error,
          metadata: data.result.metadata,
          timestamp: new Date().toISOString(),
        }),
      },
    });

    return log;
  } catch (error) {
    console.error("Failed to log notification:", error);
    // Don't throw - logging failure shouldn't break the notification flow
    return null;
  }
}

/**
 * Get notification logs for an appointment
 */
export async function getNotificationLogs(appointmentCode: string) {
  try {
    const logs = await prisma.notificationLog.findMany({
      where: {
        OR: [
          { template_key: { contains: appointmentCode } },
          {
            payload_json: {
              path: ["appointmentCode"],
              equals: appointmentCode,
            },
          },
        ],
      },
      orderBy: { created_at: "desc" },
    });

    return logs;
  } catch (error) {
    console.error("Failed to fetch notification logs:", error);
    return [];
  }
}

/**
 * Get recent notification logs (for admin panel)
 */
export async function getRecentNotificationLogs(limit: number = 50) {
  try {
    const logs = await prisma.notificationLog.findMany({
      orderBy: { created_at: "desc" },
      take: limit,
    });

    return logs;
  } catch (error) {
    console.error("Failed to fetch recent notification logs:", error);
    return [];
  }
}

/**
 * Get notification statistics
 */
export async function getNotificationStats(fromDate?: Date) {
  try {
    const where = fromDate ? { created_at: { gte: fromDate } } : {};

    const [total, byChannel, successCount, failureCount] = await Promise.all([
      prisma.notificationLog.count({ where }),
      prisma.notificationLog.groupBy({
        by: ["channel"],
        where,
        _count: true,
      }),
      prisma.notificationLog.count({
        where: {
          ...where,
          result: { contains: '"success":true' },
        },
      }),
      prisma.notificationLog.count({
        where: {
          ...where,
          result: { contains: '"success":false' },
        },
      }),
    ]);

    return {
      total,
      success: successCount,
      failure: failureCount,
      successRate: total > 0 ? ((successCount / total) * 100).toFixed(2) : "0",
      byChannel: byChannel.reduce((acc, item) => {
        acc[item.channel] = item._count;
        return acc;
      }, {} as Record<string, number>),
    };
  } catch (error) {
    console.error("Failed to fetch notification stats:", error);
    return {
      total: 0,
      success: 0,
      failure: 0,
      successRate: "0",
      byChannel: {},
    };
  }
}
