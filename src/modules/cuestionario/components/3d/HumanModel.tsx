import {
  useGLTF,
  Center,
  Html,
  Bounds,
} from "@react-three/drei";

import {
  useState,
  useEffect,
} from "react";

import * as THREE from "three";


// =========================================================
// PROPS
// =========================================================

interface HumanModelProps {
  onSelect: (data: {
    raw: string;
    mapped: string;
  }) => void;

  modelRef: React.RefObject<THREE.Object3D | null>;
}


// =========================================================
// COMPONENTE
// =========================================================

export default function HumanModel({
  onSelect,
  modelRef,
}: HumanModelProps) {

  const { scene } =
    useGLTF("/models/human_back.glb");


  // =======================================================
  // MAPEO DE PARTES DEL CUERPO
  // =======================================================

  const bodyMap: Record<string, string> = {

    b_cuello:
      "Cuello",

    b_hombro_der:
      "Hombro Derecho",

    b_hombro_izq:
      "Hombro Izquierdo",

    b_dorsal:
      "Espalda (zona dorsal)",

    b_lumbar:
      "Espalda (zona lumbar)",

    b_codo_izq:
      "Codo Izquierdo",

    b_codo_der:
      "Codo Derecho",

    b_brazo_izq:
      "Brazo Izquierdo",

    b_brazo_der:
      "Brazo Derecho",

    b_ante_izq:
      "Antebrazo Izquierdo",

    b_ante_der:
      "Antebrazo Derecho",

    b_mano_izq:
      "Mano Izquierda",

    b_mano_der:
      "Mano Derecha",

    b_pierna_der:
      "Pierna Derecha",

    b_pierna_izq:
      "Pierna Izquierda",

    b_rodilla_der:
      "Rodilla Derecha",

    b_rodilla_izq:
      "Rodilla Izquierda",

    b_pan_izq:
      "Pantorrilla Izquierda",

    b_pan_der:
      "Pantorrilla Derecha",

    pie_izq:
      "Pie Izquierdo",

    pie_der:
      "Pie Derecho",
  };


  // =======================================================
  // ESTADOS
  // =======================================================

  const [hovered, setHovered] =
    useState<string | null>(null);


  const [hoverPos, setHoverPos] =
    useState<[number, number, number]>(
      [0, 0, 0]
    );


  const [selected, setSelected] =
    useState<string | null>(null);


  // =======================================================
  // CLONAR MATERIALES
  // =======================================================

  useEffect(() => {

    if (!scene) return;


    scene.traverse(
      (child: any) => {

        if (
          child.isMesh &&
          child.material
        ) {

          child.material =
            child.material.clone();
        }
      }
    );

  }, [scene]);


  // =======================================================
  // CAMBIO DE COLORES
  // =======================================================

  useEffect(() => {

    if (!scene) return;


    scene.traverse(
      (child: any) => {

        if (
          !child.isMesh ||
          !child.material
        ) {
          return;
        }


        // -----------------------------------------------
        // HOVER
        // -----------------------------------------------

        if (
          bodyMap[child.name] ===
          hovered
        ) {

          child.material.color.set(
            "#fffb00"
          );

        }

        // -----------------------------------------------
        // SELECCIONADO
        // -----------------------------------------------

        else if (
          bodyMap[child.name] ===
          selected
        ) {

          child.material.color.set(
            "#ff0000"
          );

        }

        // -----------------------------------------------
        // NORMAL
        // -----------------------------------------------

        else {

          child.material.color.set(
            "#c9d3d6"
          );
        }


        child.material.needsUpdate =
          true;
      }
    );

  }, [
    hovered,
    selected,
    scene,
  ]);


  // =======================================================
  // MODELO
  // =======================================================

  return (

    <Bounds
      fit
      clip
      margin={1.2}
    >

      <Center>

        <primitive

          /*
           * =================================================
           * IMPORTANTE
           * =================================================
           *
           * Este ref permite que Body3D pueda hacer
           * raycasting directamente contra el modelo.
           */

          ref={modelRef}

          object={scene}


          /*
           * Mantener orientación actual
           */

          rotation={[
            0,
            Math.PI,
            0,
          ]}


          /*
           * Mantener posición actual
           */

          position={[
            3,
            3.0,
            0,
          ]}


          // =================================================
          // MOUSE SOBRE EL MODELO
          // =================================================

          onPointerOver={(e: any) => {

            e.stopPropagation();


            const rawName =
              e.object.name;


            const mappedName =
              bodyMap[rawName];


            /*
             * Si no es una parte válida
             * no hacemos nada.
             */

            if (!mappedName) {
              return;
            }


            console.log(
              "Parte:",
              rawName
            );


            /*
             * Nombre visual
             */

            setHovered(
              mappedName
            );


            /*
             * Posición exacta
             * donde está el cursor
             * sobre el cuerpo.
             */

            setHoverPos([

              e.point.x,

              e.point.y + 0.25,

              e.point.z,

            ]);

          }}


          // =================================================
          // MOUSE SALE DEL MODELO
          // =================================================

          onPointerOut={(e: any) => {

            e.stopPropagation();

            setHovered(null);

          }}


          // =================================================
          // CLICK
          // =================================================

          onClick={(e: any) => {

            e.stopPropagation();


            const rawName =
              e.object.name;


            const mapped =
              bodyMap[rawName];


            /*
             * Ignorar elementos que no
             * estén definidos en bodyMap.
             */

            if (!mapped) {
              return;
            }


            /*
             * Marcar seleccionado
             */

            setSelected(
              mapped
            );


            /*
             * Enviar información
             * al BodyPage.
             */

            onSelect({

              raw: rawName,

              mapped: mapped,

            });

          }}

        />


        {/* =================================================
            ETIQUETA FLOTANTE
        ================================================= */}

        {hovered && (

          <Html

            position={
              hoverPos
            }

            center

            distanceFactor={6}

          >

            <div
              style={{

                background:
                  "rgba(0, 0, 0, 0.75)",

                color:
                  "white",

                padding:
                  "6px 10px",

                borderRadius:
                  "6px",

                fontSize:
                  "12px",

                whiteSpace:
                  "nowrap",

                pointerEvents:
                  "none",

                userSelect:
                  "none",

              }}
            >

              {hovered}

            </div>

          </Html>

        )}

      </Center>

    </Bounds>
  );
}


// =========================================================
// PRE-CARGAR MODELO
// =========================================================

useGLTF.preload(
  "/models/human_back.glb"
);