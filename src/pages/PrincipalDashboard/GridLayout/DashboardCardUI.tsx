import type { DashboardSummaryItem } from "../DashboardService/DashboardSummaryService";
import "../styles/DashboardCardUI.css";

interface Props {
    icon: string;
    rubro: string;
    title: string;
    description?: string;
    loading: boolean;
    summary: DashboardSummaryItem[];
    onRemove: () => void;
    onConfig: () => void;
    actions: React.ReactNode;
}

export default function DashboardCardUI({
    icon,
    rubro,
    title,
    description,
    loading,
    summary,
    onRemove,
    onConfig,
    actions
}: Props) {

    return (

        <div className="modern-card">

            {/* =====================================
                HEADER
            ====================================== */}

            <div className="card-header">

                <div className="card-header-info">

                    <span className="card-rubro">
                        {icon} {rubro}
                    </span>

                    <div className="card-title-row">

                        <h3>
                            {title}
                        </h3>

                        <button
                            type="button"
                            className="sidebar-config-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onConfig();
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                            }}
                            aria-label="Configurar módulo"
                        >
                            ⚙
                        </button>

                    </div>

                </div>


                {/* =================================
                    ELIMINAR
                ================================== */}

                <button
                    type="button"
                    className="sidebar-btn-remove"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation();
                    }}
                    aria-label="Eliminar módulo"
                >
                    ✕
                </button>

            </div>


            {/* =====================================
                DESCRIPCIÓN
            ====================================== */}

            {description && (

                <div className="dashboard-card-description">

                    {description}

                </div>

            )}


            {/* =====================================
                RESUMEN
            ====================================== */}

            <div className="card-content">

                <div className="dashboard-summary">

                    {loading ? (

                        <span className="summary-loading">
                            Cargando...
                        </span>

                    ) : summary.length === 0 ? (

                        <span className="summary-empty">
                            Sin información disponible
                        </span>

                    ) : (

                        summary.map(resumen => (

                            <div
                                key={resumen.label}
                                className="summary-row modern-summary"
                            >

                                <span>
                                    {resumen.label}
                                </span>

                                <strong>
                                    {resumen.value}
                                </strong>

                            </div>

                        ))

                    )}

                </div>

            </div>


            {/* =====================================
                ACCIONES
            ====================================== */}

            <div className="card-actions">

                {actions}

            </div>

        </div>
    );
}