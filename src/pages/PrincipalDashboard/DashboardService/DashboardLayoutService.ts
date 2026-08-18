import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface DashboardLayoutItem{
    moduloId:number;
    x:number;
    y:number;
    w:number;
    h:number;
}

export interface DashboardLayoutRequest{
    access_token:string;
    layoutDTOList:DashboardLayoutItem[];
}

export interface DashboardLayoutResponse{
    access_token:string;
    cod_respuesta:string;
    mensaje:string;
}

export const saveDashboardLayout = async(
    data:DashboardLayoutRequest
):Promise<DashboardLayoutResponse>=>{

    const response = await axios.post(
        `${BASE_URL}/user/dashboard/layout`,
        data
    );

    return response.data;

};