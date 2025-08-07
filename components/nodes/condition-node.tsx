"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { GitBranch } from "lucide-react";

const ConditionNode = memo(({ data }: { data: any }) => {
  return (
    <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-blue-600 min-w-[140px]">
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
