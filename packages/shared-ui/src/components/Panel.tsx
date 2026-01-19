import type { ReactNode } from "react";

export interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className = "" }: PanelProps) {
  return <section className={`panel ${className}`.trim()}>{children}</section>;
}

export interface PanelHeaderProps {
  title: string;
  titleLevel?: "h2" | "h3";
  actions?: ReactNode;
  badge?: ReactNode;
}

export function PanelHeader({
  title,
  titleLevel = "h2",
  actions,
  badge,
}: PanelHeaderProps) {
  const TitleTag = titleLevel;
  return (
    <div className="panel-header">
      <TitleTag>{title}</TitleTag>
      {badge}
      {actions}
    </div>
  );
}

export interface DetailGridProps {
  children: ReactNode;
  className?: string;
}

export function DetailGrid({ children, className = "" }: DetailGridProps) {
  return <div className={`detail-grid ${className}`.trim()}>{children}</div>;
}

export interface DetailItemProps {
  label: string;
  value: ReactNode;
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="detail-label">{label}</p>
      <strong>{value}</strong>
    </div>
  );
}
