"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Square } from "lucide-react";

const EndNode = memo(({ data: _data }: NodeProps) => {
  return (
    <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-red-600 min-w-[120px]">
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
