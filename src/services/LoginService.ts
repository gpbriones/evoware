import axios from "axios";
//npm install axios
const BASE_URL = import.meta.env.VITE_API_URL;

export interface BaseResponseModel{
  access_token: string;
  cod_respuesta: string;
  mensaje: string;
}

console.log(import.meta);

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends BaseResponseModel{
  access_token: string;
  userId: number;
}

export const loginRequest = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/user/login`, data);
  return response.data;
};

export const registerRequest = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/user/addNewUser`, data);
  return response.data;
};
