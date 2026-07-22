import "../styles/Sidebar.css";

interface Props{
    onAddWidget:(id:string)=>void;
}



export default function DashboardSidebar({onAddWidget}:Props){
    return(
        <aside className="sidebar">
            <h2>Widgets</h2>
            <button onClick={()=>onAddWidget("finanzas")}>
                📊 Finanzas
            </button>

            <button onClick={()=>onAddWidget("dispositivos")}>
                🖥 Dispositivos
            </button>
        </aside>
    );
}