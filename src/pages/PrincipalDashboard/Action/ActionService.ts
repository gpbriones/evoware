import axios from "axios";
import type { DashboardAction } from "../models/DashboardAction";
import type { ActionResult } from "../models/ActionResult";

const BASE_URL = import.meta.env.VITE_API_URL;

export class ActionService{

    static async executeApi(
        action:DashboardAction,
        accessToken:string):Promise<ActionResult>{
            try{
                const response = await axios({
                method: action.metodoHttp?.toLowerCase() ?? "post",
                url: `${BASE_URL}${action.ruta}`,
                data:{
                    access_token:accessToken
                }
            });
            return{
                success:true,
                message:response.data.mensaje,
                data:response.data
            };
        }catch(error){
            console.error(error);
            return{
                success:false,
                message:"Error al ejecutar la acción."
            };
        }

    }

}