"use client";

import React, { useState, useMemo } from "react";
import { CoreFields } from "@/components/CoreFields";
import { ProgramSelector, PROGRAMS } from "@/components/ProgramSelector";
import { GraceMarks, GraceMarkSelections } from "@/components/GraceMarks";
import { ResultCard } from "@/components/ResultCard";
import { CALCULATORS } from "@/lib/calculators";

const initialMarks = {
  english: "",
  secondLanguage: "",
  subject1: "",
  subject2: "",
  subject3: "",
  subject4: "",
};

const initialGraceSelections: GraceMarkSelections = {
  nss: false,
  ncc: null,
  artsA: false,
};

export default function Home() {
  const [marks, setMarks] = useState(initialMarks);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [graceSelections, setGraceSelections] = useState(initialGraceSelections);
  const [programData, setProgramData] = useState<any>({});


  const handleMarksChange = (field: string, value: string) => {
    setMarks((prev) => ({ ...prev, [field]: value }));
  };

  // Convert to numbers safely
  const v = (val: string) => parseInt(val) || 0;

  const m = {
    english: v(marks.english),
    secondLanguage: v(marks.secondLanguage),
    sub1: v(marks.subject1),
    sub2: v(marks.subject2),
    sub3: v(marks.subject3),
    sub4: v(marks.subject4),
  };

  // Intermediate Totals
  const partIIITotal = m.sub1 + m.sub2 + m.sub3 + m.sub4;
  const total12th = m.english + m.secondLanguage + partIIITotal;

  // Grace Marks Calculation
  const graceMarksTotal = useMemo(() => {
    let t = 0;

    if (graceSelections.nss) t += 15;
    if (graceSelections.artsA) t += 10;

    const nccMap: Record<"A" | "B" | "C", number> = {
      A: 18,
      B: 20,
      C: 25
    };

    const nccBonus = graceSelections.ncc
      ? nccMap[graceSelections.ncc]
      : 0;

    t += nccBonus;

    return t;
  }, [graceSelections]);

  // Find selected program meta
  const currentLogicString = useMemo(() => {
    for (const group of Object.values(PROGRAMS)) {
      const p = group.find(x => x.id === selectedProgram);
      if (p) return p.description;
    }
    return "";
  }, [selectedProgram]);

  const result = useMemo(() => {
    if (!selectedProgram) return null;

    const calculator = CALCULATORS[selectedProgram];
    if (!calculator) return null;

    return calculator({
      total12th,
      partIIITotal,
      marks: m,
      graceMarks: graceMarksTotal,
      ...programData
    });

  }, [selectedProgram, total12th, partIIITotal, m, graceMarksTotal]);


  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 selection:bg-blue-200">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center space-y-2 mt-4 mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Admission <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Index Calculator</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            High-precision logic engine to determine your university admission index score.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Form Fields */}
          <div className="lg:col-span-7 space-y-8">
            <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm">
              <HeaderBadge label="Step 1" />
              <CoreFields marks={marks} onChange={handleMarksChange} />

              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between text-sm sm:text-base bg-slate-50 p-4 rounded-xl">
                <div className="font-semibold text-slate-600">
                  Total (12th): <span className="font-bold text-slate-900 ml-1 bg-white px-3 py-1 rounded shadow-sm border border-slate-200">{total12th}</span> <span className="text-xs text-slate-400">/ 1200</span>
                </div>
                <div className="font-semibold text-slate-600 mt-2 sm:mt-0">
                  Part III Total: <span className="font-bold text-slate-900 ml-1 bg-white px-3 py-1 rounded shadow-sm border border-slate-200">{partIIITotal}</span> <span className="text-xs text-slate-400">/ 800</span>
                </div>
              </div>
            </section>

            <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm">
              <HeaderBadge label="Step 2" />
              <ProgramSelector
                selectedProgram={selectedProgram}
                onSelect={setSelectedProgram}
                onFormChange={setProgramData}
                currentLogic={currentLogicString}
              />
            </section>

            <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm">
              <HeaderBadge label="Step 3" />
              <GraceMarks selections={graceSelections} onChange={setGraceSelections} />
            </section>
          </div>

          {/* Sticky Side Panel for Result */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              {result && (
                <ResultCard
                  breakdown={result.breakdown}
                  finalIndex={result.finalIndex}
                />
              )}

              {/* Quick instructions/Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-600 shadow-sm">
                <h4 className="font-bold flex items-center gap-2 mb-2 text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                  How it works
                </h4>
                <p className="mb-2 text-slate-500">
                  The Logic Engine dynamically adjusts the base mark and weightages depending on the program selected.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                  <li><strong>BA/BCom:</strong> based on Total 12th marks (1200).</li>
                  <li><strong>BSc/BVoc:</strong> based on Part III subjects (800).</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const HeaderBadge = ({ label }: { label: string }) => (
  <div className="inline-block bg-slate-900 text-white text-xs font-bold uppercase py-1 px-3 rounded-full mb-6">
    {label}
  </div>
);
