import "./Header.css";
import { useLogout } from "../../services/GeneralLogoutService";
import { useEffect, useState } from "react";
import { resumenRequest } from "../../services/PersonalService";
import type { ResumenResponse } from "../../services/PersonalService";

const Header = () => {

    const { handleLogout } = useLogout();

    const [data, setData] = useState<ResumenResponse | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {

        const fetchResumen = async () => {

            try {

                const access_token = localStorage.getItem("token") || "";

                const response = await resumenRequest({
                    access_token
                });

                setData(response);

            } catch (error) {

                console.error("Error obteniendo resumen:", error);

            }

        };

        fetchResumen();

    }, []);

    return (
        <header className="app-header">

            {/* Saludo */}

            <div className="header-welcome">
                <span className="header-greeting">
                    Hola,
                </span>

                <span className="header-welcome-name">
                    {data?.nombre || "Usuario"}
                </span>
            </div>


            {/* Acciones */}

            <div className="header-actions">

                {/* Avatar */}

                <div className="header-user-menu">

                    <button
                        className="header-avatar-button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Opciones de usuario"
                    >

                        <div className="header-avatar">
                            {data?.nombre?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <span className="header-arrow">
                            {menuOpen ? "▲" : "▼"}
                        </span>

                    </button>


                    {/* Menú del usuario */}

                    {menuOpen && (

                        <div className="header-dropdown">

                            <div className="dropdown-header">
                                <div className="dropdown-avatar">
                                    {data?.nombre?.charAt(0).toUpperCase() || "U"}
                                </div>

                                <div>
                                    <strong>
                                        {data?.nombre || "Usuario"}
                                    </strong>

                                    <span>
                                        Cuenta de usuario
                                    </span>
                                </div>
                            </div>


                            <div className="dropdown-divider"></div>


                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    console.log("Mi perfil");
                                    setMenuOpen(false);
                                }}
                            >
                                <span>👤</span>
                                Mi perfil
                            </button>


                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    console.log("Cambiar contraseña");
                                    setMenuOpen(false);
                                }}
                            >
                                <span>🔑</span>
                                Cambiar contraseña
                            </button>


                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    console.log("Preferencias");
                                    setMenuOpen(false);
                                }}
                            >
                                <span>⚙️</span>
                                Preferencias
                            </button>


                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    console.log("Notificaciones");
                                    setMenuOpen(false);
                                }}
                            >
                                <span>🔔</span>
                                Notificaciones
                            </button>

                        </div>

                    )}

                </div>


                {/* Cerrar sesión */}

                <button
                    className="header-logout"
                    onClick={handleLogout}
                >
                    <span className="logout-icon">
                        ↪
                    </span>

                    Cerrar sesión
                </button>

            </div>

        </header>
    );
};

export default Header;