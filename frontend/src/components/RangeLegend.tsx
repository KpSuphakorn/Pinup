'use client';

import { useState, useEffect, useRef } from 'react';
import { RangeLegendProps } from '@/types/index';
import {
  createLayerConfigs,
  createLayerConfigMap,
  validateLayerConfig,
  getLegendItems
} from '../utils/rangelegendUtils';

export default function RangeLegend({
  selectedLayerKeys = [],
  populationRangeData,
  landpricesubdRangeData,
  ...otherRangeData
}: RangeLegendProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // สร้าง layer configs ผ่าน utils
  const layerConfigs = createLayerConfigs({
    populationRangeData,
    landpricesubdRangeData,
    ...otherRangeData
  });

  // Create a map for quick lookup with safety check
  const layerConfigMap = createLayerConfigMap(layerConfigs);

  // Early return if no configs or selected keys
  if (layerConfigs.length === 0 || selectedLayerKeys.length === 0) {
    return null;
  }

  // Update active key when selected layers change
  useEffect(() => {
    if (selectedLayerKeys.length === 1) {
      setActiveKey(selectedLayerKeys[0]);
    } else if (!selectedLayerKeys.includes(activeKey || '')) {
      setActiveKey(selectedLayerKeys[0] ?? null);
    }
  }, [selectedLayerKeys, activeKey]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!activeKey || !layerConfigMap[activeKey]) return null;

  const activeConfig = layerConfigMap[activeKey];

  // Safety check for active config and range data ผ่าน utils
  if (!validateLayerConfig(activeConfig)) {
    return null;
  }

  const legendItems = getLegendItems(activeConfig);

  if (!legendItems || legendItems.length === 0) return null;

  const handleOptionSelect = (key: string) => {
    setActiveKey(key);
    setIsDropdownOpen(false);
  };

  return (
    <div className="range-legend-container">
      <div className="range-legend-label">
        ข้อมูล:{" "}
        {selectedLayerKeys.length > 1 ? (
          <div ref={dropdownRef} className="legend-dropdown-wrapper">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="legend-button"
            >
              {activeConfig.displayName || activeKey}
              <span style={{ float: 'right', marginLeft: '0.5rem' }}>
                {isDropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="legend-dropdown">
                {selectedLayerKeys.map((key) => {
                  const config = layerConfigMap[key];
                  return (
                    <button
                      key={key}
                      onClick={() => handleOptionSelect(key)}
                      className={`legend-dropdown-item ${key === activeKey ? 'active' : ''
                        }`}
                    >
                      {config?.displayName || key}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          activeConfig.displayName
        )}
      </div>

      <div className="legend-content">
        {legendItems.map((item, idx) => (
          <div key={idx} className="legend-item">
            <div className="legend-item-content">
              <span
                className="legend-color-box"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
Example usage:

// ใช้งาน component แบบใหม่
<RangeLegend
  selectedLayerKeys={['population', 'landprice']}
  populationRangeData={populationRangeData}
  landpricesubdRangeData={landpricesubdRangeData}
/>

// เพิ่ม layer ใหม่
<RangeLegend
  selectedLayerKeys={['population', 'landprice', 'income']}
  populationRangeData={populationRangeData}
  landpricesubdRangeData={landpricesubdRangeData}
  incomeRangeData={incomeRangeData}
/>
*/