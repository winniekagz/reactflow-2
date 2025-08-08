"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 

  Calendar,
  User,
  Settings,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";

const ReactFlow = dynamic(
  () => import("reactflow").then((mod) => ({ default: mod.default })),
  { ssr: false }
);
const Background = dynamic(
  () => import("reactflow").then((mod) => ({ default: mod.Background })),
  { ssr: false }
);
const Controls = dynamic(
  () => import("reactflow").then((mod) => ({ default: mod.Controls })),
  { ssr: false }
);
const MiniMap = dynamic(
  () => import("reactflow").then((mod) => ({ default: mod.MiniMap })),
  { ssr: false }
);
const StartNode = dynamic(() => import("@/components/nodes/start-node"), {
  ssr: false,
});
const ConditionNode = dynamic(
  () => import("@/components/nodes/condition-node"),
  { ssr: false }
);
const DelayNode = dynamic(() => import("@/components/nodes/delay-node"), {
  ssr: false,
});
const WebhookNode = dynamic(() => import("@/components/nodes/webhook-node"), {
  ssr: false,
});
const LoggerNode = dynamic(() => import("@/components/nodes/logger-node"), {
  ssr: false,
});
const EndNode = dynamic(() => import("@/components/nodes/end-node"), {
  ssr: false,
});

const nodeTypes = {
  start: StartNode,
  condition: ConditionNode,
  delay: DelayNode,
  webhook: WebhookNode,
  logger: LoggerNode,
  end: EndNode,
};

interface Workflow {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  nodes: Array<{
    id: string;
    type: string;
    positionX: number;
    positionY: number;
    data: unknown;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    data?: unknown;
  }>;
  user: {
    name: string;
    email: string;
  };
}

export default function WorkflowViewPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchWorkflow = useCallback(async () => {
    if (!id) return;
    
    try {
      const response = await fetch(`/api/workflows/${id}`);
      if (response.ok) {
        const data = await response.json();
        setWorkflow(data);

        const flowNodes = data.nodes.map((node: { id: string; type: string; positionX: number; positionY: number; data: unknown }) => ({
          id: node.id,
          type: node.type,
          position: { x: node.positionX, y: node.positionY },
          data: node.data,
        }));

        const flowEdges = data.edges.map((edge: { id: string; source: string; target: string; data?: unknown }) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          data: edge.data,
        }));

        setNodes(flowNodes);
        setEdges(flowEdges);
      } else if (response.status === 404) {
        setError("Workflow not found");
      } else {
        setError("Failed to load workflow");
      }
    } catch (error) {
      console.error("Failed to fetch workflow:", error);
      setError("Failed to load workflow");
    } finally {
      setLoading(false);
    }
  }, [id, setNodes, setEdges]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated" && id) {
      fetchWorkflow();
    }
  }, [status, router, id, fetchWorkflow]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this workflow? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/workflows");
      } else {
        setError("Failed to delete workflow");
      }
    } catch (error) {
      console.error("Failed to delete workflow:", error);
      setError("Failed to delete workflow");
    } finally {
      setDeleting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="mt-4">
              <Link href="/workflows">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Workflows
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!workflow) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/workflows"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {workflow.name}
                </h1>
                <p className="text-sm text-gray-600">{workflow.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">
                {nodes.length} node{nodes.length !== 1 ? 's' : ''}
              </Badge>
              <Badge variant="outline">
                {edges.length} connection{edges.length !== 1 ? 's' : ''}
              </Badge>
              <Link href={`/workflows/${id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push(`/workflows/${id}/edit`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Workflow
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    className="text-red-600 focus:text-red-600"
                    disabled={deleting}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {deleting ? "Deleting..." : "Delete Workflow"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Created
                  </div>
                  <p className="text-sm">
                    {new Date(workflow.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Last Updated
                  </div>
                  <p className="text-sm">
                    {new Date(workflow.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                {workflow.user && (
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <User className="mr-2 h-4 w-4" />
                      Owner
                    </div>
                    <p className="text-sm">{workflow.user.name || workflow.user.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Node Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { type: "start", label: "Start", color: "bg-green-500" },
                    { type: "condition", label: "Condition", color: "bg-blue-500" },
                    { type: "delay", label: "Delay", color: "bg-yellow-500" },
                    { type: "webhook", label: "Webhook", color: "bg-purple-500" },
                    { type: "logger", label: "Logger", color: "bg-gray-500" },
                    { type: "end", label: "End", color: "bg-red-500" },
                  ].map((nodeType) => {
                    const count = nodes.filter(node => node.type === nodeType.type).length;
                    if (count === 0) return null;
                    
                    return (
                      <div key={nodeType.type} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`${nodeType.color} w-3 h-3 rounded mr-2`}></div>
                          <span className="text-sm">{nodeType.label}</span>
                        </div>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="text-lg">Workflow Visualization</CardTitle>
                <CardDescription>
                  Visual representation of your workflow. Click and drag to explore.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full p-0">
                <div className="h-full rounded-b-lg overflow-hidden">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    elementsSelectable={true}
                    fitView
                    attributionPosition="bottom-left"
                  >
                    <Background />
                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 