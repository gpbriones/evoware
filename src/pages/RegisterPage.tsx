import "../styles/auth.css";
import Logo from "../components/Logo";

export default function RegisterPage() {

  return (
    <div className="auth-layout">
      <div className="auth-background"></div>
      <div className="auth-left">
        <Logo/>
        <div className="auth-info">
          <span className="auth-badge">
            Platform Access
          </span>

          <h2>
            Registrate para utilizar el servicio que requieras...
          </h2>

          <p>
            Registra una cuenta para utilizar
            los servicios de optimización,
            APIs empresariales y herramientas
            de simulación distribuidas.
          </p>

          <div className="requirements-box">

            <h4>
              Requisitos para acceso
            </h4>

            <ul>

              <li>
                Correo institucional o empresarial
              </li>

              <li>
                Uso académico, investigación o desarrollo
              </li>

              <li>
                Aceptar políticas de seguridad
              </li>

              <li>
                Validación administrativa
              </li>

            </ul>

          </div>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h3>
            Create Account
          </h3>

          <p>
            Registra una nueva cuenta
          </p>

          <form className="auth-form">

            <div className="input-group">

              <label>Nombre</label>

              <input
                type="text"
                placeholder="Nombre completo"
              />

            </div>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="usuario@empresa.com"
              />

            </div>

            <div className="input-group">

              <label>Institución / Empresa</label>

              <input
                type="text"
                placeholder="Empresa o universidad"
              />

            </div>

            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="••••••••••"
              />

            </div>

            <button type="submit">
              Solicitar acceso
            </button>

          </form>

          <div className="auth-footer">

            <span>
              ¿Ya tienes cuenta?
            </span>

            <a href="/login">
              Iniciar sesión
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}