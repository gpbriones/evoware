import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import "./Dashboard.css";

export default function Home() {
  const BASE_URL_CUESTIONARIOS = import.meta.env.VITE_API_CUESTIONARIOS_URL;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    edad: "",
    genero: "",
    puesto: "",
    area: "",
    antiguedad: "",
    gravidez: "",
    estadoSalud: "",
    
    
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  
  const token = localStorage.getItem("token");


  const handleStart = async (tieneMolestias: boolean) => {
    if (!form.nombre || !form.apellidoPaterno ||!form.apellidoMaterno
       || !form.edad || !form.genero || !form.puesto || !form.area|| !form.antiguedad || !form.estadoSalud) {
          alert("Completa todos los campos");
          return;
     }
    if (loading) 
      return; // 🚫 evita doble ejecución
    setLoading(true);
      try {
        // 🔹 1. Guardar datos generales
        const response = await fetch(`${BASE_URL_CUESTIONARIOS}/cuestionarios/saveGenerales`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {...form,
                genero: form.genero || "H",     // default
                gravidez: form.genero === "F" ? form.gravidez : "N", // 👈 clave
                estado: tieneMolestias ? "CON_MOLESTIAS" : "SIN_MOLESTIAS",
                access_token: token,
               })
              }
            );
            if(!response.ok){
              const errorData = await response.json();
              // 👉 ejemplo: pintar en pantalla
              // 🔹 4. mostrar popup
              alert(JSON.stringify(errorData));
              return;
            }  
            const data = await response.json();
            console.log("Respuesta generales:", data);
            const token_c = data.token; // 👈 backend debe enviarlo
            const access_token = data.access_token; // 👈 backend debe enviarlo
            let mensajeFinal = "Cuestionario guardado correctamente";
            // 🔥 guardar token para siguientes pantallas
            localStorage.setItem("token_c", token_c);
            localStorage.setItem("token", access_token);

             // 🔹 2. Si NO tiene molestias → guardar nordico
            if (!tieneMolestias) {
              const responseNordico = await fetch(
              `${BASE_URL_CUESTIONARIOS}/cuestionarios/${token_c}/saveNordico`,
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

            const dataNordico = await responseNordico.json();
            // 👇 usa response del backend
            mensajeFinal = `Guardado: ${dataNordico.estado || "ok"}`;
            // 🔹 3. limpiar formulario
            setForm({
              nombre: "",
              apellidoPaterno: "",
              apellidoMaterno: "",
              edad: "",
              genero: "",
              puesto: "",
              area: "",
              antiguedad: "",
              gravidez: "",
              estadoSalud: ""
            });
            localStorage.removeItem("userData");
            // 🔹 4. mostrar popup
            setMensaje(mensajeFinal);
            setShowPopup(true);

            // 🔹 5. esperar y redirigir
            setTimeout(() => {
              setShowPopup(false);
              navigate("/principalDashboard");
            }, 1000);
          }
          if(tieneMolestias){
            localStorage.setItem("token_c", token_c);
            localStorage.setItem("token", access_token);
            setTimeout(() => {
              setShowPopup(false);
              navigate("/body");
            }, 500);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("No se pudo conectar, intente mas tarde.");
        }finally {
          setLoading(false);
        }
      };

  const [isMobile, setIsMobile] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);


  

  return (
  <DashboardLayout>

    {/* LOADER */}
    {loading && (
      <div className="modal-overlay">
        <div className="loader-box">
          <div className="spinner"></div>
          <p>Guardando...</p>
        </div>
      </div>
    )}


    {/* POPUP ÉXITO */}
    {showPopup && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Éxito</h3>
          <p>{mensaje}</p>
        </div>
      </div>
    )}


    {/* INFORMACIÓN */}
    {!isMobile && (
      <div className="cuestionario-info">
        <p>
          Este cuestionario se basa en el Cuestionario Nórdico de Kuorinka,
          su propósito es detectar la existencia de síntomas iniciales que
          todavía no se han constituido como una enfermedad y recopilar
          información sobre dolor, fatiga o molestias corporales.
        </p>
      </div>
    )}


    {/* BOTÓN INFORMACIÓN EN MÓVIL */}
    {isMobile && (
      <button
        className="info-button"
        onClick={() => setShowInfo(true)}
      >
        ℹ️
      </button>
    )}


    {/* MODAL INFORMACIÓN */}
    {showInfo && (
      <div
        className="modal-overlay"
        onClick={() => setShowInfo(false)}
      >

        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >

          <button
            className="modal-close"
            onClick={() => setShowInfo(false)}
          >
            ✕
          </button>

          <h3>Información</h3>

          <p>
            Este cuestionario se basa en el Cuestionario Nórdico de Kuorinka,
            su propósito es detectar la existencia de síntomas iniciales que
            todavía no se han constituido como una enfermedad, ayuda para
            recopilar información sobre dolor, fatiga o molestias corporales.
          </p>

          <p>
            (NOM-036-1-STPS-2018, Factores de riesgo ergonómico en el Trabajo-
            Identificación, análisis, prevención y control.) El cuestionario
            podrá aplicarse a los trabajadores que realizan manejo manual de
            cargas, conteste lo siguiente:
          </p>

        </div>

      </div>
    )}


    {/* CUESTIONARIO */}
    <div className="cuestionario-page">

      <div className="cuestionario-card">

        <h2 className="cuestionario-title">
          Evaluación ergonómica del trabajador
        </h2>

        {!isMobile && (
          <p className="cuestionario-description">
            (NOM-036-1-STPS-2018, Factores de riesgo ergonómico en el Trabajo-
            Identificación, análisis, prevención y control.) El cuestionario
            podrá aplicarse a los trabajadores que realizan manejo manual de
            cargas, conteste lo siguiente:
          </p>
        )}


        {/* DATOS DEL TRABAJADOR */}

        <h3 className="form-section-title">
          Datos del trabajador
        </h3>


        <div className="cuestionario-form">

          {/* NOMBRE */}
          <div className="form-field">

            <label className="form-label">
              Nombre(s)
            </label>

            <input
              className="questionnaire-input"
              name="nombre"
              value={form.nombre}
              placeholder="Ingrese nombre(s)"
              onChange={handleChange}
            />

          </div>


          {/* APELLIDO PATERNO */}
          <div className="form-field">

            <label className="form-label">
              Apellido paterno
            </label>

            <input
              className="questionnaire-input"
              name="apellidoPaterno"
              value={form.apellidoPaterno}
              placeholder="Ingrese apellido paterno"
              onChange={handleChange}
            />

          </div>


          {/* APELLIDO MATERNO */}
          <div className="form-field">

            <label className="form-label">
              Apellido materno
            </label>

            <input
              className="questionnaire-input"
              name="apellidoMaterno"
              value={form.apellidoMaterno}
              placeholder="Ingrese apellido materno"
              onChange={handleChange}
            />

          </div>


          {/* EDAD */}
          <div className="form-field">

            <label className="form-label">
              Edad
            </label>

            <input
              className="questionnaire-input"
              name="edad"
              value={form.edad}
              placeholder="Edad"
              onChange={handleChange}
            />

          </div>


          {/* GÉNERO */}
          <div className="form-field">

            <label className="form-label">
              Género
            </label>

            <select
              className="questionnaire-input"
              name="genero"
              value={form.genero}
              onChange={handleChange}
            >

              <option value="">
                Seleccione una opción
              </option>

              <option value="M">
                Masculino
              </option>

              <option value="F">
                Femenino
              </option>

            </select>

          </div>


          {/* GRAVIDEZ */}
          {form.genero === "F" && (
            <div className="form-field">

              <label className="form-label">
                Estado de gravidez
              </label>

              <select
                className="questionnaire-input"
                name="gravidez"
                value={form.gravidez}
                onChange={handleChange}
              >

                <option value="">
                  Seleccione una opción
                </option>

                <option value="S">
                  Embarazada
                </option>

                <option value="N">
                  No embarazada
                </option>

              </select>

            </div>
          )}


          {/* PUESTO */}
          <div className="form-field">

            <label className="form-label">
              Puesto de trabajo
            </label>

            <input
              className="questionnaire-input"
              name="puesto"
              value={form.puesto}
              placeholder="Ingrese puesto"
              onChange={handleChange}
            />

          </div>


          {/* ÁREA */}
          <div className="form-field">

            <label className="form-label">
              Área
            </label>

            <input
              className="questionnaire-input"
              name="area"
              value={form.area}
              placeholder="Ingrese área"
              onChange={handleChange}
            />

          </div>


          {/* ANTIGÜEDAD */}
          <div className="form-field">

            <label className="form-label">
              Antigüedad en el puesto
            </label>

            <input
              className="questionnaire-input"
              name="antiguedad"
              value={form.antiguedad}
              placeholder="Ej. 2 años"
              onChange={handleChange}
            />

          </div>


          {/* ESTADO DE SALUD */}
          <div className="form-field">

            <label className="form-label">
              Estado de salud
            </label>

            <input
              className="questionnaire-input"
              name="estadoSalud"
              value={form.estadoSalud}
              placeholder="Describa su estado de salud"
              onChange={handleChange}
            />

          </div>

        </div>


        {/* DECISIÓN SOBRE MOLESTIAS */}

        <div className="molestias-section">

          <h3 className="molestias-title">
            ¿Presenta molestias actualmente?
          </h3>

          <p className="molestias-description">
            Seleccione la opción que corresponda para continuar con la evaluación.
          </p>


          <div className="molestias-buttons">

            <button
              className="molestias-button molestias-si"
              onClick={() => handleStart(true)}
              disabled={loading}
            >
              ⚠️ Sí, tengo molestias
            </button>


            <button
              className="molestias-button molestias-no"
              onClick={() => handleStart(false)}
              disabled={loading}
            >
              ✓ No tengo molestias
            </button>

          </div>

        </div>

      </div>

    </div>

  </DashboardLayout>
);
}


