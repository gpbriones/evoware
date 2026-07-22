import { useState } from "react";
import DashboardSidebar from "./Sidebar/DashboardSidebar";
import DashboardGrid from "./GridLayout/DashboardGrid";
import "./styles/Dashboard.css";

export default function PrincipalDashboard() {
     const [userWidgets, setWidgets] = useState<string[]>([
      /*  "finanzas",
        "dispositivos"*/
    ]);

    const handleAddWidget = (id: string) => {
        if (userWidgets.includes(id)) {
            return;
        }
        setWidgets(prev => [...prev, id]);
    };

    const handleRemoveWidget = (id: string) => {
        setWidgets(prev =>
        prev.filter(widget => widget !== id)
    );

};

    return (
        <div className="dashboard">
            <DashboardSidebar
                onAddWidget={handleAddWidget}
            />
            <DashboardGrid
                widgets={userWidgets}
                onRemoveWidget={handleRemoveWidget}
            />
        </div>
    );
}