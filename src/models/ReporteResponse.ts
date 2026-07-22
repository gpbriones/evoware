import type { BaseResponseModel } from "../services/LoginService";

export interface ReporteResponse extends BaseResponseModel{
    status: number;
    message: string;
    fileName: string;
    fileBase64: string;
}