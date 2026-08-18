import { useState } from "react";
import { guardarCuestionario } from "../services/cuestionarioService";

export default function Questionnaire() {
  const [form, setForm] = useState({
    cuello: false,
    hombros: false,
    espaldaAlta: false,
    espaldaBaja: false,
    intensidad: 0,
  });

  const handleCheck = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async () => {
    const data = {
      userId: "USER_1",
      fecha: new Date().toISOString(),
      zonas: form,
      intensidad: form.intensidad,
    };

    await guardarCuestionario(data);

    alert("Guardado ✅");
  };

  return (
    <div>
      <h2>Cuestionario Nórdico</h2>

      <label><input type="checkbox" name="cuello" onChange={handleCheck}/> Cuello</label>
      <label><input type="checkbox" name="hombros" onChange={handleCheck}/> Hombros</label>
      <label><input type="checkbox" name="espaldaAlta" onChange={handleCheck}/> Espalda Alta</label>
      <label><input type="checkbox" name="espaldaBaja" onChange={handleCheck}/> Espalda Baja</label>

      <input
        type="number"
        min="1"
        max="10"
        placeholder="Intensidad"
        onChange={(e) => setForm({ ...form, intensidad: Number(e.target.value) })}
      />

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}