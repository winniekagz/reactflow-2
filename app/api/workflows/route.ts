import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { workflowSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workflows = await prisma.workflow.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        nodes: true,
        edges: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const formattedWorkflows = workflows.map((workflow: { id: string; name: string; description: string | null; createdAt: Date; updatedAt: Date; nodes: Array<unknown>; edges: Array<unknown> }) => ({
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      createdAt: workflow.createdAt.toISOString(),
      updatedAt: workflow.updatedAt.toISOString(),
      nodeCount: workflow.nodes.length,
      edgeCount: workflow.edges.length,
    }));

    return NextResponse.json(formattedWorkflows);
  } catch (error) {
    console.error("Workflows API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = workflowSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json({ 
        error: "Validation failed", 
        details: errors 
      }, { status: 400 });
    }

    const { name, description } = validationResult.data;

    const workflow = await prisma.workflow.create({
      data: {
        name,
        description,
        userId: session.user.id,
      },
    });

    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    console.error("Create workflow error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
