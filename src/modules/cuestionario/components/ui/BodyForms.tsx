import type { BodyPart } from "../../types/body";


export default function BodyForms({ selected }: { selected: BodyPart | null }) {
  if (!selected) {
    return <p>Selecciona una parte del cuerpo</p>;
  }

  const forms: Record<string, React.JSX.Element> = {
    Head: (
      <>
        <h3>Cabeza</h3>
        <input placeholder="Dolor de cabeza" />
      </>
    ),
    Arm_L: (
      <>
        <h3>Brazo izquierdo</h3>
        <input placeholder="Dolor en brazo izquierdo" />
      </>
    ),
    Torso: (
      <>
        <h3>Torso</h3>
        <input placeholder="Molestia en torso" />
      </>
    ),
  };

  return (
    <div>
      {forms[selected] || <p>No hay formulario disponible</p>}
    </div>
  );
}