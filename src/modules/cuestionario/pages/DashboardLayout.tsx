import { useState, useEffect } from "react";
//g import "../../../styles/EvowareDashboard.css";
import  Header  from "../../../components/Header/Header";

export default function DashboardLayout({ children }: any) {
  //const [dark, setDark] = useState(false);
  const [, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  /*const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };*/

  return (
    
    <div >
      <Header/>
      {/* HEADER */}
      <header className="header">
        
        
          <span className="logo">CUESTIONARIO NÓRDICO DE KUORINKA</span>

        { /* <button className="theme-btn" onClick={toggleTheme}>
            {dark ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        */}

      </header>

      <div className="content">{children}</div>
    </div>
  );
}