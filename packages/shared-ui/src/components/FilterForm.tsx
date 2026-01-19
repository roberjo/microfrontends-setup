import type { FormEvent } from "react";
import type { FilterField } from "../types";

export interface FilterFormProps {
  fields: FilterField[];
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
  className?: string;
}

export function FilterForm({
  fields,
  onSubmit,
  onReset,
  className = "",
}: FilterFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form className={`filter-form ${className}`.trim()} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.id} className="field">
          <label htmlFor={field.id}>{field.label}</label>
          {field.type === "select" ? (
            <select id={field.id} name={field.id}>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              name={field.id}
              type="text"
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      <div className="form-actions">
        <button type="button" className="ghost" onClick={onReset}>
          Reset
        </button>
        <button type="submit">Apply Filters</button>
      </div>
    </form>
  );
}
