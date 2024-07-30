// app/api/pods-health/route.ts
import { NextResponse } from "next/server";
import {
  checkPodsHealth,
  listDeployments,
  listDeploymentsStatus,
} from "@/lib/kubernetes";

export async function GET() {
  try {
    const podsHealth = await listDeploymentsStatus();
    return NextResponse.json(podsHealth);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pod health" },
      { status: 500 },
    );
  }
}
