import "../styles/Sidebar.css";
import type { DashboardItem } from "../DashboardService/DashboardService";
import WidgetItem from "./WidgetItem";

interface Props {
    dashboardItems: DashboardItem[];
    onAddWidget: (widget: DashboardItem) => void;
}

export default function DashboardSidebar({
    dashboardItems,
    onAddWidget
}: Props) {

    // Agrupar módulos por rubro
    const rubros = dashboardItems.reduce(
        (acc, item) => {
            const rubroId = item.rubro.id;
            if (!acc[rubroId]) {
                acc[rubroId] = {
                    rubro: item.rubro,
                    modulos: []
                };
            }

            acc[rubroId].modulos.push(item);
            return acc;
        },
        {} as Record<number, {
            rubro: DashboardItem["rubro"];
            modulos: DashboardItem[];
        }>
    );

    return (

        <aside className="widget-sidebar">
             <h1 className="widget-title">
                Módulos
            </h1>
            {
                Object.values(rubros).map(grupo => (
                    <div
                        key={grupo.rubro.id}
                        className="sidebar-group"
                    >

                        <div className="sidebar-group-title"
                         >
                            <div className="sidebar-group-name">
                                {grupo.rubro.icono ?? "📂"}{" "}
                                {grupo.rubro.nombre}
                            </div>
                            <button
                                className="sidebar-config-button"
                                onClick={() => {
                                    // Aquí irá la configuración del rubro
                                     console.log(
                                                    "Configurar:",
                                                    grupo.rubro.rutaConfiguracion
                                                );
                                }}
                                title="Configurar rubro"
                            >
                                ⚙
                            </button>
                        </div>

                        {

                            /*grupo.modulos.map(widget => (

                                <button

                                    key={widget.modulo.id}

                                    className="sidebar-widget"

                                    draggable

                                    onDragStart={(e) => {

                                        e.dataTransfer.setData(
                                            "widget",
                                            JSON.stringify(widget)
                                        );

                                    }}

                                    onClick={() =>
                                        onAddWidget(widget)
                                    }

                                >

                                    {widget.modulo.nombre}

                                </button>

                            ))*/
                           grupo.modulos.map(widget => (
                                <WidgetItem
                                    key={widget.modulo.id}
                                    widget={widget}
                                    onAddWidget={onAddWidget}
                                />
                            ))
                        }
                    </div>
                ))
            }
        </aside>
    );

}