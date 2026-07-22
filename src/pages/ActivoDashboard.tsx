import { useEffect, useState } from "react";
import "../styles/ActivoDashboard.css";

import { buscarActivos,crearActivo, actualizarActivo, reporteActivo } from "../services/ActivoService";

import ActivoFilters from "../components/ActivoFilters";
import ActivoTable from "../components/ActivoTable";
import ActivoPagination from "../components/ActivoPagination";

import type { ActivoResponse} from "../models/ActivoResponse";
import type { ActivoRequest} from "../models/ActivoRequest";
import type { ActivoSearchRequest } from "../models/SearchRequest";

import { logOutRequest } from "../services/LogoutService";

import ActivoForm from "../components/ActivoForm";
import ActivoModal from "../components/ActivoModal";

import { useNavigate } from "react-router-dom";

export function ActivoDashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState<ActivoResponse[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    //para seleccionar activo a modificar
    const [activoSeleccionado, setActivoSeleccionado] =
    useState<ActivoResponse | null>(null);

    const [filters, setFilters] = useState({});

    const [sortBy, setSortBy] = useState("costoAdquisicion");
    const [direction, setDirection] = useState<"ASC" | "DESC">("ASC");

    const handleSort = (field: string) => {
      if (sortBy === field) {
        setDirection(direction === "ASC" ? "DESC" : "ASC");
      } else {
        setSortBy(field);
        setDirection("ASC");
      }

  setPage(0);
};

    const [loading, setLoading] = useState(false);
    //modal paraa crear activo
    const [openModal, setOpenModal] = useState(false);

    //fetch
    const fetchData = async () => {
    try {
      setLoading(true);
      const request: ActivoSearchRequest = {
        filter: filters,
        page,
        size,
        sortBy,
        direction
      };
      const res = await buscarActivos(request);
      setData(res.data.content);
      setTotalPages(res.data.totalPages);

    }catch (error) {
      console.error("Error obteniendo resumen:", error);
    }finally {
      setLoading(false);
    }
  };

  //useEfect
  useEffect(() => {
    
    fetchData();
  }, [page,sortBy, direction]);

  //crear o editar activo
    const handleSave = async (formData: ActivoRequest) => {
      const access_token = localStorage.getItem("token") || "";
      formData.access_token = access_token;
    try {
      if (activoSeleccionado) {
        if (!activoSeleccionado?.idActivo) {
          throw new Error("Folio no definido");
        }
        await actualizarActivo(activoSeleccionado.idActivo,formData);
      } else {

        await crearActivo(formData);

      }
      setActivoSeleccionado(null);
      setOpenModal(false);
      fetchData();

    } catch (error: any) {
       if (error.response?.status === 403) {
          alert("No tiene permisos para realizar esta operación");
      }else{
        console.error("Error al guardar activo", error);
      alert(error.response?.data?.message?? "Error desconocido");
      }
      
    }
  };

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


  const handleExportar = async () => {
      try {
         const access_token = localStorage.getItem("token") || "";
        const request: ActivoSearchRequest = {
          filter: filters,
          page,
          size,
          sortBy,
          direction,
          access_token: access_token
        };
        console.log("REQUEST:", request);
        console.log("JSON:", JSON.stringify(request, null, 2));
        const reporte = await reporteActivo(request);
        const binary = atob(reporte.data.fileBase64);
        const bytes = Uint8Array.from(binary,c => c.charCodeAt(0));
        const blob = new Blob([bytes],{ type: "application/zip" });
        const url =window.URL.createObjectURL(blob);
        const link =document.createElement("a");
        link.href = url;
        link.download = reporte.data.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(
          "Error al generar reporte",
          error
        );
      }
    };

  //render
  return (
  <div className="dashboard-container">

    <header className="dashboard-header">
          <div className="logout-container">
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Cerrar sesión
          </button>
        </div>
      <h1>Administración y control de activos tecnológicos </h1>
      <p>Registra, Consulta y Administrar tu Inventario de Hardware</p>
    </header>

    <section className="card">
      <h2>Filtros de búsqueda</h2>

      <ActivoFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={() => {
          setPage(0);
          fetchData();
        }}
      />
    </section>

    <section className="card">
        <h2>Activos registrados</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ActivoTable
            data={data}
            onSort={handleSort}
            onEdit={(item) => {
              setActivoSeleccionado(item);
              setOpenModal(true);
            }}
          />

          <ActivoPagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}
    </section>
    <section className="card">
       <h2>Nuevos Activos</h2>
      <div className="section-header">
        <button
          className="nuevo-activo-btn"
          onClick={() => {
            setActivoSeleccionado(null);
            setOpenModal(true);
          }}
        >
          Agregar Activo
        </button>
      </div>

    </section>

    <section className="card">
      <h2>Reportes</h2>

      <div className="report-buttons">
        <button onClick={handleExportar}>Exportar Excel</button>
      </div>
    </section>

    <ActivoModal
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <h2>
        {activoSeleccionado
          ? "Editar Activo"
          : "Nuevo Activo"}
      </h2>
      <ActivoForm
        activo={activoSeleccionado}
        onSave={handleSave}
      />
    </ActivoModal>

  </div>
);
}
