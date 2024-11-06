type Props = {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const Switch: React.FC<Props> = ({ children, condition, fallback }) => {
  return <>{condition ? children : fallback ?? null}</>;
};
