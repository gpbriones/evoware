export interface DashboardAction {
    id: number;
    nombre: string;
    descripcion?: string;
    icono?: string;
    color?: string;
    tipoAccion: string;
    ruta?: string;
    url?: string;
    metodoHttp?:string;
}