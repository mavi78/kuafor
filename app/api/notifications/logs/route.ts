import { NextRequest, NextResponse } from "next/server";
import { requireStaffOrAdmin } from "@/lib/auth/guards";
import {
  getRecentNotificationLogs,
  getNotificationStats,
} from "@/lib/notify/logger";

/**
 * GET /api/notifications/logs
 *
 * Get recent notification logs (admin/staff only)
 * Query params:
 * - limit: number of logs to return (default: 50, max: 200)
 * - stats: if "true", also return statistics
 */
export async function GET(request: NextRequest) {
  try {
    await requireStaffOrAdmin();

    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
    const includeStats = searchParams.get("stats") === "true";

    const logs = await getRecentNotificationLogs(limit);

    const response: any = {
      logs,
      count: logs.length,
    };

    if (includeStats) {
      response.stats = await getNotificationStats();
    }

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Response) {
      return error; // RBAC guard rejection
    }

    console.error("Failed to fetch notification logs:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch notification logs",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
