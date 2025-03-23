// components/EarthCanvas.tsx
"use client"; // Required for client-side rendering in Next.js

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader"

// Earth Component
const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf"); // Load GLTF model

  return (
    <primitive
      object={earth.scene} // The 3D scene object from the GLTF file
      scale={2.5} // Uniform scale
      position-y={0} // Y-position
      rotation-y={0} // Y-rotation in radians
    />
  );
};

// EarthCanvas Component
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]} // Device pixel ratio range
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45, // Field of view
        near: 0.1, // Near clipping plane
        far: 200, // Far clipping plane
        position: [-4, 3, 6], // Camera position [x, y, z]
      }}
      className="h-200 w-200 p-0 m-0"
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls
          autoRotate // Automatically rotate the model
          enableZoom={false} // Disable zooming
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation
          minPolarAngle={Math.PI / 2} // Lock vertical rotation
        />
        <Earth />
        <Preload all /> {/* Preload all assets */}
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;