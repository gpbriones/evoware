import type { ActivoFilter } from "../models/SearchRequest";

export default function ActivoFilters({
  filters,
  setFilters,
  onSearch
}: {
  filters: ActivoFilter;
  setFilters: (f: ActivoFilter) => void;
  onSearch: () => void;
}) {
  return (
    <div className="filters">
      
      <input 
        placeholder="Numero de serie" 
        value={filters.numeroSerie ?? ""}
        onChange={(e) =>setFilters({...filters,numeroSerie:e.target.value === ""? undefined: e.target.value})}
      />

      <input
        placeholder="Marca"
        value={filters.marca?? ""}
        onChange={(e) => setFilters({...filters,  marca: e.target.value === ""? undefined: e.target.value })}
      />

      <input
        placeholder="Modelo"
        value={filters.modelo?? ""}
        onChange={(e) => setFilters({ ...filters, modelo: e.target.value ===""? undefined: e.target.value })}
      />

      <input
        placeholder="Categoria"
        value={filters.categoria?? ""}
        onChange={(e) => setFilters({...filters,  categoria: e.target.value ===""? undefined: e.target.value})}
      />

      <select
        value={filters.estado?? ""}
        onChange={(e) => setFilters({ ...filters, estado: e.target.value ===""? undefined: e.target.value})}
      >
        <option value="">Todos</option>
        <option value="Disponible">Disponible</option>
        <option value="Asignado">Asignado</option>
        <option value="En Mantenimiento">En Mantenimiento</option>
        <option value="Baja">Baja</option>
      </select>

      <input
            type="number"
            placeholder="Costo mínimo"
            value={filters.costoMin ?? ""}
            onChange={(e) => setFilters({...filters,costoMin: e.target.value === "" ? undefined : Number(e.target.value)})}
            />

            <input
            type="number"
            placeholder="Costo máximo"
            value={filters.costoMax ?? ""}
            onChange={(e) =>setFilters({...filters,costoMax: e.target.value === "" ? undefined : Number(e.target.value)})}
            />




      <button  className="nuevo-activo-btn" onClick={onSearch}>Buscar</button>
    </div>
  );
}