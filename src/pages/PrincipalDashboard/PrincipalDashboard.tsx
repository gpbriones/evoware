import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

import DashboardSidebar from "./Sidebar/DashboardSidebar";
import DashboardGrid from "./GridLayout/DashboardGrid";
import "./styles/Dashboard.css";
import { logOutRequest } from "../../services/LogoutService";
import {dashboardRequest} from "./DashboardService/DashboardService";

import type {DashboardItem} from "./DashboardService/DashboardService";

export default function PrincipalDashboard() {

    // Todos los módulos que el usuario tiene disponibles
    const [availableWidgets, setAvailableWidgets] =
        useState<DashboardItem[]>([]);

    // Widgets que el usuario colocó en el Dashboard
    const [dashboardWidgets, setDashboardWidgets] =
        useState<DashboardItem[]>([]);

    const navigate = useNavigate();
    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const token =
                    localStorage.getItem("token") ?? "";
                const response =
                    await dashboardRequest({
                        access_token: token
                    });
                // Módulos disponibles para el Sidebar
                setAvailableWidgets(
                    response.dashboardModuloList
                );

                // Widgets iniciales del Dashboard
                setDashboardWidgets(
                    response.dashboardModuloList
                );
                /*
                 * Si quieres que todos aparezcan
                 * desde el inicio, descomenta:
                 */
                // setDashboardWidgets(
                //     response.dashboardModuloList
                // );
            } catch (error) {
                console.error(error);
            }
        };
        loadDashboard();

    }, []);
    const handleAddWidget = (widget: DashboardItem) => {
        setDashboardWidgets(prev => {
            if (
                prev.some(
                    w => w.modulo.id === widget.modulo.id
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

    const handleRemoveWidget = (id: number) => {
        setDashboardWidgets(prev =>
            prev.filter(
                w => w.modulo.id !== id
            )
        );
    };

    const handleLogout = async () => {
        try {
            const access_token =
                localStorage.getItem("token") ?? "";
            await logOutRequest({
                deviceNumber: "WEB",
                access_token
            });
            localStorage.removeItem("token");
            navigate("/", {
                replace: true
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button
                style={logoutBtn}
                onClick={handleLogout}
            >
                Cerrar sesión
            </button>
            <div className="dashboard">
                <DashboardSidebar
                    dashboardItems={availableWidgets}
                    onAddWidget={handleAddWidget}
                />
                <DashboardGrid
                    widgets={dashboardWidgets}
                    onAddWidget={handleAddWidget}
                    onRemoveWidget={handleRemoveWidget}
                />
            </div>
        </div>
    );

}

const logoutBtn: CSSProperties = {
    padding: "0.8rem 1.5rem",
    background: "linear-gradient(135deg, #ef4444, #b91c1c)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer",
};