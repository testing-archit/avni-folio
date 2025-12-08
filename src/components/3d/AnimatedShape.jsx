import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import SimpleFloat from './SimpleFloat';

function AnimatedShape({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2 * speed;
      meshRef.current.rotation.y = t * 0.3 * speed;
    }
  });

  return (
    <SimpleFloat speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </SimpleFloat>
  );
}

export default AnimatedShape;