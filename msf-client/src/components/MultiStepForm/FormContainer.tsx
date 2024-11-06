import { PropsWithChildren } from "react";

export const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-4 h-full">{children}</div>;
};
