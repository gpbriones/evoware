import type { DashboardItem } from "../DashboardService/DashboardService";
import type { DashboardSummaryItem } from "../DashboardService/DashboardSummaryService";
import  { dashboardSummaryRequest } from "../DashboardService/DashboardSummaryService";
import { useEffect, useState } from "react";
import "../styles/DashboardCard.css";

import { executeAction } from "../Action/ActionExecutor";
import { useNavigate } from "react-router-dom";

import DashboardCardUI from "./DashboardCardUI";



interface Props {
    item: DashboardItem;
    onRemoveWidget: (id:number)=>void;
}


export default function DashboardCard({item,onRemoveWidget}:Props){

    const navigate = useNavigate();

    const [summary,setSummary]= useState<DashboardSummaryItem[]>([]);
    const [loading,setLoading] = useState(true);
    const loadSummary=async()=>{
        try{
            const token=localStorage.getItem("token") ?? "";
            const response= await dashboardSummaryRequest({
                                access_token:token,
                                moduloId:item.modulo.id
                            });
                    setSummary(response.items);
                }catch(error){
                    console.error(error);
                }finally{
                    setLoading(false);
                }
            };
            
    useEffect(()=>{
        loadSummary();
    },[item.modulo.id]);
            
    return (
        <DashboardCardUI onConfig={()=>{
                console.log(
                    "Configurar modulo::",
                    item.modulo.ruta
                );
                //navigate(item.modulo.ruta);
                navigate(`${item.modulo.ruta}?moduloId=${item.modulo.id}`);
            }}

        icon={item.rubro.icono ?? "📂"}
        rubro={item.rubro.nombre}
        title={item.modulo.nombre}
        description={item.modulo.descripcion ?? ""}
        loading={loading}
        summary={summary}
        
        onRemove={() =>
            onRemoveWidget(item.modulo.id)
        }
        
        actions={
            item.acciones?.map(
                (accion)=>(
                <button key={accion.id}
                        onClick={async()=>{
                            console.log(
                                accion.tipoAccion,
                                accion.ruta
                            );
                            const result =
                            await executeAction(
                                accion,
                                navigate,
                                item.modulo.id
                            );
                            if(result.success){
                                await loadSummary();
                            }
                        }}
                    >
                        {accion.icono}
                        {accion.nombre}
                    </button>
                )
            )
        }

    />
        
    );
}