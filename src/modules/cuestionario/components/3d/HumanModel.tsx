import { useGLTF, Center, Html } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function HumanModel({ onSelect }: any) {
  const { scene } = useGLTF("/models/human_back.glb");

  const bodyMap: Record<string, string> = {
    b_cuello: "Cuello",
    b_hombro_der: "Hombro Derecho",
    b_hombro_izq: "Hombro Izquierdo",
    b_dorsal: "Espalda (zona dorsal)",
    b_lumbar: "Espalda (zona lumbar)",
    b_codo_izq: "Codo Izquierdo",
    b_codo_der: "Codo Derecho",
    b_brazo_izq: "Brazo Izquierdo",
    b_brazo_der: "Brazo Derecho",
    b_ante_izq: "Antebrazo Izquierdo",
    b_ante_der: "Antebrazo Derecho",
    b_mano_izq: "Mano Izquierda",
    b_mano_der: "Mano Derecha",
    b_pierna_der: "Pierna Derecha",
    b_pierna_izq: "Pierna Izquierda",
    b_rodilla_der: "Rodilla Derecha",
    b_rodilla_izq: "Rodilla Izquierda",
    b_pan_izq: "Pantorrilla Izquierda",
    b_pan_der: "Pantorrilla Derecha",
    pie_izq: "Pie Izquierdo",
    pie_der: "Pie Derecho",
  };

  const [hovered, setHovered] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<[number, number, number]>();
  const [selected, setSelected] = useState<string | null>(null);

  // 🔥 CLONAR materiales (una vez)
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });
  }, [scene]);

  // 🎨 CAMBIO DE COLORES
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // 👉 solo partes válidas
        //if (!bodyMap[child.name]) return;

        if (bodyMap[child.name] === hovered) {
          child.material.color.set("#fffb00"); // hover
        } else if (child.name === selected) {
          child.material.color.set("#ff0000"); // seleccionado
        } else {
          child.material.color.set("#c9d3d6"); // normal
        }

        child.material.needsUpdate = true;
      }
    });
  }, [hovered, selected, scene]);

  return (
    <Center>
      <primitive
        object={scene}
        scale={0.30}
        position={[0, 1.5, 0]} // 🔥 súbelo aquí
        rotation={[0, Math.PI, 0]} // 🔥 rotación


        onPointerOver={(e: any) => {
          e.stopPropagation();
          const rawName = e.object.name;
          //if (!bodyMap[name]) return;
          console.log(rawName);
          const mappedName = bodyMap[rawName];
          setHovered(mappedName || rawName); // fallback 🔥
          // 🔥 guardar posición exacta
          // 🔥 dirección perpendicular a la malla
          setHoverPos([
            e.point.x + 0.5,
            e.point.y + 4,
            e.point.z ,
          ]);
        }}

        onPointerOut={(e: any) => {
          e.stopPropagation();
          setHovered(null);
        }}

        onClick={(e: any) => {
          e.stopPropagation();

          const rawName = e.object.name;
          const mapped = bodyMap[rawName];

          if (!mapped) return;

          setSelected(mapped);
          onSelect({
            raw: rawName,
            mapped: bodyMap[rawName]
          });
        }}
      />
      {/* 🔥 ETIQUETA FLOTANTE */}
      {hovered && (
        <Html position={hoverPos} center distanceFactor={6}>
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "6px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              pointerEvents: "none", // 🔥 importante
            }}
          >
            {hovered}
          </div>
        </Html>
      )}
    </Center>
  );
}