"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, ArrowLeft, Play, Settings } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Import ReactFlow CSS
import "reactflow/dist/style.css";

// Dynamically import ReactFlow to avoid SSR issues
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

// Import custom nodes
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
  nodes: any[];
  edges: any[];
}

export default function WorkflowBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const reactFlowInstance = useRef<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchWorkflow();
    }
  }, [status, router, params.id]);

  const fetchWorkflow = async () => {
    try {
      const response = await fetch(`/api/workflows/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setWorkflow(data);

        // Convert database format to ReactFlow format
        const flowNodes = data.nodes.map((node: any) => ({
          id: node.id,
          type: node.type,
          position: { x: node.positionX, y: node.positionY },
          data: node.data,
        }));

        const flowEdges = data.edges.map((edge: any) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          data: edge.data,
        }));

        setNodes(flowNodes);
        setEdges(flowEdges);
      } else {
        setError("Failed to load workflow");
      }
    } catch (error) {
      console.error("Failed to fetch workflow:", error);
      setError("Failed to load workflow");
    } finally {
      setLoading(false);
    }
  };

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => {
      // Simple implementation for node changes
      return nds.map((node) => {
        const change = changes.find((c: any) => c.id === node.id);
        if (change && change.type === "position") {
          return { ...node, position: change.position };
        }
        return node;
      });
    });
  }, []);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds) => {
      // Simple implementation for edge changes
      return eds.filter((edge) => {
        const change = changes.find((c: any) => c.id === edge.id);
        return !change || change.type !== "remove";
      });
    });
  }, []);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => [...eds, { id: `e${Date.now()}`, ...params }]);
  }, []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance.current) return;

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/workflows/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: workflow?.name,
          description: workflow?.description,
          nodes,
          edges,
        }),
      });

      if (response.ok) {
        // Show success message
        console.log("Workflow saved successfully");
      } else {
        setError("Failed to save workflow");
      }
    } catch (error) {
      console.error("Failed to save workflow:", error);
      setError("Failed to save workflow");
    } finally {
      setSaving(false);
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

  if (!session || !workflow) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/workflows"
              className="text-gray-600 hover:text-gray-900"
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
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{nodes.length} nodes</Badge>
            <Badge variant="outline">{edges.length} connections</Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Test
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mx-6 mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Node Palette */}
      <div className="bg-gray-50 border-b px-6 py-3">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Nodes:</span>
          {[
            { type: "start", label: "Start", color: "bg-green-500" },
            { type: "condition", label: "Condition", color: "bg-blue-500" },
            { type: "delay", label: "Delay", color: "bg-yellow-500" },
            { type: "webhook", label: "Webhook", color: "bg-purple-500" },
            { type: "logger", label: "Logger", color: "bg-gray-500" },
            { type: "end", label: "End", color: "bg-red-500" },
          ].map((node) => (
            <div
              key={node.type}
              className={`${node.color} text-white px-3 py-1 rounded text-sm cursor-pointer hover:opacity-80 transition-opacity`}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("application/reactflow", node.type);
                event.dataTransfer.effectAllowed = "move";
              }}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onInit={(instance) => {
            reactFlowInstance.current = instance;
          }}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
