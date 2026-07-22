type HeroMenuProps = { loaded: boolean };

export default function HeroMenu({ loaded }: HeroMenuProps) {
  const sections = [
    "Tecnología",
    "Hogar",
    "Deportes",
    "Impresión 3D",
    "Automatización",
    "Soporte IT",
    "Paneles Solares",
  ];

  return (
    <div className="hero-menu-section">
      <div className="menu-row">
        {sections.map((name, idx) => (
          <button
            key={name}
            className={`menu-card ghost-button ${loaded ? "fade-slide-in" : ""}`}
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}