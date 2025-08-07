"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FileText } from "lucide-react";

const LoggerNode = memo(({ data }: { data: any }) => {
  return (
    <div className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-gray-600 min-w-[120px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center space-x-2">
        <FileText className="h-4 w-4" />
        <span className="font-medium text-sm">Logger</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
});

LoggerNode.displayName = "LoggerNode";

export default LoggerNode;
