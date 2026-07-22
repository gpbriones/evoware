import type { ActivoResponse } from "../models/ActivoResponse";

export default function ActivoTable({
  data,
  onSort,
  onEdit
}: {
  data: ActivoResponse[];
  onSort: (field: string) => void;
  onEdit: (item: ActivoResponse) => void;
}){
  return (
    <table >
      <thead>
        <tr>
          <th >No Activo </th>
          <th >Folio </th>
          <th onClick={() => onSort("numeroSerie")}> Serie </th>
          <th onClick={() => onSort("marca")}>Marca</th>
          <th onClick={() => onSort("modelo")}> Modelo</th>
          <th onClick={() => onSort("estado")}>Estado</th>
          <th onClick={() => onSort("costoAdquisicion")}>Costo</th>
          <th onClick={() => onSort("categoria")}>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.idActivo}>
            <td>{ item.idActivo}</td>
            <td>{item.folioInventario}</td>
            <td>{item.numeroSerie}</td>
            <td>{item.marca}</td>
            <td>{item.modelo}</td>
            <td>
              <span
                className={
                  item.estado === "Disponible"
                    ? "status status-activo"
                    : item.estado === "Asignado"
                    ? "status status-asignado"
                    : item.estado === "En Mantenimiento"
                    ? "status status-mantenimiento"
                    : "status status-baja"
                }
              >
                {item.estado}
              </span>
            </td>
            <td>
              {item.costoAdquisicion.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN"
              })}
            </td>
            <td>{item.categoria}</td>

            <td>
              <button className="activo-btn" onClick={() => onEdit(item)}>Editar</button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}

