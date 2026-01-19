import type { ReactNode } from "react";
import type { TableColumn } from "../types";

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  keyField: keyof T;
  compact?: boolean;
  className?: string;
}

export function DataTable<T>({
  columns,
  rows,
  keyField,
  compact = false,
  className = "",
}: DataTableProps<T>) {
  return (
    <table className={`data-table${compact ? " compact" : ""} ${className}`.trim()}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={String(row[keyField])}>
            {columns.map((col) => (
              <td key={String(col.key)} className={col.className}>
                {col.render
                  ? col.render(row)
                  : (row[col.key as keyof T] as ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
