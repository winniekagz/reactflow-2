"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Play } from "lucide-react";

const StartNode = memo(({ data: _data }: NodeProps) => {
    console.log('data',_data)
  return (
    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-green-600 min-w-[120px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center space-x-2">
        <Play className="h-4 w-4" />
        <span className="font-medium text-sm">Start</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
});

StartNode.displayName = "StartNode";

export default StartNode;
