import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's workflows with node counts
    const workflows = await prisma.workflow.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        nodes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Calculate total stats
    const totalWorkflows = await prisma.workflow.count({
      where: {
        userId: session.user.id,
      },
    });

    const totalNodes = await prisma.node.count({
      where: {
        workflow: {
          userId: session.user.id,
        },
      },
    });

    // Format recent workflows
    const recentWorkflows = workflows.map((workflow: { id: string; name: string; description: string | null; createdAt: Date; nodes: Array<unknown> }) => ({
      id: workflow.id,
      name: workflow.name,
      description: workflow.description || "",
      createdAt: workflow.createdAt.toISOString(),
      nodeCount: workflow.nodes.length,
    }));

    return NextResponse.json({
      totalWorkflows,
      totalNodes,
      recentWorkflows,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
