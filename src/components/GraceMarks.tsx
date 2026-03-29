"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GraceMarkSelections {
  nss: boolean;
  ncc: "A" | "B" | "C" | null;
  artsA: boolean;
}

interface GraceMarksProps {
  selections: GraceMarkSelections;
  onChange: (selections: GraceMarkSelections) => void;
}

export function GraceMarks({ selections, onChange }: GraceMarksProps) {

  // 🔹 Single-select logic
  const selectOnly = (key: keyof GraceMarkSelections, nccValue?: "A" | "B" | "C") => {
    onChange({
      nss: key === "nss",
      artsA: key === "artsA",
      ncc: key === "ncc" && nccValue ? nccValue : null,
    });
  };

  // 🔹 Reusable UI styled as "radio cards"
  const RadioCard = ({
    id,
    label,
    bonus,
    checked,
    onClick
  }: {
    id: string;
    label: string;
    bonus: string;
    checked: boolean;
    onClick: () => void;
  }) => (
    <label
      htmlFor={id}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer select-none",
        checked
          ? "border-blue-500 bg-blue-50 text-blue-900 shadow-md"
          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
      )}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="graceMarks"
          checked={checked}
          readOnly
          className="w-4 h-4"
        />
        <span className="font-medium text-sm">{label}</span>
      </div>

      <span
        className={cn(
          "text-xs font-bold px-2 py-1 rounded-full",
          checked
            ? "bg-blue-200 text-blue-800"
            : "bg-slate-100 text-slate-500"
        )}
      >
        +{bonus}
      </span>
    </label>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">
        Universal Grace Marks
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* NSS */}
        <RadioCard
          id="nss"
          label="NSS/SPC/Nanma Mudra/Widow-Jawan Child"
          bonus="15"
          checked={selections.nss}
          onClick={() => selectOnly("nss")}
        />

        {/* NCC - Single Select */}
        <RadioCard
          id="nccA"
          label="NCC - A Certificate"
          bonus="18"
          checked={selections.ncc === "A"}
          onClick={() => selectOnly("ncc", "A")}
        />
        <RadioCard
          id="nccB"
          label="NCC - B Certificate"
          bonus="20"
          checked={selections.ncc === "B"}
          onClick={() => selectOnly("ncc", "B")}
        />
        <RadioCard
          id="nccC"
          label="NCC - C Certificate"
          bonus="25"
          checked={selections.ncc === "C"}
          onClick={() => selectOnly("ncc", "C")}
        />

        {/* Arts */}
        <RadioCard
          id="artsA"
          label="Arts Festival (State A-Grade)"
          bonus="10"
          checked={selections.artsA}
          onClick={() => selectOnly("artsA")}
        />

      </div>
    </div>
  );
}