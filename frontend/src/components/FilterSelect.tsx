import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Option = { value: string; label: string };

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string | null) => void;
}

const FilterSelect: React.FC<Props> = ({ label, options, value, onChange }) => {
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
