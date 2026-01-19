// Design tokens
export const brandPalette = {
  primary: "#1d4ed8",
  accent: "#38bdf8",
  neutral: "#0f172a",
};

// Types
export type {
  KPI,
  BreadcrumbItem,
  TableColumn,
  FilterField,
  StatusVariant,
} from "./types";

// Components
export { KPICard, KPIStrip, KPIGrid } from "./components/KPICard";
export type { KPICardProps, KPIStripProps } from "./components/KPICard";

export { StatusBadge, RiskBadge, Pill } from "./components/StatusBadge";
export type { StatusBadgeProps, RiskBadgeProps, PillProps } from "./components/StatusBadge";

export { Panel, PanelHeader, DetailGrid, DetailItem } from "./components/Panel";
export type { PanelProps, PanelHeaderProps, DetailGridProps, DetailItemProps } from "./components/Panel";

export { Breadcrumbs, useBreadcrumbTrail } from "./components/Breadcrumbs";
export type { BreadcrumbsProps } from "./components/Breadcrumbs";

export { DataTable } from "./components/DataTable";
export type { DataTableProps } from "./components/DataTable";

export { FilterForm } from "./components/FilterForm";
export type { FilterFormProps } from "./components/FilterForm";

export { PageHeader } from "./components/PageHeader";
export type { PageHeaderProps } from "./components/PageHeader";
