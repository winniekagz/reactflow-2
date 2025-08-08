"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Square } from "lucide-react";

const EndNode = memo(({ data: _data }: NodeProps) => {
  return (
    <div className="bg-error text-white px-4 py-2 rounded-lg shadow-lg border-2 border-error/60 min-w-[120px] hover:shadow-xl transition-shadow">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center space-x-2">
        <Square className="h-4 w-4" />
        <span className="font-medium text-sm">End</span>
      </div>
    </div>
  );
});

EndNode.displayName = "EndNode";

export default EndNode;
