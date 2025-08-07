import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workflow = await prisma.workflow.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
      include: {
        nodes: true,
        edges: true,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(workflow);
  } catch (error) {
    console.error("Get workflow error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, nodes, edges } = await request.json();

    // Check if workflow exists and belongs to user
    const existingWorkflow = await prisma.workflow.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingWorkflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    // Update workflow
    const updatedWorkflow = await prisma.workflow.update({
      where: { id: id },
      data: {
        name,
        description,
      },
    });

    // Update nodes if provided
    if (nodes) {
      // Delete existing nodes
      await prisma.node.deleteMany({
        where: { workflowId: id },
      });

      // Create new nodes
      if (nodes.length > 0) {
        await prisma.node.createMany({
          data: nodes.map((node: { id: string; type: string; position: { x: number; y: number }; data: unknown }) => ({
            id: node.id,
            type: node.type,
            positionX: node.position.x,
            positionY: node.position.y,
            data: node.data,
            workflowId: id,
          })),
        });
      }
    }

    // Update edges if provided
    if (edges) {
      // Delete existing edges
      await prisma.edge.deleteMany({
        where: { workflowId: id },
      });

      // Create new edges
      if (edges.length > 0) {
        await prisma.edge.createMany({
          data: edges.map((edge: { id: string; source: string; target: string; data?: unknown }) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceNodeId: edge.source,
            targetNodeId: edge.target,
            workflowId: id,
            data: edge.data || {},
          })),
        });
      }
    }

    return NextResponse.json(updatedWorkflow);
  } catch (error) {
    console.error("Update workflow error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if workflow exists and belongs to user
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    // Delete workflow (cascade will delete nodes and edges)
    await prisma.workflow.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Workflow deleted successfully" });
  } catch (error) {
    console.error("Delete workflow error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
