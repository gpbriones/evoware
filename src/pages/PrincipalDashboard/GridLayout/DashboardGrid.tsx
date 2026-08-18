import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";

import type { DashboardItem } from "../DashboardService/DashboardService";
import DashboardCard from "./DashboardCard";

import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import { saveDashboardLayout} from "../DashboardService/DashboardLayoutService";


interface DashboardGridProps {
    widgets: DashboardItem[];
    onAddWidget: (widget: DashboardItem)=>void;
    onRemoveWidget: (id:number)=>void;
}

interface LayoutItem {
    i:string;
    x:number;
    y:number;
    w:number;
    h:number;
}

export default function DashboardGrid({
    widgets,
    onAddWidget,
    onRemoveWidget
}:DashboardGridProps){

const [layout,setLayout] = useState<LayoutItem[]>([]);

useEffect(()=>{
    console.log("Widgets recibidos en Grid:", widgets);
    setLayout(prev => {
        console.log("Layout anterior:", prev);
        const nuevoLayout = [...prev];
        widgets.forEach((widget)=>{
            const existe = nuevoLayout.some(
                item =>
                item.i === widget.modulo.id.toString()
            );
                
            if(!existe){
                 console.log("Creando layout desde backend",{
    id:widget.modulo.id,
    x:widget.modulo.x,
    y:widget.modulo.y,
    w:widget.modulo.ancho_default,
    h:widget.modulo.alto_default
 });
                nuevoLayout.push({
                    i: widget.modulo.id.toString(),
                    x: widget.modulo.x ?? 0,
                    y: widget.modulo.y ?? 0,
                    w: widget.modulo.ancho_default ?? 4,
                    h: widget.modulo.alto_default ?? 4
                });
            }
        });
    return nuevoLayout;
    });
},[widgets]);


const handleSaveLayout = async (newLayout: LayoutItem[]) => {
    setLayout(newLayout);
    try {
        const token = localStorage.getItem("token") ?? "";
        await saveDashboardLayout({
            access_token: token,
            layoutDTOList: newLayout.map(item => ({
                moduloId: Number(item.i),
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h
            }))
        });
        console.log("Layout guardado");
    } catch (error) {
        console.error("Error guardando layout", error);
    }
};



/*const handleLayoutChange = (newLayout:LayoutItem[])=>{
    setLayout(newLayout);
    console.log("Nuevo layout",newLayout);
    };*/


    return (
        <div style={{flex:1,padding:20}}
             onDragOver={(e)=>e.preventDefault()}
             onDrop={(e)=>{
                const data =
                    e.dataTransfer.getData(
                        "widget"
                    );
                if(!data){
                    return;
                }

                const widget: DashboardItem = JSON.parse(data);
                console.log(
                    "Widget agregado:",
                    widget
                );
                onAddWidget(widget);
            }}
        >
            <GridLayout
                className="layout"
                layout={layout}
                cols={60}
                rowHeight={60}
                margin={[5,5]}
                width={1800}
                onLayoutChange={(layout) => setLayout(layout as LayoutItem[])}
                onDragStop={(layout) => handleSaveLayout(layout as LayoutItem[])}
                onResizeStop={(layout) => handleSaveLayout(layout as LayoutItem[])
                }
            >
            {layout.map(item=>{const widget = widgets.find(w => w.modulo.id.toString() === item.i);
                if(!widget){
                    return null;
                }
                return (
                <div key={item.i} className="dashboard-widget">
                    <DashboardCard item={widget} onRemoveWidget={onRemoveWidget}/>
                    </div>
                    );
                    })
                    }
            </GridLayout>


        </div>
    );

}