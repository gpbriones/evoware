import type { NavigateFunction } from "react-router-dom";
import { logOutRequest } from "../services/LogoutService";

export async function handleLogout(
    navigate: NavigateFunction
) {

    try {

        const access_token =
            localStorage.getItem("token") ?? "";

        await logOutRequest({
            deviceNumber: "WEB",
            access_token
        });

    } catch (error) {

        console.error(
            "Error en logout:",
            error
        );

    } finally {

        localStorage.removeItem("token");

        navigate("/", {
            replace: true
        });
    }
}