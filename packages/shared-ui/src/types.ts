import { ReactNode } from "react";

export interface KPI {
  label: string;
  value: string;
  delta?: string;
}

export interface BreadcrumbItem {
  label: string;
  to: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
}

export interface FilterField {
  id: string;
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export type StatusVariant =
  | "intake"
  | "verification"
  | "underwriting"
  | "approval"
  | "active"
  | "pending"
  | "revoked"
  | "low"
  | "medium"
  | "high";
