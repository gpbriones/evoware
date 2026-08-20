import { useState } from "react";
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

    /* =====================================================
       SIDEBAR PRINCIPAL
       ===================================================== */

    const [sidebarOpen, setSidebarOpen] = useState(false);


    /* =====================================================
       RUBROS ABIERTOS
       ===================================================== */

    const [openRubros, setOpenRubros] =
        useState<Record<number, boolean>>({});


    /* =====================================================
       AGRUPAR POR RUBRO
       ===================================================== */

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


    /* =====================================================
       TOGGLE RUBRO
       ===================================================== */

    const toggleRubro = (rubroId: number) => {

        setOpenRubros(prev => ({
            ...prev,
            [rubroId]: !prev[rubroId]
        }));

    };


    return (

        <aside
            className={`widget-sidebar ${
                sidebarOpen ? "sidebar-open" : ""
            }`}
        >

            {/* =================================================
                BOTÓN MÓVIL
               ================================================= */}

            <button
                type="button"
                className="mobile-sidebar-toggle"
                onClick={() =>
                    setSidebarOpen(prev => !prev)
                }
            >

                <span className="mobile-sidebar-left">

                    <span className="mobile-sidebar-icon">
                        ☰
                    </span>

                    <span>
                        Módulos
                    </span>

                </span>

                <span className="mobile-sidebar-arrow">
                    {sidebarOpen ? "▲" : "▼"}
                </span>

            </button>


            {/* =================================================
                HEADER
               ================================================= */}

            <div className="sidebar-header">

                <span className="sidebar-label">
                    DASHBOARD
                </span>

                <h1 className="widget-title">
                    Módulos
                </h1>

            </div>


            {/* =================================================
                CONTENIDO
               ================================================= */}

            <div className="sidebar-content">

                {Object.values(rubros).map(grupo => {

                    const isOpen =
                        openRubros[grupo.rubro.id] ?? true;


                    return (

                        <div
                            key={grupo.rubro.id}
                            className="sidebar-group"
                        >

                            {/* =================================
                                HEADER DEL RUBRO
                               ================================= */}

                            <div
                                className="sidebar-group-title"
                            >

                                <button
                                    type="button"
                                    className="sidebar-rubro-toggle"
                                    onClick={() =>
                                        toggleRubro(
                                            grupo.rubro.id
                                        )
                                    }
                                >

                                    <span className="sidebar-group-name">

                                        <span className="sidebar-group-icon">
                                            {grupo.rubro.icono ?? "📂"}
                                        </span>

                                        <span>
                                            {grupo.rubro.nombre}
                                        </span>

                                    </span>

                                    <span className="sidebar-rubro-arrow">
                                        {isOpen ? "▲" : "▼"}
                                    </span>

                                </button>


                                {/* CONFIGURACIÓN */}

                                <button
                                    type="button"
                                    className="sidebar-config-button"
                                    onClick={() => {

                                        console.log(
                                            "Configurar:",
                                            grupo.rubro
                                                .rutaConfiguracion
                                        );

                                    }}
                                    title="Configurar rubro"
                                >
                                    ⚙
                                </button>

                            </div>


                            {/* =================================
                                MÓDULOS
                               ================================= */}

                            {isOpen && (

                                <div className="sidebar-widgets">

                                    {grupo.modulos.map(widget => (

                                        <WidgetItem
                                            key={
                                                widget.modulo.id
                                            }
                                            widget={widget}
                                            onAddWidget={
                                                onAddWidget
                                            }
                                        />

                                    ))}

                                </div>

                            )}

                        </div>

                    );

                })}

            </div>

        </aside>
    );
}