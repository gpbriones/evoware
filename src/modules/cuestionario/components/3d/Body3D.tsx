import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import HumanModel from "./HumanModel";

interface Body3DProps {
  onSelect: (data: {
    raw: string;
    mapped: string;
  }) => void;
}

interface BodyControlsProps {
  modelRef: React.RefObject<THREE.Object3D | null>;
}

/*
 * =========================================================
 * CONTROLES DEL CUERPO
 * =========================================================
 */

function BodyControls({ modelRef }: BodyControlsProps) {
  const controlsRef = useRef<any>(null);

  const { camera, gl } = useThree();

  const raycaster = useRef(
    new THREE.Raycaster()
  );

  const mouse = useRef(
    new THREE.Vector2()
  );

  /*
   * Punto exacto del cuerpo
   * donde está el cursor
   */
  const currentPoint = useRef<THREE.Vector3 | null>(
    null
  );

  /*
   * =======================================================
   * POSICIÓN DEL MOUSE
   * =======================================================
   */

  const updateMouse = (
    clientX: number,
    clientY: number
  ) => {
    const rect =
      gl.domElement.getBoundingClientRect();

    mouse.current.x =
      ((clientX - rect.left) /
        rect.width) *
        2 -
      1;

    mouse.current.y =
      -(
        (clientY - rect.top) /
        rect.height
      ) *
        2 +
      1;
  };

  /*
   * =======================================================
   * BUSCAR PUNTO DEL CUERPO
   * =======================================================
   */

  const updateBodyPoint = () => {
    if (!modelRef.current) return;

    raycaster.current.setFromCamera(
      mouse.current,
      camera
    );

    const hits =
      raycaster.current.intersectObject(
        modelRef.current,
        true
      );

    if (hits.length > 0) {
      currentPoint.current =
        hits[0].point.clone();
    }
  };

  /*
   * =======================================================
   * MOUSE MOVE
   * =======================================================
   */

  const handlePointerMove = (
    event: PointerEvent
  ) => {
    updateMouse(
      event.clientX,
      event.clientY
    );

    updateBodyPoint();
  };

  /*
   * =======================================================
   * ZOOM HACIA EL CURSOR
   * =======================================================
   */

  const handleWheel = (
    event: WheelEvent
  ) => {
    if (!controlsRef.current) return;

    event.preventDefault();

    /*
     * Actualizar posición del cursor
     */

    updateMouse(
      event.clientX,
      event.clientY
    );

    /*
     * Obtener punto exacto
     * del cuerpo
     */

    updateBodyPoint();

    /*
     * Si el cursor está sobre el cuerpo,
     * usamos ese punto.
     *
     * Si no, usamos el centro actual.
     */

    const focusPoint =
      currentPoint.current ??
      controlsRef.current.target.clone();

    const target =
      controlsRef.current.target;

    /*
     * =====================================================
     * DIRECCIÓN ACTUAL
     * =====================================================
     */

    const direction =
      new THREE.Vector3()
        .subVectors(
          camera.position,
          target
        )
        .normalize();

    /*
     * Distancia actual
     */

    const distance =
      camera.position.distanceTo(
        target
      );

    /*
     * =====================================================
     * ZOOM
     * =====================================================
     */

    const zoomAmount =
      event.deltaY * 0.008;

    let newDistance =
      distance + zoomAmount;

    newDistance =
      THREE.MathUtils.clamp(
        newDistance,
        2,
        15
      );

    /*
     * =====================================================
     * NUEVA POSICIÓN DE CÁMARA
     * =====================================================
     */

    const newCameraPosition =
      focusPoint
        .clone()
        .add(
          direction.multiplyScalar(
            newDistance
          )
        );

    /*
     * =====================================================
     * MOVER CÁMARA
     * =====================================================
     */

    camera.position.copy(
      newCameraPosition
    );

    /*
     * =====================================================
     * MOVER TARGET
     * =====================================================
     *
     * Aquí está la diferencia importante:
     *
     * el centro de OrbitControls se mueve
     * hacia el punto donde está el mouse.
     */

    target.lerp(
      focusPoint,
      0.35
    );

    controlsRef.current.update();
  };

  /*
   * =======================================================
   * EVENTOS
   * =======================================================
   */

  useEffect(() => {
    const canvas =
      gl.domElement;

    canvas.addEventListener(
      "pointermove",
      handlePointerMove
    );

    canvas.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      canvas.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      canvas.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, [camera, gl, modelRef]);

  /*
   * =======================================================
   * ORBIT CONTROLS
   * =======================================================
   */

  return (
    <OrbitControls
      ref={controlsRef}

      enablePan={false}

      enableDamping
      dampingFactor={0.08}

      minDistance={2}
      maxDistance={15}

      minPolarAngle={
        Math.PI * 0.15
      }

      maxPolarAngle={
        Math.PI * 0.85
      }
    />
  );
}

/*
 * =========================================================
 * BODY 3D
 * =========================================================
 */

export default function Body3D({
  onSelect,
}: Body3DProps) {
  const modelRef =
    useRef<THREE.Object3D | null>(null);

  return (
    <div className="body3d-container">
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={1.5}
        />

        <directionalLight
          position={[-4, 3, 2]}
          intensity={0.8}
        />

        <Suspense fallback={null}>
          <HumanModel
            onSelect={onSelect}
            modelRef={modelRef}
          />
        </Suspense>

        <BodyControls
          modelRef={modelRef}
        />
      </Canvas>
    </div>
  );
}