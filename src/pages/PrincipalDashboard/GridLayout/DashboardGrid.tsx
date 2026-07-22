import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import WidgetRegistry from "../WidgetFactory/WidgetRegistry"
/* npm uninstall @types/react-grid-layout */
import type { DashboardWidget } from "../models/DashboardWidget";


import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";

interface DashboardGridProps {
    widgets: string[];
    onRemoveWidget: (id: string) => void;
    }

export default function DashboardGrid({
                         widgets: widgetIds,
                         onRemoveWidget
                            }: DashboardGridProps){
    
   /* const dashboardWidgets = [
    {
        id: "finanzas"
    },
    {
        id: "dispositivos"
    }
    ];*/

    

 /*const dashboardWidgets: DashboardWidget[] =[
        {
            title: "Finanzas",
            i:"finanzas",
            x:0,
            y:0,
            w:4,
            h:4
        },
        {
            title: "Dispositivos",
            i:"dispositivos",
            x:4,
            y:0,
            w:4,
            h:4
        }
    ];*/
   /* const initialLayout: DashboardWidget[] = dashboardWidgets.map(widget => ({
    title: widget.title,
    i: widget.i,
    x: widget.x,
    y: widget.y,
    w: widget.w,
    h: widget.h
    })
);*/
    const initialLayout: DashboardWidget[] = widgetIds.map((id, index) => ({
            title: WidgetRegistry[id as keyof typeof WidgetRegistry].title,
            i: id,
            x: index * 4,
            y: 0,
            w: 4,
            h: 4
    }));

    const [layout, setLayout] = useState<DashboardWidget[]>(initialLayout);


            useEffect(() => {
            setLayout(prevLayout =>
                widgetIds.map((id, index) => {
                    const previous = prevLayout.find(item => item.i === id);

                    if (previous) {
                        return previous;
                    }

                    return {
                        title: WidgetRegistry[id as keyof typeof WidgetRegistry].title,
                        i: id,
                        x: index * 4,
                        y: 0,
                        w: 4,
                        h: 4
                    };
                })
            );
        }, [widgetIds]);

    const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
    console.log("hola newLayout...");
    console.log(newLayout);
    };


    return(

        <div style={{flex:1,padding:20}}>
            <GridLayout
                className="layout"
                layout={layout}
                 cols={12}
                rowHeight={60}
                margin={[10, 10]}
                
                width={1200}
                onLayoutChange={handleLayoutChange}
            >

                {layout.map(item => {
                    const widget = WidgetRegistry[item.i as keyof typeof WidgetRegistry];
                    const Component = widget.component;
                    return (
                                <div key={item.i} className="dashboard-widget">
                                <div className="widget-header">
                                <span>{widget.title}</span>
                                <button
                                    onClick={() => onRemoveWidget(item.i)}
                                >
                                    ✕
                                </button>
                                </div>
                                <Component/>
                                </div>
                        );
                        })}
            </GridLayout>
        </div>
    );
}