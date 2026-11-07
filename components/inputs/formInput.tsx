import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

type BaseProps = {
  id: string;
  label: string;
  icon: ReactNode;
};

type InputProps = BaseProps & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "children" | "className"
> & {
  options?: never;
};

type SelectProps = BaseProps & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "children" | "className"
> & {
  options: string[];
  placeholder?: string;
};

type FormInputProps = InputProps | SelectProps;

export default function FormInput(props: FormInputProps) {
  const { id, label, icon, ...controlProps } = props;
  const fieldClassName =
    "min-w-0 flex-1 bg-transparent px-4 py-3 font-manrope text-sm text-white placeholder:text-gray-500 focus:outline-none";

  let field: ReactNode;

  if (controlProps.options !== undefined) {
    const {
      options,
      placeholder,
      defaultValue,
      ...selectProps
    } = controlProps;

    field = (
      <select
        id={id}
        {...selectProps}
        defaultValue={
          controlProps.value === undefined ? (defaultValue ?? (placeholder ? "" : undefined)) : undefined
        }
        className={`${fieldClassName} [color-scheme:dark]`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    field = (
      <input
        id={id}
        {...controlProps}
        inputMode={controlProps.inputMode ?? (controlProps.type === "number" ? "decimal" : undefined)}
        className={fieldClassName}
      />
    );
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-manrope text-sm font-medium text-gray-200"
      >
        {label}
      </label>
      <div className="group flex w-full overflow-hidden rounded-xl border border-[#294556] bg-[#071923] transition-colors hover:border-[#40718a] focus-within:border-[#00a8e8] focus-within:ring-2 focus-within:ring-[#00a8e8]/20">
        <span
          aria-hidden="true"
          className="flex w-12 shrink-0 items-center justify-center border-r border-[#294556] bg-[#0d2938] text-[#65c8ed] transition-colors group-focus-within:text-white"
        >
          {icon}
        </span>
        {field}
      </div>
    </div>
  );
}
