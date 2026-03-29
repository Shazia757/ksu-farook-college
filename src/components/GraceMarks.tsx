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

  // 🔹 Toggle normal checkboxes
  const toggle = (key: keyof Omit<GraceMarkSelections, "ncc">) => {
    onChange({
      ...selections,
      [key]: !selections[key]
    });
  };

  // 🔹 NCC single select logic
  const selectNCC = (value: "A" | "B" | "C") => {
    onChange({
      ...selections,
      ncc: selections.ncc === value ? null : value
    });
  };

  // 🔹 Reusable UI
  const CheckboxItem = ({
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
        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
        checked
          ? "border-blue-500 bg-blue-50 text-blue-900 shadow-sm"
          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
      )}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
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
        <CheckboxItem
          id="nss"
          label="NSS/SPC/Nanma Mudra/Widow-Jawan Child"
          bonus="15"
          checked={selections.nss}
          onClick={() => toggle("nss")}
        />

        {/* NCC - Single Select */}
        <CheckboxItem
          id="nccA"
          label="NCC - A Certificate"
          bonus="18"
          checked={selections.ncc === "A"}
          onClick={() => selectNCC("A")}
        />

        <CheckboxItem
          id="nccB"
          label="NCC - B Certificate"
          bonus="20"
          checked={selections.ncc === "B"}
          onClick={() => selectNCC("B")}
        />

        <CheckboxItem
          id="nccC"
          label="NCC - C Certificate"
          bonus="25"
          checked={selections.ncc === "C"}
          onClick={() => selectNCC("C")}
        />

        {/* Arts */}
        <CheckboxItem
          id="artsA"
          label="Arts Festival (State A-Grade)"
          bonus="10"
          checked={selections.artsA}
          onClick={() => toggle("artsA")}
        />

      </div>
    </div>
  );
}