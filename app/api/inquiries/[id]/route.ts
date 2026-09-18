import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { requireAdmin } from "../../../../lib/admin-auth";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await requireAdmin();

    if (!authenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const status = body.status;

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required.",
        },
        { status: 400 }
      );
    }

    const allowedStatuses = ["new", "contacted", "completed"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status.",
        },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      inquiry,
    });
  } catch (error) {
    console.error("Update inquiry status error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not update the inquiry status.",
      },
      { status: 500 }
    );
  }
}