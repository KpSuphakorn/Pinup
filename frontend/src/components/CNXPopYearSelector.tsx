import React from 'react';

interface CNXPopYearSelectorProps {
  year: number;
  setYear: (year: number) => void;
}

const years = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64];

export default function CNXPopYearSelector({ year, setYear }: CNXPopYearSelectorProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-2 text-center w-48 select-none">
      <label htmlFor="year-select" className="block mb-1 font-semibold text-gray-700">
        เลือกปีประชากร
      </label>
      <select
        id="year-select"
        className="w-full border border-gray-300 rounded-md p-1"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            ปี {y + 2500}
          </option>
        ))}
      </select>
    </div>
  );
}
