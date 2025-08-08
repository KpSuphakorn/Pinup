import { LayerConfig } from '@/types/index';
import { populationStyles } from '@/styles/populationStyles';
import { landpricesubdStyles } from '@/styles/landpricesubdStyles';
import { pop5564Styles } from '@/styles/CNX/pop5564Styles';

interface RangeDataCollection {
  populationRangeData?: any;
  landpricesubdRangeData?: any;
  pop5564RangeData?: any;
  incomeRangeData?: any;
  // เพิ่ม range data อื่นๆ ได้ที่นี่
}

export function createLayerConfigs(rangeData: RangeDataCollection): LayerConfig[] {
  const configs: LayerConfig[] = [];
  
  if (rangeData.populationRangeData) {
    configs.push({
      key: 'population',
      displayName: 'ความหนาแน่นประชากร (คน/ตร.กม.)',
      style: populationStyles,
      rangeData: rangeData.populationRangeData
    });
  }
  
  if (rangeData.landpricesubdRangeData) {
    configs.push({
      key: 'landprice',
      displayName: 'ราคาที่ดินตามแขวง (บาท/ตร.ว.)',
      style: landpricesubdStyles,
      rangeData: rangeData.landpricesubdRangeData
    });
  }

  if (rangeData.pop5564RangeData) {
    configs.push({
      key: 'pop5564',
      displayName: 'จำนวนประชากร (คน)',
      style: pop5564Styles,
      rangeData: rangeData.pop5564RangeData
    });
  }
  
  // เพิ่ม layer อื่นๆ ได้ที่นี่
  // if (rangeData.incomeRangeData) {
  //   configs.push({
  //     key: 'income',
  //     displayName: 'รายได้เฉลี่ย',
  //     style: incomeStyles,
  //     rangeData: rangeData.incomeRangeData
  //   });
  // }
  
  return configs;
}

export function createLayerConfigMap(configs: LayerConfig[]): Record<string, LayerConfig> {
  return configs.reduce((acc, config) => {
    acc[config.key] = config;
    return acc;
  }, {} as Record<string, LayerConfig>);
}

export function validateLayerConfig(config: LayerConfig | undefined): boolean {
  return !!(config && config.rangeData);
}

export function getLegendItems(config: LayerConfig) {
  if (!validateLayerConfig(config)) {
    return [];
  }
  
  return config.style.getLegendItems(config.rangeData);
}