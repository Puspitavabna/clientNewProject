import { FieldConfig, useField } from "formik";

type Props = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any> & {
    label?: string;
    classname?: string;
    placeholder: string;
  };

function TextInput({ label, classname, type, ...props }: Props) {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="font-semibold flex border-b border-b-[#373535]/50 pb-1 px-4 justify-between items-end  last:border-b-0 last:pb-0">
        {label && (
          <label htmlFor={label} className="text-[#373535] text-sm w-3/5">
            {label}
          </label>
        )}
        <input
          id={props?.id || ""}
          type={type}
          className={`w-2/5 text-sm py-2 px-2 border rounded-md focus:outline-none focus:border-blue-500 ${
            meta.touched && meta.error && "border-red-500"
          }`}
          {...field}
          {...props}
        />
      </div>
    </div>
  );
}

export default TextInput;
