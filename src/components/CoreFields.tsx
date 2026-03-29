import React, { useState, useEffect } from "react";

interface CoreFieldsProps {
  marks: {
    english: string;
    secondLanguage: string;
    subject1: string;
    subject2: string;
    subject3: string;
    subject4: string;
  };
  onChange: (field: string, value: string) => void;
}

export function CoreFields({ marks, onChange }: CoreFieldsProps) {
  const InputField = ({ label, name, value }: { label: string; name: string; value: string }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "" || /^[0-9]*$/.test(val)) {
        setLocalValue(val);
      }
    };

    const handleBlur = () => {
      let num = parseInt(localValue, 10);
      if (isNaN(num)) num = 0;
      if (num > 200) num = 200;
      setLocalValue(num.toString());
      onChange(name, num.toString());
    };

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={name} className="text-sm font-semibold text-slate-700">
          {label} <span className="text-slate-400 font-normal text-xs">(Max 200)</span>
        </label>
        <input
          type="text"
          inputMode="numeric"      
          pattern="[0-9]*"
          id={name}
          name={name}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Part I & II (Languages)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="English (Part I)" name="english" value={marks.english} />
          <InputField label="Second Language (Part II)" name="secondLanguage" value={marks.secondLanguage} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Part III (Core Subjects)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Subject 1" name="subject1" value={marks.subject1} />
          <InputField label="Subject 2" name="subject2" value={marks.subject2} />
          <InputField label="Subject 3" name="subject3" value={marks.subject3} />
          <InputField label="Subject 4" name="subject4" value={marks.subject4} />
        </div>
      </div>
    </div>
  );
}