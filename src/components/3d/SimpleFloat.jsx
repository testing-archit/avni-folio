import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Custom Float component to replace @react-three/drei Float
function SimpleFloat({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1 }) {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * speed) * 0.2 * floatIntensity;
      group.current.rotation.x = (Math.cos(t * speed) * 0.1 * rotationIntensity);
      group.current.rotation.z = (Math.sin(t * speed) * 0.1 * rotationIntensity);
    }
  });

  return <group ref={group}>{children}</group>;
}

export default SimpleFloat;