import React from "react";

interface FormInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({ value, onChange }) => (
  <div className="space-y-3">
    <label className="block font-medium text-gray-700">
      Job Description
    </label>
    <textarea
      className="w-full h-32 px-4 py-3 text-base rounded-xl transition-all duration-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste job description here (optional)..."
    />
  </div>
);