import type { InputHTMLAttributes } from "react";
import { FiCheck } from "react-icons/fi";

type CheckboxInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "className"
> & {
  id: string;
  label: string;
  className?: string;
};

export default function CheckboxInput({
  id,
  label,
  className = "",
  ...inputProps
}: CheckboxInputProps) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 ${className}`}
    >
      <input id={id} type="checkbox" {...inputProps} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center rounded border border-[#65c8ed] text-white transition-colors peer-checked:border-[#00a8e8] peer-checked:bg-[#00a8e8] peer-checked:[&>svg]:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#00a8e8]"
      >
        <FiCheck size={15} className="opacity-0 transition-opacity" />
      </span>
      <span className="font-manrope text-sm text-gray-200">{label}</span>
    </label>
  );
}
