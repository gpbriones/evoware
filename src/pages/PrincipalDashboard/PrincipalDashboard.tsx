import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";

import DashboardSidebar from "./Sidebar/DashboardSidebar";
import DashboardGrid from "./GridLayout/DashboardGrid";
import "./styles/Dashboard.css";

import { dashboardRequest } from "./DashboardService/DashboardService";
import type { DashboardItem } from "./DashboardService/DashboardService";

export default function PrincipalDashboard() {

    const [availableWidgets, setAvailableWidgets] =
        useState<DashboardItem[]>([]);

    const [dashboardWidgets, setDashboardWidgets] =
        useState<DashboardItem[]>([]);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const token =
                    localStorage.getItem("token") ?? "";

                const response =
                    await dashboardRequest({
                        access_token: token
                    });

                setAvailableWidgets(
                    response.dashboardModuloList
                );

                setDashboardWidgets(
                    response.dashboardModuloList
                );

            } catch (error) {

                console.error(
                    "Error cargando dashboard:",
                    error
                );

            }

        };

        loadDashboard();

    }, []);


    const handleAddWidget = (
        widget: DashboardItem
    ) => {

        setDashboardWidgets(prev => {

            if (
                prev.some(
                    w =>
                        w.modulo.id ===
                        widget.modulo.id
                )
            ) {
                return prev;
            }

            return [
                ...prev,
                widget
            ];

        });

    };


    const handleRemoveWidget = (
        id: number
    ) => {

        setDashboardWidgets(prev =>
            prev.filter(
                w =>
                    w.modulo.id !== id
            )
        );

    };


    return (

        <div className="principal-dashboard">

            <Header />

            <div className="dashboard">

                <DashboardSidebar
                    dashboardItems={availableWidgets}
                    onAddWidget={handleAddWidget}
                />

                <main className="dashboard-main">

                    <DashboardGrid
                        widgets={dashboardWidgets}
                        onAddWidget={handleAddWidget}
                        onRemoveWidget={handleRemoveWidget}
                    />

                </main>

            </div>

        </div>

    );
}