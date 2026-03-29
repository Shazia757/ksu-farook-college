import React from "react";
import { cn } from "@/lib/utils";

interface BreakdownItem {
  label: string;
  value: number;
  type?: "base" | "bonus" | "grace";
}

interface ResultCardProps {
  breakdown: BreakdownItem[];
  finalIndex: number;
}




export function ResultCard({ breakdown, finalIndex }: ResultCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Breakdown */}
        <div className="flex-1 w-full space-y-4">
          <h2 className="text-xl font-bold text-blue-100 border-b border-white/20 pb-2 mb-4">
            Calculation Breakdown
          </h2>
          
        <div className="space-y-2 text-sm font-medium">
  {breakdown.map((item, index) => (
    <div
      key={index}
      className="flex justify-between items-center bg-white/10 px-3 py-2 rounded"
    >
      <span className="text-blue-100">{item.label}</span>

      <span
        className={cn(
          item.type === "bonus" && "text-green-300",
          item.type === "grace" && "text-pink-300"
        )}
      >
        {item.type !== "base" && "+"}
        {Math.round(item.value * 100) / 100}
      </span>
    </div>
  ))}
</div>
        </div>

        {/* Final Index Container */}
        <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 min-w-[220px]">
          <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">Final Index Mark</span>
          <span className="text-5xl font-black tracking-tighter drop-shadow-lg">
            {Math.round(finalIndex * 100) / 100}
          </span>
        </div>

      </div>
    </div>
  );
}
