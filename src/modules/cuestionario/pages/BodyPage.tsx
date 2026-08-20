import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Body3D from "../components/3d/Body3D";
import DashboardLayout from "./DashboardLayout";
import "./BodyPage.css";

type Opcion = {
    id: number;
    descripcion: string;
};

type Pregunta = {
    id: number;
    descripcion: string;
    tipo: "TEXTO" | "NUMERO" | "OPCION";
    opciones?: Opcion[];
};

type ZonaSeleccion = {
    raw: string;
    mapped: string;
};

export default function BodyPage() {

    const [selectedZona, setSelectedZona] =
        useState<ZonaSeleccion | null>(null);

    const [step, setStep] = useState(0);

    const [preguntas, setPreguntas] =
        useState<Pregunta[]>([]);

    const [respuestas, setRespuestas] =
        useState<any>({});

    const [isMobile, setIsMobile] =
        useState(false);

    const [showInfo, setShowInfo] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [mensaje, setMensaje] =
        useState("");

    const [showPopup, setShowPopup] =
        useState(false);

    const navigate = useNavigate();

    const BASE_URL_CUESTIONARIOS = import.meta.env.VITE_API_CUESTIONARIOS_URL;
    const token = localStorage.getItem("token");
    //const token_c = localStorage.getItem("token_c");


    /* =====================================================
       RESPONSIVE
       ===================================================== */

    useEffect(() => {

        const check = () => {
            setIsMobile(window.innerWidth < 768);
        };

        check();

        window.addEventListener("resize", check);

        return () => {
            window.removeEventListener("resize", check);
        };

    }, []);


    /* =====================================================
       BLOQUEAR SCROLL CUANDO HAY MODAL
       ===================================================== */

    useEffect(() => {

        document.body.style.overflow =
            selectedZona ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [selectedZona]);


    /* =====================================================
       SELECCIONAR ZONA
       ===================================================== */

    const handleZona = async ( zona: ZonaSeleccion ) => {
        if (loading) return;
        setLoading(true);
        try {
            setSelectedZona(zona);
            setStep(0);
            const response = await fetch(
                `${BASE_URL_CUESTIONARIOS}/cuestionarios/getNordico/${zona.raw}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        seccion: null,
                        access_token: token 
                    })
                }
            );
            const data = await response.json();
            setPreguntas(data.listaDTO);
            localStorage.setItem("section", data.seccion);
        } catch (error) {
            console.error(
                "Error obteniendo cuestionario:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    /* =====================================================
       FINALIZAR CUESTIONARIO COMPLETO
       ===================================================== */

    const finCuestionario = async () => {
        setLoading(true);
        try {
            const token_c = localStorage.getItem("token_c");
            const response = await fetch(
                `${BASE_URL_CUESTIONARIOS}/cuestionarios/${token_c}/finalizarNordico`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        seccion: selectedZona,
                        access_token: token
                        
                    })
                }
            );

            if (!response.ok) {
                if (response.status === 410) {
                    const errorText = await response.text();
                    console.log("410:", errorText);
                    alert( "Registre al menos una zona donde presente molestias");
                    return;
                }
            }
            await response.json();
            setMensaje("Cuestionario guardado correctamente");
            setShowPopup(true);
            localStorage.removeItem("token_c");
            setTimeout(() => {
                setShowPopup(false);
                navigate(
                    "/principalDashboard"
                );
            }, 1000);
        } catch (error) {
            console.error(
                "Error finalizando cuestionario:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    /* =====================================================
       GUARDAR RESPUESTAS DE LA ZONA
       ===================================================== */

    const guardarRespuestas = async () => {
        try {
            const payload = {
                access_token: token,
                listaRespuestaDTO:
                    preguntas.map((p) => {
                        const valor = respuestas[p.id];
                        if (p.tipo === "TEXTO") {
                            return {
                                id: p.id,
                                respuestaTexto:
                                valor || ""
                            };
                        }
                        if (p.tipo === "NUMERO") {
                            return {
                                id: p.id,
                                respuestaTexto: String(valor || "")
                            };
                        }

                        if (p.tipo === "OPCION") {
                            return {
                                id: p.id,
                                respuestaOpcion:
                                Number(valor)
                            };
                        }

                        return {
                            id: p.id
                        };
                    }),
                  
            };

            const token_c = localStorage.getItem("token_c");
            const response = await fetch(
                `${BASE_URL_CUESTIONARIOS}/cuestionarios/${token_c}/saveNordico?seccion=${selectedZona?.raw}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                }
            );
            if (!response.ok) {
                if (response.status === 410) {

                    const errorText =
                        await response.text();

                    console.log("410:", errorText);

                    alert(
                        "No se guardaron respuestas"
                    );

                    return;
                }
            }

            alert(
                "Cuestionario guardado"
            );

            setSelectedZona(null);

            setStep(0);

            setRespuestas({});

            setPreguntas([]);

            setShowPopup(false);

        } catch (error) {

            console.error(
                "Error guardando respuestas:",
                error
            );
        }
    };


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <DashboardLayout>

            {/* =================================================
                LOADER
               ================================================= */}

            {loading && (

                <div className="body-modal-overlay">

                    <div className="body-loader-box">

                        <div className="body-spinner"></div>

                        <p>
                            Guardando...
                        </p>

                    </div>

                </div>
            )}


            {/* =================================================
                POPUP DE ÉXITO
               ================================================= */}

            {showPopup && (

                <div className="body-modal-overlay">

                    <div className="body-modal">

                        <h3>
                            Éxito
                        </h3>

                        <p>
                            {mensaje}
                        </p>

                    </div>

                </div>
            )}


            <div className="body-page">


                {/* =================================================
                    TÍTULO
                   ================================================= */}

                <div className="body-page-title">

                    <h3>
                        Seleccione la parte del cuerpo
                        con molestias...
                    </h3>

                </div>


                {/* =================================================
                    INFORMACIÓN
                   ================================================= */}

                <div className="body-page-info-wrapper">

                    <div className="body-page-info">

                        {!isMobile && (

                            <p>
                                Este cuestionario se basa en
                                el Cuestionario Nórdico de
                                Kuorinka, su propósito es
                                detectar la existencia de
                                síntomas iniciales que todavía
                                no se han constituido como una
                                enfermedad, ayuda para recopilar
                                información sobre dolor, fatiga
                                o molestias corporales.
                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    BOTÓN INFORMACIÓN MÓVIL
                   ================================================= */}

                {isMobile && (

                    <button
                        className="body-info-button"
                        onClick={() =>
                            setShowInfo(true)
                        }
                    >
                        ℹ️
                    </button>

                )}


                {/* =================================================
                    MODAL INFORMACIÓN
                   ================================================= */}

                {showInfo && (

                    <div
                        className="body-modal-overlay"
                        onClick={() =>
                            setShowInfo(false)
                        }
                    >

                        <div
                            className="body-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <button
                                className="body-modal-close"
                                onClick={() =>
                                    setShowInfo(false)
                                }
                            >
                                ✕
                            </button>


                            <h3>
                                Información
                            </h3>


                            <p>
                                Este cuestionario se basa
                                en el Cuestionario Nórdico
                                de Kuorinka, su propósito es
                                detectar la existencia de
                                síntomas iniciales que
                                todavía no se han constituido
                                como una enfermedad, ayuda
                                para recopilar información
                                sobre dolor, fatiga o
                                molestias corporales.
                            </p>


                            <p className="body-modal-subtitle">

                                (NOM-036-1-STPS-2018,
                                Factores de riesgo ergonómico
                                en el Trabajo-Identificación,
                                análisis, prevención y control.)

                                El cuestionario podrá aplicarse
                                a los trabajadores que realizan
                                manejo manual de cargas,
                                conteste lo siguiente.

                            </p>

                        </div>

                    </div>
                )}


                {/* =================================================
                    MODELO 3D
                   ================================================= */}

                <div className="body-page-canvas">

                    <Body3D
                        onSelect={handleZona}
                    />

                </div>


                {/* =================================================
                    MODAL DEL CUESTIONARIO
                   ================================================= */}

                {selectedZona && (

                    <div className="body-modal-overlay">

                        <div className="body-modal">


                            <button
                                className="body-modal-close"
                                onClick={() =>
                                    setSelectedZona(null)
                                }
                            >
                                ✕
                            </button>


                            <h3>
                                {selectedZona.mapped}
                            </h3>


                            <p>
                                {preguntas[step]?.descripcion}
                            </p>


                            {/* TEXTO */}

                            {preguntas[step]?.tipo === "TEXTO" && (

                                <input
                                    className="body-question-input"

                                    value={
                                        respuestas[
                                            preguntas[step]?.id
                                        ] || ""
                                    }

                                    onChange={(e) =>
                                        setRespuestas(
                                            (prev: any) => ({
                                                ...prev,

                                                [preguntas[step].id]:
                                                    e.target.value
                                            })
                                        )
                                    }
                                />

                            )}


                            {/* NUMERO */}

                            {preguntas[step]?.tipo === "NUMERO" && (

                                <input
                                    type="number"

                                    className="body-question-input"

                                    value={
                                        respuestas[
                                            preguntas[step]?.id
                                        ] || ""
                                    }

                                    onChange={(e) =>
                                        setRespuestas(
                                            (prev: any) => ({
                                                ...prev,

                                                [preguntas[step].id]:
                                                    e.target.value
                                            })
                                        )
                                    }
                                />

                            )}


                            {/* OPCION */}

                            {preguntas[step]?.tipo === "OPCION" && (

                                <select
                                    className="body-question-input"

                                    value={
                                        respuestas[
                                            preguntas[step]?.id
                                        ] || ""
                                    }

                                    onChange={(e) =>
                                        setRespuestas(
                                            (prev: any) => ({
                                                ...prev,

                                                [preguntas[step].id]:
                                                    e.target.value
                                            })
                                        )
                                    }
                                >

                                    <option value="">
                                        Selecciona
                                    </option>

                                    {preguntas[
                                        step
                                    ]?.opciones?.map(
                                        (op) => (

                                            <option
                                                key={op.id}
                                                value={op.id}
                                            >
                                                {op.descripcion}
                                            </option>

                                        )
                                    )}

                                </select>

                            )}


                            {/* =================================================
                                BOTONES
                               ================================================= */}

                            <div className="body-question-nav">

                                {step > 0 && (

                                    <button
                                        className="body-question-btn"
                                        onClick={() =>
                                            setStep(
                                                step - 1
                                            )
                                        }
                                    >
                                        Anterior
                                    </button>

                                )}


                                {step <
                                preguntas.length - 1 ? (

                                    <button
                                        className="body-question-btn"
                                        onClick={() =>
                                            setStep(
                                                step + 1
                                            )
                                        }
                                    >
                                        Siguiente
                                    </button>

                                ) : (

                                    <button
                                        className="body-question-btn"
                                        onClick={
                                            guardarRespuestas
                                        }
                                    >
                                        Finalizar
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>
                )}


                {/* =================================================
                    FINALIZAR CUESTIONARIO
                   ================================================= */}

                <button
                    className="body-question-btn"
                    style={{ width: "100%" }}
                    onClick={finCuestionario}
                >
                    Finalizar Cuestionario
                </button>


            </div>

        </DashboardLayout>
    );
}