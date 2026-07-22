import type{ BaseRequestModel } from './BaseRequestModel';
export interface ActivoFilter extends BaseRequestModel {
  numeroSerie?: string;
  marca?: string;
  modelo?: string;
  categoria?: string;
  estado?: string;
  costoMin?: number;
  costoMax?: number;
}

export interface ActivoSearchRequest extends BaseRequestModel {
  filter: ActivoFilter;
  page: number;
  size: number;
  sortBy: string;
  direction: "ASC" | "DESC";
  
}