import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Simplified data structure matching logic reqs
export const PROGRAMS = {
  GROUP_A: [
    { id: "ba-arabic", name: "Arabic & Islamic History", description: "Total_12th + (2 * Part_II_Arabic) + Bonuses" },
    { id: "ba-english", name: "English/Functional English", description: "Total_12th + (2 * English) + Bonus" },
    { id: "ba-malayalam", name: "Malayalam", description: "Total_12th + (2 * Part_II_Malayalam) + Bonus" },
    { id: "ba-econ-soc", name: "Economics/Sociology", description: "Total_12th + 50 (if subject studied)" },
    { id: "ba-multimedia", name: "Multimedia", description: "Total_12th + 50 (if Multimedia/Web Tech studied)" },
  ],
  GROUP_B: [
    { id: "bcom", name: "B.Com (Finance/Computer Application)", description: "Total_12th + (25 * Count_Commerce_Papers) max 50" },
    { id: "bba", name: "Bachelor of Business Administration(BBA)", description: "Total_12th (No extra weightage)" },
  ],
  GROUP_C: [
    { id: "bsc-core", name: "Botany/Chemistry/Maths/Physics/Zoology", description: "Part_III_Total + Marks_in_Concerned_Subject" },
    { id: "bsc-cs", name: "Computer Science", description: "Part_III_Total + max(Maths, Computer_Science/IT)" },
    { id: "bsc-stats", name: "Statistics", description: "(Part_III_Total + Maths/Stat) * 1.10 (if Science)" },
    { id: "bsc-psych", name: "Psychology", description: "Total_12th + (0.15 * Psychology_Marks)" },
  ],
  GROUP_D: [
    { id: "bvoc-sd", name: "B.Voc Software Development", description: "Part_III_Total + max(Maths, CS, IT) + Bonus" },
    { id: "bvoc-auto", name: "B.Voc Automobile", description: "Part_III_Total + Maths" },
  ],
  GROUP_E: [
    { id: "msc-geology", name: "Integrated M.Sc Geology", description: "Part_III_Total + Science / Geology + Bonus" },
  ],

};

const PROGRAM_FIELDS: Record<string, any[]> = {
  // ---------- BA ----------
  "ba-arabic": [
    { name: "part2Arabic", label: "Part II Arabic Marks" },
    { name: "studiedHistoryOptional", label: "Did you study History / Islamic Jurisprudence / Islamic History?", type: "boolean" },
    {
      name: "studiedArabicOptional",
      label: "Did you study Optional Arabic/Classical Literature/Quran and Hadith?",
      type: "boolean"
    }
  ],

  "ba-english": [
    {
      name: "studiedEnglishOptional",
      label: "Did you study English/Functional/Communicative English as optional subject?",
      type: "boolean"
    }
  ],

  "ba-malayalam": [
    { name: "slMarks", label: "Marks secured in Additional Languages/Second languages concerned" },
    {
      name: "studiedMalayalamOptional",
      label: "Did you study Malayalam as optional subject?",
      type: "boolean"
    }
  ],

  "ba-econ-soc": [
    {
      name: "studiedOptional",
      label: "Did you study Economics/Sociology as optional subject?",
      type: "boolean"
    }
  ],

  "ba-multimedia": [
    {
      name: "studiedMultimedia",
      label: "Did you study Multimedia/Web Technology as optional subject?",
      type: "boolean"
    }
  ],

  // ---------- BCOM ----------
  "bcom": [
    {
      name: "commercePapers",
      label: "Number of Commerce Papers studied",
      type: "select",
      options: ["1 paper", "2 or more papers"]
    }
  ],

  // ---------- BSC ----------
  "bsc-core": [
    {
      name: "coreSubjectMarks",
      label: "Marks obtained for concerned subject (Botany/Chemistry/Maths/Physics/Zoology)",
      type: "number"
    }
  ],

  "bsc-cs": [

    {
      name: "csMarks",
      label: "Marks obtained for CS/IT/Informatics/Computer Application",
      type: "number"
    },
    {
      name: "studiedMaths",
      label: "Did you study Mathematics?",
      type: "boolean"
    },
    {
      name: "mathsMarks",
      label: "Marks obtained for Mathematics",
      type: "number",
      showIf: { field: "studiedMaths", value: "yes" }

    },
  ],

  "bsc-stats": [
    {
      name: "mathsStatsMarks",
      label: "Marks obtained for Mathematics/Statistics",
      type: "number"
    },
    {
      name: "stream",
      label: "Select your stream",
      type: "select",
      options: ["Science stream with mathematics", "Other streams"]
    }
  ],

  "bsc-psych": [
    {
      name: "studiedPsychology",
      label: "Did you study Psychology?",
      type: "boolean"
    },
    {
      name: "psychologyMarks",
      label: "Marks obtained for Psychology",
      type: "number",
      showIf: { field: "studiedPsychology", value: "yes" }
    }
  ],

  "bsc-zoology": [
    {
      name: "biologyMarks",
      label: "Marks obtained for Biology/Zoology",
      type: "number"
    }
  ],

  "bsc-botany": [
    {
      name: "botanyMarks",
      label: "Marks obtained for Biology/Botany",
      type: "number"
    }
  ],

  "bsc-chemistry": [
    {
      name: "chemistryMarks",
      label: "Marks obtained for Chemistry",
      type: "number"
    }
  ],

  "bsc-maths": [
    {
      name: "mathsMarks",
      label: "Marks obtained for Mathematics",
      type: "number"
    }
  ],

  "bsc-physics": [
    {
      name: "physicsMarks",
      label: "Marks obtained for Physics",
      type: "number"
    }
  ],

  // ---------- INTEGRATED MSC ----------
  "msc-geology": [
    {
      name: "stream",
      label: "Select your stream",
      type: "select",
      options: ["Science Stream", "Humanities Stream"]
    },
    {
      name: "scienceHighest",
      label: "Highest marks among Science subjects",
      type: "number",
      showIf: {
        field: "stream",
        value: "Science Stream"
      }
    },
    {
      name: "geologyMarks",
      label: "Marks obtained for Geology (for humanities)",
      type: "number",
      showIf: {
        field: "stream",
        value: "Humanities Stream"
      }
    }
  ],

  // ---------- BVOC ----------
  "bvoc-sd": [
    {
      name: "mathsMarks",
      label: "Marks obtained for Mathematics",
      type: "number"
    },
    {
      name: "csMarks",
      label: "Marks obtained for CS/IT/Computer Application",
      type: "number"
    },
    {
      name: "isVHS",
      label: "Are you a VHS pass out student?",
      type: "boolean"
    }
  ],

  "bvoc-auto": [
    {
      name: "mathsMarks",
      label: "Marks obtained for Mathematics",
      type: "number"
    }
  ]


};


interface ProgramSelectorProps {
  selectedProgram: string;
  onSelect: (programId: string) => void;
  onFormChange: (data: any) => void;
  currentLogic: string;
}


export function ProgramSelector({ selectedProgram, onSelect, onFormChange, currentLogic }: ProgramSelectorProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const visibleFields =
    selectedProgram && PROGRAM_FIELDS[selectedProgram]
      ? PROGRAM_FIELDS[selectedProgram].filter((field) => {
        if (!field.showIf) return true;
        return formData[field.showIf.field] === field.showIf.value;
      })
      : [];

  useEffect(() => {
    setFormData({});
  }, [selectedProgram]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value
      };

      onFormChange(updated);

      return updated;
    });
  };


  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700">
          Target Program
        </label>
        <select
          value={selectedProgram}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="" disabled>Select a program...</option>
          <optgroup label="Group A (BA Programs)">
            {PROGRAMS.GROUP_A.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </optgroup>
          <optgroup label="Group B (Commerce)">
            {PROGRAMS.GROUP_B.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </optgroup>
          <optgroup label="Group C (Science)">
            {PROGRAMS.GROUP_C.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </optgroup>
          <optgroup label="Group D (Vocational)">
            {PROGRAMS.GROUP_D.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </optgroup>
          <optgroup label="Group E (Ingtegrated)">
            {PROGRAMS.GROUP_E.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </optgroup>
        </select>
      </div>
      {selectedProgram && PROGRAM_FIELDS[selectedProgram] && (
        <div className="space-y-4">
          {visibleFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                {field.label}
              </label>

              {field.type === "boolean" && (
                <select
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleChange(field.name, e.target.value)
                  }
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              )}

              {/* SELECT */}
              {field.type === "select" && (
                <select
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleChange(field.name, e.target.value)
                  }
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Select</option>
                  {field.options.map((opt: string) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {/* NUMBER */}
              {(!field.type || field.type === "number") && (
                <input
                  type="number"
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleChange(field.name, e.target.value)
                  }
                  className="px-3 py-2 border rounded-lg"
                  placeholder="Enter marks"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {PROGRAMS.GROUP_B.some(p => p.id === selectedProgram) && currentLogic && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-3 items-start">
          <div className="text-blue-500 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">Commerce Papers include:</p>
            <p className="text-sm text-blue-700 font-medium">{'Accountancy, Accountancy and Auditing, Accountancy with AFS, Accountancy with Computer Accounting, Accountancy (Analysis of Financial Statements), Accountancy (computerized accounting), Accounts, Banking Assistance, Banking with Secretarial Practice, Book Keeping and Accountancy, Book-Keeping & Basic Mathematics, Book-Kpng & Accountancy, Business Studies, Business Studies with Functional Management, Business Mathematics, Catering and Restaurant Management, Commerce, Commercial Correspondence and Commercial Geography, Commercial Geography & Commercial Correspondence, General insurance, Management, Marketing, Marketing and Salesmanship, Office Secretaryship, Reception, Book Keeping and Communication'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
