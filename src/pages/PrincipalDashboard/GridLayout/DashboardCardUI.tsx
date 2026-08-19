import type { DashboardSummaryItem } from "../DashboardService/DashboardSummaryService";
import "../styles/DashboardCardUI.css";

interface Props {
    icon:string;
    rubro:string;
    title:string;
    description?:string;
    loading:boolean;
    summary:DashboardSummaryItem[];
    onRemove:()=>void;
    onConfig:()=>void;
    actions:React.ReactNode;
}


export default function DashboardCardUI({
    icon,
    rubro,
    title,
    description,
    loading,
    summary,
    onRemove,
    onConfig,
    actions

}:Props){


return (
<div className="modern-card">
    <div className="card-header" >
        <div style={{ width: "50%" }}>
            <span className="card-rubro">
                {icon} {rubro}
            </span>
                <h3>
                    {title} <button
                className="sidebar-config-button"
                onClick={()=>{
                    onConfig()
                }}
                
            >
                ⚙
            </button>
                </h3>
            
        </div>
        
        <button
            className="sidebar-btn-remove"
            onClick={onRemove}
        >
             ✕
        </button>
    </div>


    <div className="dashboard-card-description" >
        {description}
    </div>



    <div className="card-content">
        <div className="dashboard-summary">
        {
            loading ?
            <span>
                Cargando...
            </span>
            :
            summary.map(resumen=>(
                <div
                    key={resumen.label}
                    className="summary-row modern-summary"
                >
                    <span>
                        {resumen.label}
                    </span>
                    <strong>
                        {resumen.value}
                    </strong>
                </div>
            ))
        }
        </div>
    </div>

    <div className="card-actions" style={{ width: "100%" }}>
        {actions}
    </div>

</div>
);
}