"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Icosahedron, Stars } from "@react-three/drei";

// Highly optimized 3D object replacing the heavy glass
function LuxuryObject() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Icosahedron has very few vertices, rendering instantly */}
      <Icosahedron ref={meshRef} args={[1.5, 1]} scale={1.2}>
        <meshStandardMaterial 
          color="#111111" // Dark premium color
          metalness={0.9} 
          roughness={0.2}
          wireframe={true} // Wireframe is extremely lightweight and looks very futuristic
        />
      </Icosahedron>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,rgba(0,0,0,1)_70%)] z-0 pointer-events-none" />
      
      {/* Performance fix: Add dpr={[1, 1.5]} to prevent massive pixel pushing on high-res Retina/4K screens */}
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 45 }} className="z-10">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#D4AF37" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8A2BE2" />
        
        {/* Environment map for realistic lighting */}
        <Environment preset="city" />
        
        <LuxuryObject />
        
        {/* Reduced star count drastically for performance */}
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
