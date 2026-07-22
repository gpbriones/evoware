"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FloatingNode({ radius }: { radius: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    t.toLocaleString;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
    ref.current.position.set(x, y, z);
  });
  

  return (
    
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshStandardMaterial color="#10b981" transparent opacity={0.5} />
    </mesh>
  );
}

export default function ThreeBackground() {
  const nodes = Array.from({ length: 50 });

  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      {nodes.map((_, i) => (
        <FloatingNode key={i} radius={3 + Math.random()} />
      ))}
    </Canvas>
  );
}