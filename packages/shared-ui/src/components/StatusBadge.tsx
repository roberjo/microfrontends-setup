import type { StatusVariant } from "../types";

export interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

export function StatusBadge({ status, variant, className = "" }: StatusBadgeProps) {
  const variantClass = variant || status.toLowerCase().replace(/\s+/g, "-");
  return (
    <span className={`status ${variantClass} ${className}`.trim()}>
      {status}
    </span>
  );
}

export interface RiskBadgeProps {
  risk: string;
  className?: string;
}

export function RiskBadge({ risk, className = "" }: RiskBadgeProps) {
  return (
    <span className={`risk ${risk.toLowerCase()} ${className}`.trim()}>
      {risk}
    </span>
  );
}

export interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className = "" }: PillProps) {
  return <span className={`pill ${className}`.trim()}>{children}</span>;
}
