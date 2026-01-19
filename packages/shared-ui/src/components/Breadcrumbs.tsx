import { Link } from "react-router-dom";
import type { BreadcrumbItem } from "../types";

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav className={`mfe-breadcrumbs ${className}`.trim()} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.to}-${index}`}>
          {index > 0 && <span className="crumb-sep">/</span>}
          {index < items.length - 1 ? (
            <Link className="crumb-link" to={item.to}>
              {item.label}
            </Link>
          ) : (
            <span className="crumb-current" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function useBreadcrumbTrail(
  rootLabel: string,
  pathname: string,
  routes: Record<string, { label: string; parentPath?: string }>
): BreadcrumbItem[] {
  const parts = pathname.split("/").filter(Boolean);
  const trail: BreadcrumbItem[] = [{ label: rootLabel, to: "/" }];

  if (parts.length >= 2 && routes[parts[0]]) {
    const route = routes[parts[0]];
    if (route.parentPath) {
      trail.push({ label: route.label, to: route.parentPath });
    }
    trail.push({ label: parts[1], to: `/${parts[0]}/${parts[1]}` });
  }

  return trail;
}
