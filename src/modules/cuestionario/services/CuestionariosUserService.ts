import axios from "axios";

const BASE_URL_CUESTIONARIOS = import.meta.env.VITE_API_CUESTIONARIOS_URL;
// ===============================
// MODELO DE CUESTIONARIO
// ===============================

export interface CuestionarioItem {
    id: number;
    entrevistado: string;
    entrevistador: string;
    fechaEjecucion: string;
    estatus: string;
    token: string;
    expiracion: string;
}


// ===============================
// REQUEST
// ===============================

export interface CuestionariosUsuarioRequest {
    filter: Record<string, unknown>;
    page: number;
    size: number;
    sortBy: string;
    direction: "ASC" | "DESC";
    access_token: string;
}


// ===============================
// RESPONSE
// ===============================

export interface CuestionariosUsuarioResponseModel {

    content: CuestionarioItem[];

    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            sorted: boolean;
            empty: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };

    last: boolean;

    totalPages: number;

    totalElements: number;

    size: number;

    number: number;

    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
    };

    first: boolean;

    numberOfElements: number;

    empty: boolean;

    access_token: string;
}


// ===============================
// SERVICIO
// ===============================

export async function cuestionarioRequest(
    request: CuestionariosUsuarioRequest
): Promise<CuestionariosUsuarioResponseModel> {

    const response = await axios.post<CuestionariosUsuarioResponseModel>(
       `${BASE_URL_CUESTIONARIOS}/cuestionarios/getAll`,
        request
    );

    return response.data;
}