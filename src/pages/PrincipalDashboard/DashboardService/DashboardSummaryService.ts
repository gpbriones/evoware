import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface DashboardSummaryRequest{
    access_token:string;
    moduloId:number;
}

export interface DashboardSummaryItem{
    label:string;
    value:string;
}

export interface DashboardSummaryResponse{
    access_token:string;
    cod_respuesta:string;
    mensaje:string;
    items:DashboardSummaryItem[];
}

export const dashboardSummaryRequest = async(
    data:DashboardSummaryRequest
):Promise<DashboardSummaryResponse>=>{

    const response = await axios.post(
        `${BASE_URL}/user/dashboard/resumen`,
        data
    );

    return response.data;
};