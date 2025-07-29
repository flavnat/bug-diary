import React from "react";

export default function FormField({
  type,
  label,
  id,
  value,
  onChange,
  placeholder,
  rows,
  options,
  required,
  onBlur,
  error,
}) {
  const baseStyle = `border p-2 text-sm w-full outline-none placeholder:text-xs
    ${error ? "border-red-500 focus:border-red-500" : "border-zinc-300 focus:border-zinc-600"}
    transition-colors`;

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "text" && (
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={baseStyle}
          required={required}
        />
      )}

      {type === "textarea" && (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows || 4}
          className={baseStyle}
          required={required}
        />
      )}

      {type === "select" && Array.isArray(options) && (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={baseStyle}
          required={required}
        >
          <option value="">Select severity</option>
          {options.map((opt) => (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {type === "tags" && (
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || "Comma-separated tags"}
          className={baseStyle}
          required={required}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}