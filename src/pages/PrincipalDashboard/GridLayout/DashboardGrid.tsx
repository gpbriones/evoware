import { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";

import type { DashboardItem } from "../DashboardService/DashboardService";
import DashboardCard from "./DashboardCard";

import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";

import { saveDashboardLayout } from "../DashboardService/DashboardLayoutService";

const ResponsiveGridLayout = WidthProvider(GridLayout);

interface DashboardGridProps {
    widgets: DashboardItem[];
    onAddWidget: (widget: DashboardItem) => void;
    onRemoveWidget: (id: number) => void;
}

interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export default function DashboardGrid({
    widgets,
    onAddWidget,
    onRemoveWidget
}: DashboardGridProps) {

    const [layout, setLayout] =
        useState<LayoutItem[]>([]);


    // ==========================================
    // CREAR LAYOUT
    // ==========================================

    useEffect(() => {

        console.log(
            "Widgets recibidos en Grid:",
            widgets
        );

        setLayout(prev => {

            const nuevoLayout = [...prev];

            widgets.forEach(widget => {

                const id =
                    widget.modulo.id.toString();

                const existe =
                    nuevoLayout.some(
                        item => item.i === id
                    );

                if (!existe) {

                    nuevoLayout.push({

                        i: id,

                        x: widget.modulo.x ?? 0,

                        y: widget.modulo.y ?? 0,

                        w:
                            widget.modulo.ancho_default ??
                            4,

                        h:
                            widget.modulo.alto_default ??
                            4

                    });

                }

            });

            return nuevoLayout;

        });

    }, [widgets]);


    // ==========================================
    // GUARDAR LAYOUT
    // ==========================================

    const handleSaveLayout = async (
        newLayout: LayoutItem[]
    ) => {

        setLayout(newLayout);

        try {

            const token =
                localStorage.getItem("token") ?? "";

            await saveDashboardLayout({

                access_token: token,

                layoutDTOList:
                    newLayout.map(item => ({

                        moduloId:
                            Number(item.i),

                        x: item.x,

                        y: item.y,

                        w: item.w,

                        h: item.h

                    }))

            });

            console.log(
                "Layout guardado"
            );

        } catch (error) {

            console.error(
                "Error guardando layout",
                error
            );

        }

    };


    // ==========================================
    // DROP DESDE SIDEBAR
    // ==========================================

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>
    ) => {

        e.preventDefault();

        const data =
            e.dataTransfer.getData("widget");

        if (!data) {
            return;
        }

        try {

            const widget: DashboardItem =
                JSON.parse(data);

            console.log(
                "Widget agregado:",
                widget
            );

            onAddWidget(widget);

        } catch (error) {

            console.error(
                "Error leyendo widget:",
                error
            );

        }

    };


    return (

        <div
            className="dashboard-grid-container"

            onDragOver={e =>
                e.preventDefault()
            }

            onDrop={handleDrop}
        >

            <ResponsiveGridLayout

                className="layout"

                layout={layout}

                /*
                 * Mantener 12 columnas.
                 *
                 * Esto hace que sea mucho más
                 * fácil adaptar el dashboard.
                 */
                cols={12}

                rowHeight={60}

                margin={[10, 10]}

                /*
                 * Ya NO usamos:
                 *
                 * width={1800}
                 *
                 * WidthProvider calcula
                 * automáticamente el ancho.
                 */

                width={undefined}

                onLayoutChange={
                    newLayout =>
                        setLayout(
                            newLayout as LayoutItem[]
                        )
                }

                onDragStop={
                    newLayout =>
                        handleSaveLayout(
                            newLayout as LayoutItem[]
                        )
                }

                onResizeStop={
                    newLayout =>
                        handleSaveLayout(
                            newLayout as LayoutItem[]
                        )
                }

                /*
                 * MUY IMPORTANTE PARA MÓVIL
                 *
                 * Los elementos interactivos
                 * NO deben iniciar un drag.
                 */

                draggableCancel=".dashboard-widget button, .dashboard-widget a, .dashboard-widget input, .dashboard-widget select, .dashboard-widget textarea"

                /*
                 * El widget solamente se puede
                 * arrastrar desde zonas que no
                 * sean controles.
                 */

                isDraggable={true}

                isResizable={true}

            >

                {layout.map(item => {

                    const widget =
                        widgets.find(
                            w =>
                                w.modulo.id.toString()
                                === item.i
                        );

                    if (!widget) {
                        return null;
                    }

                    return (

                        <div
                            key={item.i}
                            className="dashboard-widget"
                        >

                            <DashboardCard
                                item={widget}
                                onRemoveWidget={
                                    onRemoveWidget
                                }
                            />

                        </div>

                    );

                })}

            </ResponsiveGridLayout>

        </div>

    );

}