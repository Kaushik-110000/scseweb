// components/Loader.tsx
"use client"; // Required for client-side rendering in Next.js

import { Html, useProgress } from "@react-three/drei";

// Define the CanvasLoader component
const CanvasLoader = () => {
  const { progress } = useProgress(); // Destructure progress from useProgress hook

  return (
    <Html
      as="div" // Specify the HTML element to render
      center // Centers the content in the 3D canvas
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
     <span
        className="w-10 h-10 border-4 border-gray-200 border-t-4 border-t-pink-500 rounded-full animate-spin"
      />
      <p
        style={{
          fontSize: 14,
          color: "#FFFFFF",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;