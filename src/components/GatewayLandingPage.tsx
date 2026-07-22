import "../styles/gateway.css";
import Footer from "./Footer";
import Logo from "./Logo";
import SimpleLoginPage from "../pages/SimpleLoginPage";

export default function GatewayLandingPage() {

  const proyectos = [
    {
      title: "Caja de ahorro",
      description:
        "Servicio principal encargado de administrar y distribuir tráfico hacia las aplicaciones.",
      url: "https://cajaahorro-5af26.web.app/"
    },
    {
      title: "Cuestionario Nordiko",
      description:
        "Panel de monitoreo, usuarios, métricas y administración de infraestructura.",
      url: "https://nordiko-53896.web.app/"
    },
    {
      title: "Ejempos de algoritmos",
      description:
        "Documentación técnica, endpoints y configuración de servicios.",
      url: "https://domotica-70d33.web.app/"
    },
    {
      title: "Servicio de rifas",
      description:
        "Documentación técnica, endpoints y configuración de servicios.",
      url: "https://rifa-3479a.web.app/"
    }
  ];

  const stack = [
    "Nginx",
    "WildFly",
    "Java",
    "Spring",
    "Linux",
    "PostgreSQL"
  ];

  return (
  <div className="app">
      <div className="background-grid"></div>
      <div className="gradient-orb orb-left"></div>
      <div className="gradient-orb orb-right"></div>
      {/*INICIO PSO BACKGROUN*/}
      <div className="pso-background">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
        <div className="particle particle-9"></div>
        <div className="global-best"></div>
        <svg
          className="background-lines"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >

          <line x1="200" y1="200" x2="900" y2="500" />
          <line x1="500" y1="800" x2="900" y2="500" />
          <line x1="1500" y1="300" x2="900" y2="500" />
          <line x1="1300" y1="700" x2="900" y2="500" />
          <line x1="300" y1="500" x2="900" y2="500" />

        </svg>
      </div>
    {/*FIN PSO BACKGROUND*/}

    <header className="navbar">
      <Logo/>
      
      <nav className="nav-links">
          <a href="#services">Servicios</a>
          <a href="#stack">Infraestructura</a>
          <a href="#status">Estado</a>
      </nav>

      <div className="nav-actions">

        <button className="dashboard-btn">
          Dashboard
        </button>

           <div className="account-menu">
              <button className="account-btn">
                Acceso ▾
              </button>
              <div className="dropdown-menu">
                <a href="/login">
                  Iniciar sesión
                </a>
                <a href="/register">
                  Crear cuenta
                </a>
              </div>
           </div>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            Infrastructure Platform
          </div>
          <h2>
              Transformamos ideas en soluciones.
          </h2>

          <p>
            Evoware es una plataforma 
            diseñada para brindar múltiples servicios
            con seguridad, rendimiento y
            escalabilidad.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">
              Explorar servicios
            </button>

             <button className="secondary-btn">
               Ver estado
            </button>
          </div>
        </div>

        {/*<div className="hero-panel">
          <div className="panel-top">
            <div>
              <h3>Componentes actuales</h3>
              <span>Todos los sistemas</span>
            </div>

            <div className="status-pill">
              Online
            </div>
          </div>

          <div className="status-list">
            <div className="status-item">
              <div className="status-info">

                <div className="status-dot"></div>
                 <span>Caja de ahorro</span>
              </div>
                <strong>Activo</strong>
            </div>

            <div className="status-item">
              <div className="status-info">
                <div className="status-dot"></div>
                <span>Cuestionario Nordiko </span>
              </div>
              <strong>Activo</strong>
            </div>

            <div className="status-item">
               <div className="status-info">
                <div className="status-dot"></div>
                <span>Algoritmos</span>
              </div>
              <strong>Activo</strong>
            </div>
          </div>
        </div>*/}
        {/*se agrega login aqui */}
          <SimpleLoginPage/>

      </section>

      <section
        className="stack-section"
        id="services"
        >
        <div className="section-header">
          <div>
            <span className="section-label">
              Servicios
            </span>
            <h3>
              Servicios disponibles
            </h3>
          </div>
        </div>

        <div className="service-grid">
          {proyectos.map((item) => (
            <div className="service-card" key={item.title}>
              <div className="service-icon">
                ◆
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a href={item.url}>
                Abrir servicio →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section
        className="stack-section"
        id="stack"
      >
        <div className="section-header">
          <div>
            <span className="section-label">
              Tecnología
            </span>
              <h3>
                Infraestructura tecnológica
              </h3>
            </div>
          </div>

          <div className="stack-grid">
            {stack.map((tech) => (
              <div className="stack-item" key={tech}>
                {tech}
              </div>
            ))}
        </div>
      </section>

      <section
        className="metrics-section"
        id="status"
        >

        <div className="metric-card">
          <span className="metric-title">
            CPU Usage
          </span>
          <h4>23%</h4>
          <p>Consumo promedio</p>
        </div>

        <div className="metric-card">
          <span className="metric-title">
              Memory
            </span>

            <h4>5.2 GB</h4>
              <p>Uso actual del sistema</p>
        </div>
        <div className="metric-card">
              <span className="metric-title">
                Uptime
              </span>
              <h4>99.9%</h4>
              <p>Disponibilidad global</p>
          </div>
       </section>

    </main>
    <Footer /> 
  </div>
  );
}