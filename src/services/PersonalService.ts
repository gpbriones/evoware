import axios from "axios";
//npm install axios
const BASE_URL = import.meta.env.VITE_API_URL;

export interface ResumenRequest {
  access_token: string;
}

export interface ResumenResponse {
    nombre: string;
    montoAhorro: number;
    numAportacion: number;
    porCienAvanceahorro: number;
    interesAnio: number;
    interesAcumulado: number;
    interesDia: number;
    metaSemanas: number;
    aportacionInicial: number;
    semanaActual: number;
    semanaAportada: number;
    access_token: string;

}

export const resumenRequest = async (
  data: ResumenRequest
): Promise<ResumenResponse> => {
  const response = await axios.post(`${BASE_URL}/user/resumen`, data);
  return response.data;
};

