import axios from "axios";
import type { DashboardAction } from "../models/DashboardAction";

const BASE_URL = import.meta.env.VITE_API_URL;
export interface DashboardRequest{
    access_token:string;
}

export interface BaseResponseModel{
    access_token:string;
    cod_respuesta:string;
    mensaje:string;
}

export interface DashboardRubro{
    id:number;
    nombre:string;
    descripcion:string;
    icono:string;
    color:string;
    orden_visual:number;
    rutaConfiguracion: string;

}

export interface DashboardModulo{
    id:number;
    nombre:string;
    descripcion:string;
    icono:string;
    color:string;
    componente:string;
    ruta:string;
    url_externa:string;
    ancho_default:number;
    alto_default:number;
    x: number;
    y: number;
    orden_visual:number;

}

/*export interface DashboardAccion{
    id:number;
    nombre:string;
    descripcion:string;
    icono:string;
    color:string;
    orden_visual:number;
}*/

export interface DashboardItem{
    rubro:DashboardRubro;
    modulo:DashboardModulo;
    acciones:DashboardAction[];
}

export interface DashboardResponse extends BaseResponseModel{
    dashboardModuloList:DashboardItem[];
}

export const dashboardRequest = async(
    data:DashboardRequest
):Promise<DashboardResponse> =>{

    const response = await axios.post(
        `${BASE_URL}/user/modulos`,
        data
    );

    return response.data;

}