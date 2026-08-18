export interface NordicResponse {
  userId: string;
  fecha: string;

  zonas: {
    cuello: boolean;
    hombros: boolean;
    espaldaAlta: boolean;
    espaldaBaja: boolean;
    codos: boolean;
    munecas: boolean;
    caderas: boolean;
    rodillas: boolean;
    tobillos: boolean;
  };

  intensidad: number; // 1–10
  observaciones?: string;
}