export default function ActivoPagination({
  page,
  totalPages,
  setPage
}: {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}) {
  return (
    <div className="hero-panel-activo">
      <button className="pag-activo-btn" disabled={page === 0} onClick={() => setPage(page - 1)}>
        Anterior
      </button>

      <span>{page + 1} / {totalPages}</span>

      <button className="pag-activo-btn" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
        Siguiente
      </button>
    </div>
  );
}