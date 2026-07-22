import "../styles/EvowareDashboard.css";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/auth";

export default function DashboardPage() {
    
    const navigate = useNavigate();

    const services = [
        {
            id: 1,
            title: "Caja de Ahorro",
            status: "Online",
            route: "/personal-goal",
            metrics: [
                { label: "Acumulado", value: "$15,230.50" },
                { label: "Avance", value: "68%" },
                { label: "Interés Día", value: "$4.25" }
            ]
        },
        {
            id: 2,
            title: "PSO Platform",
            status: "Online",
            route: "/pso",
            metrics: [
                { label: "Ejecuciones", value: "528" },
                { label: "Fitness", value: "0.00012" },
                { label: "Dimensiones", value: "1000" }
            ]
        },
        {
            id: 3,
            title: "NFC Platform",
            status: "Online",
            route: "/nfc",
            metrics: [
                { label: "Dispositivos", value: "24" },
                { label: "Tags", value: "612" },
                { label: "Alertas", value: "3" }
            ]
        }
    ];

    return (
        <section className="workspace">
            <div className="workspace-header">
                <div>
                    <h1>
                        My Workspace
                    </h1>
                    <p>
                        Servicios disponibles para tu cuenta
                    </p>

                </div>

                <div className="user-actions">

                    <span className="user-name">
                        Bienvenido {/*usuario.nombre*/}
                    </span>

                    <button
                        className="logout-btn"
                        onClick={() => handleLogout(navigate)}
                    >
                        Cerrar sesión
                    </button>

                </div>

            </div>

            <div className="services-grid">

                {services.map(service => (

                    <div
                        key={service.id}
                        className="service-card"
                    >

                        <div className="card-header">

                            <h3>
                                {service.title}
                            </h3>

                            <span className="status">
                                {service.status}
                            </span>

                        </div>

                        <div className="metrics">

                            {service.metrics.map(metric => (

                                <div
                                    key={metric.label}
                                    className="metric"
                                >

                                    <span>
                                        {metric.label}
                                    </span>

                                    <strong>
                                        {metric.value}
                                    </strong>

                                </div>

                            ))}

                        </div>

                        <button
                            className="open-btn"
                            onClick={() =>
                                navigate(service.route)
                            }
                        >
                            Abrir Servicio →
                        </button>

                    </div>

                ))}

            </div>

        </section>
    );
}