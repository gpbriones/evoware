import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export interface UsuarioAportacionRequest {
  access_token: string;
}

export interface BaseResponseModel{
  access_token: string;
  cod_respuesta: string;
  mensaje: string;
}

export interface UsuarioAportaciones {
  nombre: string;
  montoAportacion: number;
  fechaAportacion: Date;
  semanaAportada: number;
  
};

export interface UsuarioAportacionResponse extends BaseResponseModel{
  usuarioAportaciones: UsuarioAportaciones[];
}

export const usuarioAportacionRequest = async (
  data: UsuarioAportacionRequest
): Promise<UsuarioAportacionResponse> => {
  const response = await axios.post(`${BASE_URL}/user/aportaciones`, data);
  return response.data;
};
