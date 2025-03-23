
"use client"; 

import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef, Suspense } from "react";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random";
import { Group as ThreeGroup } from "three"; // Correct import for Three.js Group

// Stars Component
const Stars = (props: any) => {
  const ref = useRef<ThreeGroup>(null); // Type ref as Three.js Group

  // 5000 particles with radius 1.2
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 }); // Typo corrected: 'random' to 'radius'

  // Rotate the stars on each frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        frustumCulled
        {...props}
        stride={3}
      >
        <PointMaterial
          color="#f272c8"
          transparent
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// StarsCanvas Component
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;