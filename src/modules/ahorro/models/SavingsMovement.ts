import type { BaseResponseModel } from "./BaseResponseModel.ts";
export interface SavingsMovement{
    id:number;
    nombre:string;
    montoAportacion:number;
    fechaAportacion:string;
    semanaAportada:number;
}


export interface SavingsDetailResponse extends BaseResponseModel{
    usuarioAportaciones:SavingsMovement[];
}