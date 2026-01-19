import type { KPI } from "../types";

export interface KPICardProps extends KPI {
  className?: string;
}

export function KPICard({ label, value, delta, className = "" }: KPICardProps) {
  return (
    <article className={`kpi-card ${className}`.trim()}>
      <p className="kpi-label">{label}</p>
      <div className="kpi-row">
        <span className="kpi-value">{value}</span>
        {delta && <span className="kpi-delta">{delta}</span>}
      </div>
    </article>
  );
}

export interface KPIStripProps {
  kpis: KPI[];
  className?: string;
}

export function KPIStrip({ kpis, className = "" }: KPIStripProps) {
  return (
    <section className={`kpi-strip ${className}`.trim()}>
      {kpis.map((kpi) => (
        <KPICard key={kpi.label} {...kpi} />
      ))}
    </section>
  );
}

export function KPIGrid({ kpis, className = "" }: KPIStripProps) {
  return (
    <section className={`kpi-grid ${className}`.trim()}>
      {kpis.map((kpi) => (
        <KPICard key={kpi.label} {...kpi} />
      ))}
    </section>
  );
}
