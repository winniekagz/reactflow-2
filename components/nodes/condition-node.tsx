"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { GitBranch } from "lucide-react";

const ConditionNode = memo(({ data: _data }: NodeProps) => {
  return (
    <div className="bg-info text-white px-4 py-2 rounded-lg shadow-lg border-2 border-info/60 min-w-[140px] hover:shadow-xl transition-shadow">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center space-x-2">
        <GitBranch className="h-4 w-4" />
        <span className="font-medium text-sm">Condition</span>
      </div>
      <div className="flex justify-between mt-2">
        <Handle
          type="source"
          position={Position.Bottom}
          id="true"
          className="w-2 h-2"
          style={{ left: "25%" }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="false"
          className="w-2 h-2"
          style={{ left: "75%" }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>True</span>
        <span>False</span>
      </div>
    </div>
  );
});

ConditionNode.displayName = "ConditionNode";

export default ConditionNode;
