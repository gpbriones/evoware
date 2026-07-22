
export default function GoalModal({ open, onClose }: any) {
  if (!open) return null;

    const isMobile = window.innerWidth < 768;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()} >
        
        
        <h3 style={{
            fontSize: isMobile ? "1.5rem" : "1rem",
            marginBottom: "0.5rem",
             lineHeight: "1.2",
             fontWeight: "800",
             letterSpacing: "-0.5px",
             color: "black"

          }}>Ya tienes tu cuenta!</h3>
        <p style={{
            fontSize: isMobile ? "1.5rem" : "1rem",
            marginBottom: "0.5rem",
             lineHeight: "1.2",
             fontWeight: "800",
             letterSpacing: "-0.5px",
             color: "black"

          }}>Contacta al administrador (5533490175) para registrar tu primera aportación.</p>

        {/* 📱 WhatsApp */}
        <button
                style={primaryBtn}
                 onClick={() =>
                  window.open(
                    "https://wa.me/5215533490175?text=Hola%20quiero%20ahorrar%20...%20",
                    "_blank"
                  )
                }
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
                Contactar por WhatsApp
              </button>

        

      </div>
    </div>
  );
}

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
  width: "320px",
  textAlign: "center" as const,
};


const primaryBtn = {
  padding: "0.9rem 1.8rem",
  background: "linear-gradient(135deg, #22c55e, #358351)",
  color: "#022c22",
  border: "none",
  borderRadius: "12px",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(176, 240, 199, 0.35)",
  transition: "all 0.3s ease",
};