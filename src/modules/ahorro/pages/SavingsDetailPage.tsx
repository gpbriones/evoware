import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { resumenRequest } from "../../../services/PersonalService";
import type { ResumenResponse } from "../../../services/PersonalService";
import { usuarioAportacionRequest } from "../../../services/ResumenService";
import type { UsuarioAportacionResponse } from "../../../services/ResumenService";
import { logOutRequest } from "../../../services/LogoutService";
import GoalModal from "../../../components/GoalModal";


import { useNavigate } from "react-router-dom";

export default function PersonalGoal() {
  const navigate = useNavigate();

  const [data, setData] = useState<ResumenResponse | null>(null);
  const [aportaciones, setAportaciones] = useState<UsuarioAportacionResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const [showTable, setShowTable] = useState(true);
  

  const user = {
    name: data?.nombre,
    goalAmount: (data?.aportacionInicial?? 0) * (data?.metaSemanas ?? 0),
    contributions: data?.montoAhorro ?? 0,
    interests: data?.interesAcumulado ?? 0,
    porCienAvanceahorro: data?.porCienAvanceahorro ?? 0,
    interesDia: data?.interesDia ?? 0,
   // movements: [
     // { id: 1, date: "2026-01-11", type: "Aportación", amount: 250 },
   //   { id: 2, date: "2026-01-18", type: "Aportación", amount: 250 },
   //   { id: 3, date: "2026-02-01", type: "Interés", amount: 150 },
   //   { id: 4, date: "2026-02-10", type: "Aportación", amount: 300 },
    //],
   
    movements: aportaciones?.usuarioAportaciones?.map ((a, index) => ({
    id: index,
    date: new Date(a.fechaAportacion).toLocaleDateString("es-MX", {
  timeZone: "UTC",
}),
    type: "Aportación",
    amount: a.montoAportacion,
   }))?? [],

  };

  //const total = user.contributions + user.interests;
  const total = user.contributions +  user.interests;
  const progress = user.porCienAvanceahorro;

  /* ================= Animación contador ================= */
  const [animatedTotal, setAnimatedTotal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = total / (duration / 16);

    const fetchResumen = async () => {
    try {
      const access_token =  localStorage.getItem("token") || "";
      const response = await resumenRequest({ access_token });
      setData(response);
     

    } catch (error) {
      console.error("Error obteniendo resumen:", error);
    }
  };

  fetchResumen();

    const counter = setInterval(() => {
      start += increment;
      if (start >= total) {
        start = total;
        clearInterval(counter);
      }
      setAnimatedTotal(start);
    }, 16);

    return () => clearInterval(counter);
  }, [total]);

//segundo useEffect
  useEffect(() => {
  const fetchMovimientos = async () => {
    try {
      const access_token =  localStorage.getItem("token") || "";
      const response = await usuarioAportacionRequest({ access_token });
      setAportaciones(response);
      console.log("RESPUESTA REAL DEL BACKEND:", response);
      setLoaded(true);
    } catch (error) {
      console.error("Error obteniendo movimientos:", error);
    }
  };

  fetchMovimientos();
}, []);


  const handleLogout = async () => {
  try {
      const access_token = localStorage.getItem("token") ?? "";
      await logOutRequest({
        deviceNumber: "WEB", // o el device real si lo manejas
        access_token,
      });
      // limpiar sesión
      localStorage.removeItem("token");
      // redirigir y limpiar ruta actual
      navigate("/", { replace: true });

  } catch (error) {
    console.error("Error en logout:", error);
  }
};
  const isMobile = window.innerWidth < 768;

  //condicion para modal
  useEffect(() => {
     if (!loaded) return;

    if (user.contributions === 0) {
     setShowModal(true);
    }else{
      setShowModal(false);
    }
  }, [user.contributions, loaded]);

  return (
    <section style={sectionStyle(isMobile)}>
      <div style={containerStyle}>
        
        {/* HEADER */}
        <div style={headerStyle(isMobile)}>
          <div>
            <h1 style={titleStyle(isMobile)}>
              Hola {user.name}!
            </h1>
            <p style={{ opacity: 0.7 }}>
              Detalles de tu caja de ahorro 2026.
            </p>
          </div>

          <button style={logoutBtn} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        {/* RESUMEN */}
        <div style={cardStyle}>
          <h2 style={{ opacity: 0.8 }}>Total acumulado</h2>

          <h3 style={amountStyle(isMobile)}>
           ${animatedTotal.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
          </h3>

          {/* Barra progreso */}
          <div style={progressBarContainer}>
            <div
              style={{
                ...progressBar,
                width: `${progress}%`,
              }}
            />
          </div>

          <p style={{ marginTop: "0.8rem", opacity: 0.7 }}>
            {progress.toFixed(2)}% de tu meta (${user.goalAmount.toLocaleString()})
          </p>
          <GoalModal open={showModal} onClose={() => setShowModal(false)} />
        </div>

        {/* DISTRIBUCIÓN */}
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "1.5rem" }}>
            Distribución ahorro
          </h2>

          <div style={chartContainer}>
            <div
              style={{
                ...barStyle,
                height: `${(user.contributions / total) * 100}%`,
                background: "#22c55e",
              }}
            />
            <div
              style={{
                ...barStyle,
                height: `${(user.interests / total) * 100}%`,
                background: "#3b82f6",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
            <span style={{ color: "#22c55e" }}>
              ● Aportaciones (
                 ${user.contributions.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                )
            </span>
            <span style={{ color: "#3b82f6" }}>
              ● Intereses (
                  ${user.interests.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}
                )
            </span>
            <span style={{ color: "#3b82f6" }}>
              ● Interes del dia (
                  ${user.interesDia.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}
                )
            </span>
          </div>
        </div>

        {/* TABLA */}
        <div style={cardStyle}>
              <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                   <h2 style={{ margin: 0 }}>Movimientos</h2>

                    <button
                      onClick={() => setShowTable((prev) => !prev)}
                      style={{
                        padding: "8px 14px",
                        background: "#334155",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      {showTable ? "▼ Mostrar": "▲ Ocultar" }
                    </button>
                </div>

                <div
                  style={{
                    maxHeight: showTable ?  "0":"800px" ,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >      

       



          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Tipo</th>
                <th style={thStyle}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {user.movements.map((mov) => (
                <tr key={mov.id}>
                  <td style={tdStyle}>{mov.id+1}</td>
                  <td style={tdStyle}>{mov.date}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color:
                        mov.type === "Interés"
                          ? "#3b82f6"
                          : "#22c55e",
                    }}
                  >
                    {mov.type}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>
                    +${mov.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div> 

        </div>

      </div>
    </section>
  );
}

/* ===================== ESTILOS TIPADOS ===================== */

const sectionStyle = (isMobile: boolean): CSSProperties => ({
  minHeight: "100dvh",
  background: "linear-gradient(135deg, #0f172a, #020617)",
  padding: isMobile ? "2rem 1rem" : "3rem",
  color: "white",
});

const containerStyle: CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const headerStyle = (isMobile: boolean): CSSProperties => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  justifyContent: "space-between",
  alignItems: isMobile ? "flex-start" : "center",
  marginBottom: "3rem",
  gap: "1.5rem",
});

const titleStyle = (isMobile: boolean): CSSProperties => ({
  fontSize: isMobile ? "2rem" : "2.5rem",
  fontWeight: 800,
});

const cardStyle: CSSProperties = {
  background: "#1e293b",
  padding: "2rem",
  borderRadius: "16px",
  marginBottom: "2rem",
  boxShadow: "0 15px 30px rgba(0,0,0,0.35)",
};

const amountStyle = (isMobile: boolean): CSSProperties => ({
  fontSize: isMobile ? "2rem" : "3rem",
  fontWeight: 800,
  color: "#22c55e",
  marginTop: "0.5rem",
});

const progressBarContainer: CSSProperties = {
  marginTop: "1.2rem",
  width: "100%",
  height: "12px",
  background: "#334155",
  borderRadius: "10px",
  overflow: "hidden",
};

const progressBar: CSSProperties = {
  height: "100%",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  transition: "width 1s ease",
};

const chartContainer: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  gap: "2rem",
  height: "180px",
};

const barStyle: CSSProperties = {
  width: "60px",
  borderRadius: "10px",
  transition: "all 1s ease",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  padding: "1rem",
  borderBottom: "1px solid #334155",
};

const tdStyle: CSSProperties = {
  padding: "1rem",
  borderBottom: "1px solid #334155",
};

const logoutBtn: CSSProperties = {
  padding: "0.8rem 1.5rem",
  background: "linear-gradient(135deg, #ef4444, #b91c1c)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontWeight: 600,
  cursor: "pointer",
};
