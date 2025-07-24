'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// ใช้ dynamic import แทนการ import ปกติ
const Map = dynamic(() => import('../components/Map'), {
  ssr: false, // ปิด SSR สำหรับ Map component
  loading: () => <div>Loading map...</div>
});

export default function Home() {
  const [landId, setLandId] = useState(1);

  return (
    <div>
      <div className="input-container">
        <input
          type="number"
          value={landId}
          onChange={(e) => setLandId(Number(e.target.value))}
          placeholder="Enter Land ID"
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <Map landId={landId} />
    </div>
  );
}