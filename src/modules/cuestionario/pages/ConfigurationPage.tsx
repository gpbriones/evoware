import { useEffect, useState } from "react";

import "../styles/ConfigurationPage.css";
import {cuestionarioRequest} from "../services/CuestionariosUserService";
import type { CuestionarioItem} from "../services/CuestionariosUserService";
import { useSearchParams } from "react-router-dom";

import type { DashboardSummaryItem } from "../../../pages/PrincipalDashboard/DashboardService/DashboardSummaryService";
import {dashboardSummaryRequest} from "../../../pages/PrincipalDashboard/DashboardService/DashboardSummaryService";

import {estadisticaCuestionarioRequest} from "../services/EstadisticaCuestionarioService";

import type {EstadisticaPregunta} from "../services/EstadisticaCuestionarioService";
import  Header  from "../../../components/Header/Header";


export default function ConfigurationPage() {

    //-----resumen
    const [searchParams] = useSearchParams();
    const moduloId = Number(searchParams.get("moduloId"));
    console.log("URL actual:", window.location.href);
    console.log("moduloId:", moduloId);

    const [summary, setSummary] =
    useState<DashboardSummaryItem[]>([]);

    const loadSummary = async () => {
            try {
                const token = localStorage.getItem("token") ?? "";
                const response = await dashboardSummaryRequest({
                    access_token: token,
                    moduloId: moduloId
                });
                setSummary(response.items);
            } catch (error) {
                console.error(
                "Error cargando resumen:",
                error
            );
        }
    };

    useEffect(() => {
        if (!moduloId) {
            return;
        }
        loadSummary();
    }, [moduloId]);

    

    // ==========================================
    // ESTADO
    // ==========================================

    const [cuestionarios, setCuestionarios] =
        useState<CuestionarioItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [totalElements, setTotalElements] =
        useState(0);


    // ==========================================
    // CARGAR CUESTIONARIOS
    // ==========================================

    const loadCuestionarios = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token") ?? "";

            const response =
                await cuestionarioRequest({

                    filter: {},

                    page: page,

                    size: 5,

                    sortBy: "id",

                    direction: "DESC",

                    access_token: token

                });


            setCuestionarios(
                response.content
            );

            setTotalPages(
                response.totalPages
            );

            setTotalElements(
                response.totalElements
            );

        } catch (error) {

            console.error(
                "Error cargando cuestionarios:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // CARGAR CUANDO CAMBIA LA PÁGINA
    // ==========================================

    useEffect(() => {

        loadCuestionarios();

    }, [page]);





    // ==========================================
    // FORMATEAR FECHA
    // ==========================================

    const formatDate = (
        fecha: string
    ) => {

        if (!fecha) {
            return "—";
        }

        return new Date(fecha)
            .toLocaleString("es-MX", {
                dateStyle: "short",
                timeStyle: "short"
            });

    };


    // ==========================================
    // ESTADO VISUAL
    // ==========================================

    const getStatusClass = (
        estatus: string
    ) => {

        switch (estatus) {

            case "FINALIZADO":
                return "completed";

            case "CON_MOLESTIAS":
                return "warning";

            default:
                return "pending";
        }

    };

    const getSummaryValue = (label: string) => {
        const item = summary.find(
            item =>
                item.label.trim().toLowerCase() ===
                label.trim().toLowerCase()
        );

        return Number(item?.value ?? 0);
    };
     // ==========================================
    // ESTADÍSTICAS DE LA PÁGINA ACTUAL
    // ==========================================
    const totalCuestionarios =
        getSummaryValue("Cuestionarios aplicados:");

    const finalizados =
        getSummaryValue("Finalizados");

    const pendientes =
        getSummaryValue("Pendientes:");
    const porcentajeFinalizados =
    totalCuestionarios > 0
        ? (finalizados / totalCuestionarios) * 100
        : 0;

    /*Estadistica de respuestas de cuestionario x por usuario y*/
    const [estadisticas, setEstadisticas] = useState<EstadisticaPregunta[]>([]);
    const [loadingEstadisticas, setLoadingEstadisticas] = useState(true);
    
    const loadEstadisticas = async () => {

    try {

        setLoadingEstadisticas(true);

        const token =
            localStorage.getItem("token") ?? "";

        const response =
            await estadisticaCuestionarioRequest({

                idTipoCuestionario: 1,

                access_token: token

            });

        console.log(
            "ESTADISTICAS:",
            response.preguntas
        );

        setEstadisticas(
            response.preguntas
        );

    } catch (error) {

        console.error(
            "Error cargando estadísticas:",
            error
        );

    } finally {

        setLoadingEstadisticas(false);

    }
};

    useEffect(() => {
        loadEstadisticas();
        
    }, []);

        

    return (
          
        <div className="configuration-page">
            <Header/>

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="configuration-header">

                <div>

                    <span className="configuration-rubro">
                        
                    </span>

                    <h1>
                        Gestión de cuestionarios
                    </h1>

                    <p>
                        Consulta el estado de los
                        cuestionarios, participantes
                        y resultados.
                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* RESUMEN */}
            {/* ================================= */}

            <section className="configuration-section">

                <h2>
                    Resumen
                </h2>


                <div className="configuration-summary">

                    {summary.map(item => (

                        <div
                            key={item.label}
                            className="configuration-stat"
                        >

                            <span>
                                {item.label}
                            </span>

                            <strong>
                                {item.value}
                            </strong>

                        </div>

                    ))}

                </div>

            </section>


            {/* ================================= */}
            {/* PARTICIPACIÓN */}
            {/* ================================= */}

            {/* ================================= */}


            <section className="configuration-section">

                <h2>
                    Participación
                </h2>

                <div className="configuration-chart-container">

                    {/* INFORMACIÓN */}

                    <div className="configuration-chart-info">

                        <h3>
                            Estado de los cuestionarios
                        </h3>

                        <p>
                            Distribución de los cuestionarios
                            aplicados actualmente.
                        </p>

                        <div className="chart-total">

                            <strong>
                                {totalCuestionarios}
                            </strong>

                            <span>
                                cuestionarios aplicados
                            </span>

                        </div>

                    </div>


                    {/* DONA */}

                    <div className="donut-chart-wrapper">

                        <div
                            className="donut-chart"
                            style={{
                                background:
                                    totalCuestionarios > 0
                                        ? `conic-gradient(
                                            #22c55e 0deg
                                            ${(finalizados / totalCuestionarios) * 360}deg,
                                            #f59e0b
                                            ${(finalizados / totalCuestionarios) * 360}deg
                                            360deg
                                        )`
                                        : "#e2e8f0"
                            }}
                        >

                            <div className="donut-center">

                                <strong>
                                    {porcentajeFinalizados.toFixed(1)}%
                                </strong>

                                <span>
                                    Finalizados
                                </span>

                            </div>

                        </div>


                        {/* LEYENDA */}

                        <div className="donut-legend">

                            <div className="donut-legend-item">

                                <span className="legend-color completed"></span>

                                <span>
                                    Finalizados
                                </span>

                                <strong>
                                    {finalizados}
                                </strong>

                            </div>


                            <div className="donut-legend-item">

                                <span className="legend-color pending"></span>

                                <span>
                                    Pendientes
                                </span>

                                <strong>
                                    {pendientes}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================================= */}
            {/* RESULTADOS */}
            {/* ================================= */}

            <section className="configuration-section">

                <div className="configuration-section-header">

                    <div>
                        <h2>
                            Resultados del cuestionario
                        </h2>

                        <p>
                            Distribución de respuestas por pregunta.
                        </p>
                    </div>

                </div>


                {loadingEstadisticas ? (

                    <div className="configuration-loading">
                        Cargando estadísticas...
                    </div>

                ) : estadisticas.length === 0 ? (

                    <div className="configuration-empty">
                        No hay estadísticas disponibles.
                    </div>

                ) : (

                    <div className="estadisticas-container">

                        {estadisticas.map((pregunta) => (

                            <div
                                key={pregunta.id}
                                className="estadistica-card"
                            >

                                <h3>
                                    {pregunta.descripcion}
                                </h3>

                                <div className="estadistica-opciones">

                                    {pregunta.opciones.map((opcion) => (

                                        <div
                                            key={opcion.id}
                                            className="estadistica-opcion"
                                        >

                                            <div className="estadistica-opcion-header">

                                                <span>
                                                    {opcion.descripcion}
                                                </span>

                                                <strong>
                                                    {opcion.porcentaje}%
                                                </strong>

                                            </div>


                                            <div className="estadistica-bar">

                                                <div
                                                    className="estadistica-bar-fill"
                                                    style={{
                                                        width: `${opcion.porcentaje}%`
                                                    }}
                                                />

                                            </div>


                                            <small>
                                                {opcion.cantidad} respuestas
                                            </small>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section> 


            {/* ================================= */}
            {/* PARTICIPANTES */}
            {/* ================================= */}

            <section className="configuration-section">


                <div className="configuration-section-header">

                    <div>

                        <h2>
                            Cuestionarios
                        </h2>

                        <p>
                            Registros encontrados:
                            {" "}
                            {totalElements}
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            loadCuestionarios()
                        }
                    >
                        🔄 Actualizar
                    </button>

                </div>


                {/* ================================= */}
                {/* TABLA */}
                {/* ================================= */}

                <div className="configuration-table-wrapper">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Entrevistado
                                </th>

                                <th>
                                    Entrevistador
                                </th>

                                <th>
                                    Estado
                                </th>

                                <th>
                                    Fecha
                                </th>

                                <th>
                                    Expiración
                                </th>

                                <th>
                                    Acciones
                                </th>

                            </tr>

                        </thead>


                        <tbody>


                            {loading ? (

                                <tr>

                                    <td
                                        colSpan={7}
                                        style={{
                                            textAlign: "center",
                                            padding: "30px"
                                        }}
                                    >
                                        Cargando cuestionarios...
                                    </td>

                                </tr>

                            ) : cuestionarios.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={7}
                                        style={{
                                            textAlign: "center",
                                            padding: "30px"
                                        }}
                                    >
                                        No hay cuestionarios.
                                    </td>

                                </tr>

                            ) : (

                                cuestionarios.map(
                                    cuestionario => (

                                        <tr
                                            key={
                                                cuestionario.id
                                            }
                                        >

                                            <td>
                                                {cuestionario.id}
                                            </td>


                                            <td>
                                                {
                                                    cuestionario
                                                        .entrevistado
                                                }
                                            </td>


                                            <td>
                                                {
                                                    cuestionario
                                                        .entrevistador
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={`status ${getStatusClass(
                                                        cuestionario
                                                            .estatus
                                                    )}`}
                                                >
                                                    {
                                                        cuestionario
                                                            .estatus
                                                    }
                                                </span>

                                            </td>


                                            <td>
                                                {
                                                    formatDate(
                                                        cuestionario
                                                            .fechaEjecucion
                                                    )
                                                }
                                            </td>


                                            <td>
                                                {
                                                    formatDate(
                                                        cuestionario
                                                            .expiracion
                                                    )
                                                }
                                            </td>


                                            <td>

                                                <button
                                                    className="table-action-button"
                                                    onClick={() => {

                                                        console.log(
                                                            "Ver cuestionario:",
                                                            cuestionario.id
                                                        );

                                                    }}
                                                >
                                                    👁
                                                </button>


                                                <button
                                                    className="table-action-button"
                                                    onClick={() => {

                                                        console.log(
                                                            "Ver respuestas:",
                                                            cuestionario.id
                                                        );

                                                    }}
                                                >
                                                    📊
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {/* ================================= */}
                {/* PAGINACIÓN */}
                {/* ================================= */}

                <div className="configuration-pagination">


                    <button
                        disabled={page === 0}
                        onClick={() =>
                            setPage(
                                previousPage =>
                                    previousPage - 1
                            )
                        }
                    >
                        ← Anterior
                    </button>


                    <span>

                        Página{" "}
                        <strong>
                            {page + 1}
                        </strong>
                        {" "}de{" "}
                        <strong>
                            {totalPages}
                        </strong>

                    </span>


                    <button
                        disabled={
                            page >= totalPages - 1
                        }
                        onClick={() =>
                            setPage(
                                previousPage =>
                                    previousPage + 1
                            )
                        }
                    >
                        Siguiente →
                    </button>


                </div>


            </section>


        </div>

    );
}