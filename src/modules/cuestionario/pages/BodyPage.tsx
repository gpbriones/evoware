import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Body3D from "../components/3d/Body3D";
import DashboardLayout from "./DashboardLayout";

export default function BodyPage() {
    type ZonaSeleccion = {
      raw: string;
      mapped: string;
    };

    const [selectedZona, setSelectedZona] = useState<ZonaSeleccion | null>(null);
    const [step, setStep] = useState(0);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [respuestas, setRespuestas] = useState<any>({});

    const [isMobile,setIsMobile] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const BASE_URL_CUESTIONARIOS = import.meta.env.VITE_API_CUESTIONARIOS_URL;
    
    const token = localStorage.getItem("token");
    

    // 🔥 bloquear scroll cuando hay modal
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
      document.body.style.overflow = selectedZona ? "hidden" : "auto";
    }, [selectedZona]);
    
      /* Funcion para cuestionario dinamico*/
    const handleZona = async (zona: ZonaSeleccion) => {
      if (loading) return; // 🚫 evita doble ejecución
        setLoading(true);

    try {
          setSelectedZona(zona);
          setStep(0);

        const handleZonaResponse = await fetch(
          `${BASE_URL_CUESTIONARIOS}/cuestionarios/getNordico/${zona.raw}`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
              seccion: null, // o algún valor
              access_token: token
              })
            }
        );

        const data = await handleZonaResponse.json();

        setPreguntas(data.listaDTO); // 👈 dinámico
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // 🔥 SIEMPRE se ejecuta
        }

      };
      let mensajeFinal = "Cuestionario guardado correctamente";
      const finCuestionario = async()=>{
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
                      seccion: null, // o algún valor
                      access_token: token
                      })
                    }
                );
                if(!response.ok){
                    if (response.status === 410) {
                        const errorText = await response.text(); // o json()
                        console.log("410:", errorText);
                        alert("Registre almenos una zona donde presente molestias"); // o usar el mensaje del backend
                        return;
                      }
                  }
                await response.json();
                setMensaje(mensajeFinal);
                setShowPopup(true);
                //eliminar token
                localStorage.removeItem("token_c");    
                // 🔹 5. esperar y redirigir
                setTimeout(() => {
                  setShowPopup(false);
                  navigate("/principalDashboard");
                }, 1000);

          } catch (error) {
              console.error(error);
            } finally {
              setLoading(false); // 🔥 CLAVE

            }
    

      }

     

  return (
    <DashboardLayout>
       {/*LOADER VISUAL*/}
      {loading && (
        <div style={overlay}>
          <div style={loaderBox}>
            <div className="spinner"></div>
            <p>Guardando...</p>
          </div>
        </div>
      )}
       {/*POP UP*/}
      {showPopup && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Éxito</h3>
            <p>{mensaje}</p>
          </div>
        </div>
      )}

      <div style={card} >
        <h3>Seleccione la parte del cuerpo con molestias...</h3>
      </div>
      
      
      {/* HEADER */}
      <div style={headerWrapper}>
        <div style={cardHead}>
          {!isMobile && (
          <p>
           Este cuestionario se basa en el Cuestionario Nórdico de Kuorinka, su propósito es detectar
            la existencia de síntomas iniciales que todavía no se han constituido como una enfermedad, 
            ayuda para recopilar información sobre dolor, fatiga o molestias corporales.
          </p>
          )}
        </div>
      </div>
      
      {isMobile && (
      <button style={infoBtn} onClick={() => setShowInfo(true)}>
        ℹ️
      </button>
      )}
      {showInfo && (
            <div
              style={overlay}
              onClick={() => setShowInfo(false)} // 🔥 cerrar al tocar fuera
            >
              <div
                style={modal}
                onClick={(e) => e.stopPropagation()} // 🔥 evita cierre interno
              >
                <button
                  style={closeBtn}
                  onClick={() => setShowInfo(false)}
                >
                  ✕
                </button>

                <h3>Información</h3>

                <p>
                  Este cuestionario se basa en el Cuestionario Nórdico de Kuorinka,
                  su propósito es detectar la existencia de síntomas iniciales que
                  todavía no se han constituido como una enfermedad, ayuda para recopilar
                  información sobre dolor, fatiga o molestias corporales.
                </p>

                <p style={subtitle}>(NOM-036-1-STPS-2018, Factores de riesgo ergonómico en el Trabajo-Identificación, análisis, prevención y control.) El cuestionario podrá aplicarse a los trabajadores que realizan manejo manual de cargas, conteste lo siguiente:</p>

                
              </div>
            </div>
            
      )}  



      {/* 🧍 MODELO */}
      <div style={canvasContainer}>
       { /*<Body3D onSelect={setSelectedZona} />*/}
       <Body3D onSelect={handleZona} />
      </div>

      {/* 🧊 MODAL */}
      {selectedZona && (
        <div style={overlay}>
          <div style={modal}>
            
            <button style={closeBtn} onClick={() => setSelectedZona(null)}>
              ✕
            </button>

            <h3>{selectedZona.mapped}</h3>

           {/* <p>{preguntasBrazo[step]}</p> */}
           <p>{preguntas[step]?.descripcion}</p>

            {preguntas[step]?.tipo === "TEXTO" && (
              <input
                style={input}
                value={respuestas[preguntas[step]?.id] || ""}
                onChange={(e) =>
                  setRespuestas((prev: any) => ({
                    ...prev,
                    [preguntas[step].id]: e.target.value,
                  }))
                }
              />
            )}

            {preguntas[step]?.tipo === "NUMERO" && (
              <input
                type="number"
                style={input}
                value={respuestas[preguntas[step]?.id] || ""}
                onChange={(e) =>
                  setRespuestas((prev: any) => ({
                    ...prev,
                    [preguntas[step].id]: e.target.value,
                  }))
                }
              />
            )}
            
            {preguntas[step]?.tipo === "OPCION" && (
              <select
                style={input}
                value={respuestas[preguntas[step]?.id] || ""}
                onChange={(e) =>
                  setRespuestas((prev: any) => ({
                    ...prev,
                    [preguntas[step].id]: e.target.value,
                  }))
                }
              >
                <option value="">Selecciona</option>

                {preguntas[step]?.opciones?.map((op: any) => (
                  <option key={op.id} value={op.id}>
                    {op.descripcion}
                  </option>
                ))}
              </select>
            )}

            <div style={navBtns}>
              {step > 0 && (
                <button className="btn" onClick={() => setStep(step - 1)}>
                  Anterior
                </button>
              )}

              {step < preguntas.length - 1 ? (
                <button className="btn" onClick={() => setStep(step + 1)}>
                  Siguiente
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={async () => {
                      try {
                        

                        const payload = {
                              listaRespuestaDTO: preguntas.map((p) => {
                                const valor = respuestas[p.id];

                                if (p.tipo === "TEXTO") {
                                  return {
                                    id: p.id,
                                    respuestaTexto: valor || "",
                                  };
                                }

                                if (p.tipo === "NUMERO") {
                                  return {
                                    id: p.id,
                                    respuestaTexto: String(valor || ""),
                                  };
                                }

                                if (p.tipo === "OPCION") {
                                  return {
                                    id: p.id,
                                    respuestaOpcion: Number(valor),
                                  };
                                }

                                return { id: p.id };
                              }),
                            };
                        const token = localStorage.getItem("token");      
                        const saveNordicoResponse = await fetch(
                          `${BASE_URL_CUESTIONARIOS}/cuestionarios/${token}/saveNordico?seccion=${selectedZona.raw}`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                          }
                        );
                        if (!saveNordicoResponse.ok) {
                              if (saveNordicoResponse.status === 410) {
                                const errorText = await saveNordicoResponse.text(); // o json()
                                console.log("410:", errorText);
                                alert("No se guardaron respuestas"); // o usar el mensaje del backend
                                return;
                              }}


                        alert("Cuestionario guardado");

                        // limpiar
                        setSelectedZona(null);
                        setStep(0);
                        setRespuestas({});
                        setPreguntas([]);
                        setShowPopup(false);


                      } catch (error) {
                        console.error(error);
                      }
                    }}
                >
                  Finalizar
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      <button className="btn" style={{ width: "100%" }} onClick={()=>finCuestionario()}>
                  Finalizar Cuestionario
      </button>
      <div style={card}>
      </div>
       <div style={card}>
      </div>
    </DashboardLayout>

    
  );
}

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

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "350px",
  maxHeight: "80vh",
  overflowY: "auto" as const,
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  position: "relative" as const,
  display: "flex",
  flexDirection: "column" as const,
  gap: "15px",
};

const closeBtn = {
  position: "absolute" as const,
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  fontSize: "18px",
  cursor: "pointer",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  
};

const navBtns = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const headerWrapper = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const cardHead = {
  padding: "5px",
  width: "100%",
  maxWidth: "1100px", // 🔥 mejor que 70%
  
  borderRadius: "0px",
  //boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

const card = {
  padding: "10px",
  width: "100%",
  maxWidth: "1100px", // 🔥 mejor que 70%
  
  borderRadius: "4px",
  //boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};
const canvasContainer = {
  flex: 1,
  minHeight: 0,
  display: "flex",
};
const subtitle = {
  fontSize: "13px", // 🔥 más compacto en móvil
  opacity: 0.7,
  marginBottom: "20px",
};

const infoBtn = {
  position: "fixed" as const,
  bottom: "20px",
  right: "20px",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "none",
  background: "#3b82f6",
  color: "white",
  fontSize: "22px",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  zIndex: 1000,
};
const loaderBox = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "10px",
};