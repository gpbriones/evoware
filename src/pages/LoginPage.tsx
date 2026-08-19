import "../styles/auth.css";
import Logo from "../components/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/LoginService";
import { useLocation } from "react-router-dom";

export default function LoginPage() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const usernameFromCard = params.get("username") || "";

  const navigate = useNavigate();
  const [isLogin] = useState(true);
  const [form, setForm] = useState({
    username: usernameFromCard,
    tel: "",
    password: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      try{
          if (isLogin) {
            const responseLogin = await loginRequest({
                username: form.username,
                password: form.password,
              });
              // Guardar token
            console.log("Login exitoso:", responseLogin.access_token);
            localStorage.setItem("token", responseLogin.access_token);

            if((responseLogin.cod_respuesta)!=="DM-000-000"){
              alert(responseLogin.mensaje);
              //navigate("/registro?username="+usernameFromCard);
              navigate("/login");
            }else if(responseLogin.cod_respuesta=="DM-000-000"){
              //navigate("/evowareDashboard");
              navigate("/activoDashboard");
            }else{
              alert("Intente nuevamente...");
              navigate("/registro?username="+usernameFromCard);
            }
          }
        }catch (error: any) {
          console.error("Error:", error.response?.data || error.message);
          alert("Ocurrió un error, revisa tus datos");
        }
    };




  return (

    <div className="auth-layout">
      <div className="auth-background"></div>
      <div className="auth-left">
      <Logo/>

        
        <div className="auth-info">

         {/* <span className="auth-badge">
            Secure Access
          </span>*/}

         {/* <h2>
            Accede a la plataforma
            de servicios y optimización
          </h2>*/}
           {/*
          <p>
            Inicia sesión para administrar APIs,
            infraestructura, simulaciones PSO y
            servicios empresariales desplegados
            dentro del gateway.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              ✓ Administración de APIs
            </div>

            <div className="feature-item">
              ✓ Simulación y monitoreo PSO
            </div>

            <div className="feature-item">
              ✓ Acceso seguro JWT
            </div>

            <div className="feature-item">
              ✓ Servicios distribuidos
            </div>

          </div>
          */}

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h3>
            Sign In
          </h3>

          <p>
            Accede a tu cuenta empresarial
          </p>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="input-group">

              <label>Usuario</label>

              <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={form.username}
              onChange={handleChange}
              //style={ {...inputStyle,
              //        backgroundColor: "#4b4b4b",
              //        cursor: "auto"}
              //      }
              //readOnly
              required
            />

            </div>

            <div className="input-group">

              <label>Password</label>
              
              <input
            type="password"
            name="password"
            placeholder="••••••••••"
            value={form.password}
            onChange={handleChange}
            //style={inputStyle}
            required
          />

            </div>

            <button
            type="submit"
            //style={primaryBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 12px 25px rgba(34,197,94,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(34,197,94,0.35)";
            }}
          >
            {isLogin ? "Entrar" : "Registrarme"}
          </button>

          </form>

          <div className="auth-footer">

            <span>
              ¿No tienes cuenta?
            </span>

            <a href="/register">
              Crear cuenta
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}


