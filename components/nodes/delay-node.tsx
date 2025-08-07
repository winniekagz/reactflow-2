"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Clock } from "lucide-react";

const DelayNode = memo(({ data }: { data: any }) => {
  return (
    <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-yellow-600 min-w-[120px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4" />
        <span className="font-medium text-sm">Delay</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
});

DelayNode.displayName = "DelayNode";

export default DelayNode;
