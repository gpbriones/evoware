// types.ts
export type StepStatus = "completed" | "active" | "pending";

export type Step = {
  title: string;
  description: string;
  status?: StepStatus; // opcional para servicios
  whatsapp?: boolean;
  icon?: string;
  escrow?: boolean;
};