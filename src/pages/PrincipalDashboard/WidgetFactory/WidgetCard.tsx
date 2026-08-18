//g import "../styles/WidgetCard.css";

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
}

export default function WidgetCard({
  title,
  children,
}: WidgetCardProps) {
  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3>{title}</h3>
      </div>

      <div className="widget-body">
        {children}
      </div>
    </div>
  );
}