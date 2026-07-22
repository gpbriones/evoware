import { useEffect,useState } from "react";
import type { ActivoRequest } from "../models/ActivoRequest";
import type { ActivoResponse } from "../models/ActivoResponse";

export default function ActivoForm({
  onSave,
  activo
}: {
  onSave: (data: ActivoRequest) => void;
  activo?: ActivoResponse | null;
}) {

    const initialForm: ActivoRequest = {
    numeroSerie: "",
    marca: "",
    modelo: "",
    estado: "Disponible",
    costoAdquisicion: 0,
    categoria: "",
  };
  const [form, setForm] = useState(initialForm);

    useEffect(() => {

    if (activo) {
      setForm({
        idActivo: activo.idActivo,
        folioInventario: activo.folioInventario,
        numeroSerie: activo.numeroSerie,
        marca: activo.marca,
        modelo: activo.modelo,
        estado: activo.estado,
        costoAdquisicion: activo.costoAdquisicion,
        categoria: activo.categoria
      });
    }else {

    setForm(initialForm);

  }

  }, [activo]);

  

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="hero-panel-activo-2">

      <input name="numeroSerie" value={form.numeroSerie} placeholder="Número de Serie" onChange={handleChange} />
      <input name="marca" value={form.marca} placeholder="Marca" onChange={handleChange} />
      <input name="modelo" value={form.modelo} placeholder="Modelo" onChange={handleChange} />
      <input name="categoria" value={form.categoria} placeholder="Categoría" onChange={handleChange} />

      <select name="estado" value={form.estado} onChange={handleChange}>
        <option value="Disponible">Disponible</option>
        <option value="Asignado">Asignado</option>
        <option value="En Mantenimiento">En Mantenimiento</option>
        <option value="Baja">Baja</option>
      </select>

      <input
        name="costoAdquisicion"
        value={form.costoAdquisicion}
        type="number"
        placeholder="Costo"
        onChange={handleChange}
      />

      <button className="nuevo-activo-btn" onClick={() => onSave(form)}>
        Guardar
      </button>

    </div>
  );
}