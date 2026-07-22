
import type { BaseRequestModel } from "./BaseRequestModel";

export interface ActivoRequest extends BaseRequestModel{
  idActivo?: string
  folioInventario?: string; // opcional
  numeroSerie: string;
  marca: string;
  modelo: string;
  estado?: string;// opcional
  costoAdquisicion: number;
  categoria: string;
}