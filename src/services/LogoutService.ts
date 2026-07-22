import axios from "axios";
//npm install axios
const BASE_URL = import.meta.env.VITE_API_URL;


export interface LogOutRequest {
  deviceNumber: string;
  access_token: string;
}

export interface LogOutResponse {
  access_token: string;
  cod_respuesta: string;
  mensaje: string;

}

export const logOutRequest = async (
  data: LogOutRequest
): Promise<LogOutResponse> => {
  const response = await axios.post(`${BASE_URL}/user/logout`, data);
  return response.data;
};

