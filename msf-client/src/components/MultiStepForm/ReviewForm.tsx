import { Button } from "../Button";
import { FormStorage } from "./MultiStepForm";

type Props = {
  formData: FormStorage;
  onBack: VoidFunction;
  onSubmit: VoidFunction;
};

export const ReviewForm: React.FC<Props> = ({ formData, onBack, onSubmit }) => {
  return (
    <div>
      <h2 className="font-bold">Review your info</h2>
      <div className="text-left">
        {Object.entries(formData).map(([key, { label, value }]) => (
          <div key={key}>
            <span className="font-bold">{label}</span>: {value}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button text="Edit" onClick={onBack} />
        <Button text="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
};
