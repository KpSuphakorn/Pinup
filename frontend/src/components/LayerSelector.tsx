'use client';

import { useState } from 'react';
import { LayerOption, layerOptions, globalLayers } from '@/utils/layerUtils';
import './style.css';

interface Props {
  selectedLayers: LayerOption[];
  setSelectedLayers: (layers: LayerOption[]) => void;
}

export default function LayerSelector({ selectedLayers, setSelectedLayers }: Props) {
  const [tempSelectedLayers, setTempSelectedLayers] = useState<LayerOption[]>(selectedLayers);
  const [showDropdown, setShowDropdown] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);

  // หาค่า center ('bangkok' | 'chiangmai') ของ layer
  const getCenterOfLayer = (layer: LayerOption): string | null => {
    return layerOptions.find(l => l.value === layer)?.center || null;
  };

  const handleTempLayerChange = (option: LayerOption) => {
    setWarning(null);

    // กรณีเลือก 'none'
    if (option === 'none') {
      setTempSelectedLayers(['none']);
      return;
    }

    setTempSelectedLayers(prev => {
      const withoutNone = prev.filter(l => l !== 'none');
      const alreadySelected = withoutNone.includes(option);

      // หา center ของ layers ที่ไม่ใช่ global
      const currentCenters = [...new Set(
        withoutNone
          .filter(l => !globalLayers.includes(l))
          .map(getCenterOfLayer)
      )];

      const optionCenter = getCenterOfLayer(option);

      // ถ้า option เป็น global layer (osm, zoning) เลือกได้เลย
      if (globalLayers.includes(option)) {
        return alreadySelected
          ? withoutNone.filter(l => l !== option)
          : [...withoutNone, option];
      }

      // เช็ค center สำหรับ non-global layer
      if (
        !alreadySelected &&
        currentCenters.length > 0 &&
        optionCenter &&
        !currentCenters.includes(optionCenter)
      ) {
        setWarning('ไม่สามารถเลือกข้อมูลจากคนละจังหวัดพร้อมกันได้');
        return withoutNone; // ไม่เพิ่มตัวใหม่
      }

      // toggle เลือก/ยกเลิก
      return alreadySelected
        ? withoutNone.filter(l => l !== option)
        : [...withoutNone, option];
    });
  };

  const handleConfirm = () => {
    setSelectedLayers(tempSelectedLayers.length ? tempSelectedLayers : ['none']);
    setShowDropdown(false);
    setWarning(null);
  };

  const handleCancel = () => {
    setTempSelectedLayers(selectedLayers);
    setShowDropdown(false);
    setWarning(null);
  };

  const hasChanges = () =>
    JSON.stringify([...tempSelectedLayers].sort()) !== JSON.stringify([...selectedLayers].sort());

  return (
    <div className="layer-selector">
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
          if (!showDropdown) {
            setTempSelectedLayers(selectedLayers);
            setWarning(null);
          }
        }}
        className="layer-selector-button"
      >
        <span className="layer-selector-button-text">
          {selectedLayers.includes('none')
            ? 'ไม่แสดงข้อมูล'
            : selectedLayers.map(val => layerOptions.find(l => l.value === val)?.label).join(', ')}
        </span>
        <svg
          className={`layer-selector-arrow ${showDropdown ? 'rotated' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="layer-selector-dropdown">
          <div className="layer-selector-content">
            <div className='layer-selector-header-wrapper'>
              <div className="layer-selector-header">
                <h3 className="layer-selector-title">เลือกข้อมูลที่ต้องการแสดง</h3>
                <p className="layer-selector-subtitle">เลือกได้หลายรายการ กดยืนยันเพื่อดึงข้อมูล</p>
              </div>
            </div>

            {warning && (
              <p className="layer-selector-warning">
                <span className="warning-icon" aria-hidden="true">⚠️</span>
                {warning}
              </p>
            )}

            {layerOptions.map(option => (
              <label
                key={option.value}
                className={`layer-option ${tempSelectedLayers.includes(option.value) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={tempSelectedLayers.includes(option.value)}
                  onChange={() => handleTempLayerChange(option.value)}
                  className="layer-option-checkbox"
                />
                <div className="layer-option-content">
                  <div className="layer-option-header">
                    <div className="layer-option-label">{option.label}</div>
                    {tempSelectedLayers.includes(option.value) && (
                      <div className="layer-option-indicator"></div>
                    )}
                  </div>
                  <div className="layer-option-description">{option.description}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="layer-selector-footer">
            <div className="layer-selector-status">
              <span>เลือกไว้: {tempSelectedLayers.includes('none') ? 0 : tempSelectedLayers.length}</span>
              {hasChanges() && <span className="layer-selector-status-changed">มีการเปลี่ยนแปลง</span>}
            </div>
            <div className="layer-selector-actions">
              <button onClick={handleCancel} className="layer-selector-button-cancel">
                ยกเลิก
              </button>
              <button
                onClick={handleConfirm}
                disabled={!hasChanges()}
                className={`layer-selector-button-confirm ${hasChanges() ? 'enabled' : 'disabled'}`}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}