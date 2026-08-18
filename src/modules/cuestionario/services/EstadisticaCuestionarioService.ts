import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_CUESTIONARIOS_URL;

// ==========================================
// OPCIÓN
// ==========================================

export interface EstadisticaOpcion {

    id: number;

    descripcion: string;

    cantidad: number;

    porcentaje: number;
}


// ==========================================
// PREGUNTA
// ==========================================

export interface EstadisticaPregunta {

    id: number;

    descripcion: string;

    tipo: string;

    opciones: EstadisticaOpcion[];
}


// ==========================================
// RESPONSE
// ==========================================

export interface EstadisticaResponse {

    access_token: string;

    access_refresh_token: string | null;

    cod_respuesta: string | null;

    mensaje: string | null;

    totalCuestionarios: number | null;

    totalRespuestas: number | null;

    preguntas: EstadisticaPregunta[];
}


// ==========================================
// REQUEST
// ==========================================

export interface EstadisticaRequest {

    idTipoCuestionario: number;

    access_token: string;
}


export const estadisticaCuestionarioRequest = async (
    request: EstadisticaRequest
): Promise<EstadisticaResponse> => {

    const response = await axios.post<EstadisticaResponse>(
        `${BASE_URL}/cuestionarios/estadistica`,
        request
    );

    return response.data;
};