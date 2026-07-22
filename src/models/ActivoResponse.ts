

export interface ActivoResponse {
  idActivo?: string
  folioInventario?: string; // opcional
  numeroSerie: string;
  marca: string;
  modelo: string;
  estado?: string;// opcional
  costoAdquisicion: number;
  categoria: string;
}