'use client';

import { useState } from 'react';
import { LayerOption, layerOptions } from '@/utils/layerUtils';

interface Props {
  selectedLayers: LayerOption[];
  setSelectedLayers: (layers: LayerOption[]) => void;
}

export default function LayerSelector({ selectedLayers, setSelectedLayers }: Props) {
  const [tempSelectedLayers, setTempSelectedLayers] = useState<LayerOption[]>(selectedLayers);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTempLayerChange = (option: LayerOption) => {
    if (option === 'none') return setTempSelectedLayers(['none']);
    setTempSelectedLayers(prev => {
      const withoutNone = prev.filter(l => l !== 'none');
      return prev.includes(option)
        ? withoutNone.filter(l => l !== option) || ['none']
        : [...withoutNone, option];
    });
  };

  const handleConfirm = () => {
    setSelectedLayers(tempSelectedLayers.length ? tempSelectedLayers : ['none']);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setTempSelectedLayers(selectedLayers);
    setShowDropdown(false);
  };

  const hasChanges = () =>
    JSON.stringify([...tempSelectedLayers].sort()) !== JSON.stringify([...selectedLayers].sort());

  return (
    <div className="absolute top-[105px] right-4 z-[1000]">
      <div className="relative">
        <button
          onClick={() => {
            setShowDropdown(!showDropdown);
            if (!showDropdown) setTempSelectedLayers(selectedLayers);
          }}
          className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 shadow-lg hover:shadow-xl transition-all min-w-[220px] flex justify-between items-center"
        >
          <span className="truncate font-medium text-gray-800">
            {selectedLayers.includes('none')
              ? 'ไม่แสดงข้อมูล'
              : selectedLayers.map(val => layerOptions.find(l => l.value === val)?.label).join(', ')}
          </span>
          <svg className={`w-5 h-5 ml-2 text-gray-600 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <>
            <div className="fixed inset-0 z-[999]" onClick={handleCancel}></div>
            <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl z-[1001]">
              <div className="p-2">
                <div className="mb-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">เลือกข้อมูลที่ต้องการแสดง</h3>
                  <p className="text-xs text-gray-600">เลือกได้หลายรายการ กดยืนยันเพื่อดึงข้อมูล</p>
                </div>
                {layerOptions.map(option => (
                  <label
                    key={option.value}
                    className={`flex items-start p-3 hover:bg-blue-50/50 cursor-pointer rounded-lg transition-all ${
                      tempSelectedLayers.includes(option.value)
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'border-l-4 border-transparent'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={tempSelectedLayers.includes(option.value)}
                      onChange={() => handleTempLayerChange(option.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                        {tempSelectedLayers.includes(option.value) && (
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="bg-gray-50/50 px-4 py-3 border-t border-gray-200">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>เลือกไว้: {tempSelectedLayers.includes('none') ? 0 : tempSelectedLayers.length}</span>
                  {hasChanges() && <span className="text-orange-600 font-medium">มีการเปลี่ยนแปลง</span>}
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleCancel} className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">ยกเลิก</button>
                  <button
                    onClick={handleConfirm}
                    disabled={!hasChanges()}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg ${
                      hasChanges() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
