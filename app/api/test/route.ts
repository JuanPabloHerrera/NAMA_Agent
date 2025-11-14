import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    env_configured: !!process.env.N8N_WEBHOOK_URL,
    env_value: process.env.N8N_WEBHOOK_URL ? "SET" : "NOT SET",
  });
}
