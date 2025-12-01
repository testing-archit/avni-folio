import { useMemo } from 'react';

export function FloatingParticles({ count = 50 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={points.length / 3} 
          array={points} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}


