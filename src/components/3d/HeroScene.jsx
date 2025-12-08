import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import StarBackground from './StarBackground';
import AnimatedShape from './AnimatedShape';
import FloatingParticles from './FloatingParticles';

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
        <Suspense fallback={null}>
          <StarBackground />
          {/* Main Hero Object */}
          <AnimatedShape position={[2, 0, 0]} color="#a855f7" />
          {/* Secondary decorative objects */}
          <AnimatedShape position={[-3, 2, -4]} color="#3b82f6" speed={0.5} />
          <AnimatedShape position={[-2, -3, -2]} color="#ec4899" speed={0.7} />
          <FloatingParticles />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroScene;