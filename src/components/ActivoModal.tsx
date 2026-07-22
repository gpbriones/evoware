import type { ReactNode } from "react";

interface ActivoModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ActivoModal({
  open,
  onClose,
  children
}: ActivoModalProps) {

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        {children}

      </div>
    </div>
  );
}