type Props = {
  options: string[];
  name: string;
  initialValue?: string;
};

// TODO: add a label and adjust the styles
export const ComboBox: React.FC<Props> = ({ options, initialValue, name }) => {
  return (
    <select defaultValue={initialValue} name={name}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
