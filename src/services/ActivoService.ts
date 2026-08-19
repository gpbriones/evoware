import axios from "axios";
import type { ActivoSearchRequest } from "../models/SearchRequest";
import type { ActivoRequest } from "../models/ActivoRequest";
//import type { ReporteResponse } from "../models/ReporteResponse";
//import type { ActivoResponse } from "../models/ActivoResponse";

const API_URL = "/api/activos";
const INVENTARIOS_URL = import.meta.env.VITE_INVENTARIOS_URL;

export const buscarActivos = async (request: ActivoSearchRequest) => {
  const response = await axios.post(`${INVENTARIOS_URL}${API_URL}/getByFilter`, request);
  return response;
};

export const crearActivo = (data: ActivoRequest) => {
  return axios.post(`${INVENTARIOS_URL}${API_URL}/add`, data);
};

export const actualizarActivo = async (folio: String, activo: ActivoRequest
) => {
  const response = await axios.put(`${INVENTARIOS_URL}${API_URL}/${folio}`,activo);
  return response;
};

export const reporteActivo = async ( request: ActivoSearchRequest
) => {
   console.log("REQUEST:", request);
   console.log("JSON:", JSON.stringify(request, null, 2));
  const response = await axios.post(`${INVENTARIOS_URL}${API_URL}/reporte`,JSON.stringify(request), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  return response;
};

