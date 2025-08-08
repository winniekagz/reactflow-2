"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Globe } from "lucide-react";

const WebhookNode = memo(({ data: _data }: NodeProps) => {
  return (
    <div className="bg-secondary text-white px-4 py-2 rounded-lg shadow-lg border-2 border-secondary/60 min-w-[120px] hover:shadow-xl transition-shadow">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center space-x-2">
        <Globe className="h-4 w-4" />
        <span className="font-medium text-sm">Webhook</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
});

WebhookNode.displayName = "WebhookNode";

export default WebhookNode;
