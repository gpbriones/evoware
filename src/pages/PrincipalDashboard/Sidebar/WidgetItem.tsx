import type { DashboardItem } from "../DashboardService/DashboardService";
import "../styles/widget.css";
interface Props{
    widget:DashboardItem;
    onAddWidget:(widget:DashboardItem)=>void;
}

export default function WidgetItem({
    widget,
    onAddWidget
}:Props){

    return(
        <div 
            className="widget-item"
            draggable
            onDragStart={(e)=>{
                e.dataTransfer.setData(
                    "widget",
                    JSON.stringify(widget)
                );
            }}
            onClick={()=>onAddWidget(widget)}
        >

            <div className="widget-icon">
                {widget.rubro.icono ?? "📂"}
            </div>

            <div className="widget-body">
                <div style={{ width: "80%" }}>
                    <h3>
                        {widget.modulo.nombre}
                    </h3>
                </div>
                <span>
                    <h5>Arrastra o haz clic</h5>
                </span>

            </div>

        </div>

    );

}