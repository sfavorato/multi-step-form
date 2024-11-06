import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { Switch } from "../Switch";

type Props = {
  name: string;
  className?: string;
  inputClassName?: string;
  id?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  onChange?: (value: string) => void;
} & (InputProps | TextAreaProps);

type InputProps = {
  as?: "input";
} & InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = {
  as?: "textarea";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input: React.FC<Props> = ({
  id,
  name,
  label,
  as = "input",
  type = "text",
  className = "",
  inputClassName = "",
  errorMessage,
  onChange,
  ...props
}) => {
  const [error, setError] = useState(false);

  if (!id) {
    id = name;
  }

  const componentClassName = `w-full px-2 py-1 m-0 box-border resize-none ${inputClassName}`;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(!event.target.checkValidity());
    onChange?.(event.target.value);
  };

  return (
    <div className={`flex flex-col items-start w-full ${className}`}>
      <Switch condition={Boolean(label)}>
        <label className="font-bold" htmlFor={id}>
          {label}
        </label>
      </Switch>
      {as === "input" ? (
        <input
          id={id}
          name={name}
          type={type}
          aria-label={label}
          onChange={handleChange}
          className={componentClassName}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      ) : (
        <textarea
          id={id}
          name={name}
          aria-label={label}
          onChange={handleChange}
          className={componentClassName}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}
      <Switch condition={error}>
        <p className="text-red text-sm m-0">{errorMessage}</p>
      </Switch>
    </div>
  );
};
