'use client';
import Map from '../components/Map';
import { useState } from 'react';

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