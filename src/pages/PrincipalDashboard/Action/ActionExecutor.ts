import type { NavigateFunction } from "react-router-dom";
import { ActionService } from "./ActionService";

import type { DashboardAction } from "../models/DashboardAction";
import type { ActionResult } from "../models/ActionResult";

export async function executeAction(
    action:DashboardAction,
    navigate:NavigateFunction,
    moduloId?: number
):Promise<ActionResult>{

    switch(action.tipoAccion){

        case "ROUTE":
            console.log("=== ROUTE ===");
            console.log("ruta:", action.ruta);
            console.log("moduloId recibido:", moduloId);
            if(action.ruta){
                //navigate(action.ruta);
                navigate(`${action.ruta}?moduloId=${moduloId}`);
                 
            }
            return{
                success:true
            };

        case "API":
            return await ActionService.executeApi(
                action,
                localStorage.getItem("token") ?? ""
            );

        case "URL":
            if(action.url){
                window.open(action.url,"_blank");
            }

            return{

                success:true

            };

        default:

            return{

                success:false,

                message:"Tipo de acción no soportado."

            };

    }

}