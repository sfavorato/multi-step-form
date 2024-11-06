import { ButtonHTMLAttributes } from "react";

type Props = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ text, ...props }) => {
  return <button {...props}>{text}</button>;
};
