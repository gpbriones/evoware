interface SidebarProps {
    onAddWidget: (id: string) => void;
}

export default function SidebarWidgets({
    onAddWidget
}: SidebarProps) {
    return (
        <aside className="sidebar">
            <h3>Widgets</h3>
            <button onClick={() => onAddWidget("finanzas")}>
                📊 Finanzas
            </button>
            <button onClick={() => onAddWidget("dispositivos")}>
                🖥 Dispositivos
            </button>
        </aside>
    );
}