// สร้างสีจาก string เช่น display_name หรือชื่ออื่น
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - c.length) + c}`;
}

// ทำให้สีอ่อนลงจาก hex เดิม
export function lightenColor(hexColor: string, percent: number): string {
  const num = parseInt(hexColor.replace('#', ''), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  return `rgb(${r}, ${g}, ${b})`;
}

// แปลง hex → rgba โดยกำหนด opacity (0.0 - 1.0)
export function addOpacityToHexColor(hexColor: string, opacity: number): string {
  // ตัด '#' ออกถ้ามี
  const hex = hexColor.replace('#', '');

  // ถ้าเป็น shorthand (3 หลัก) ให้แปลงเป็น 6 หลัก
  const fullHex = hex.length === 3
    ? hex.split('').map(c => c + c).join('')
    : hex;

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function getParkingLotPopupColor(type: string): string {
  switch (type) {
    case 'ลานจอดรถ':
      return 'rgba(30, 144, 255, 0.3)'; // น้ำเงินโปร่ง
    case 'อาคารจอดรถ':
      return 'rgba(255, 165, 0, 0.3)'; // ส้มโปร่ง
    default:
      return 'rgba(136, 136, 136, 0.3)'; // เทาโปร่ง
  }
}