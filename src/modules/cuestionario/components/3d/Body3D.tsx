import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import HumanModel from "./HumanModel";

export default function Body3D({ onSelect }: any) {
  return (
    <Canvas  camera={{ position: [1, 2, 7], fov: 50 }}>
      <ambientLight />

      <Suspense fallback={null}>
        <HumanModel onSelect={onSelect} />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}