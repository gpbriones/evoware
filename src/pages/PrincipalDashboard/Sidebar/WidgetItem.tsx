import type { DashboardItem } from "../DashboardService/DashboardService";

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
                    <h4>
                        {widget.modulo.nombre}
                    </h4>
                </div>
                <span>
                    <h5>Arrastra o haz clic</h5>
                </span>

            </div>

        </div>

    );

}