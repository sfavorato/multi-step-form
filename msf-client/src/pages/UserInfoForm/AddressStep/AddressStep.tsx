import { Input, StepProps } from "../../../components";
import { ComboBox } from "../../../components/ComboBox";
import { FormContainer } from "../../../components/MultiStepForm";
import { PreferredTime } from "../../../types";

export const AddressStep: React.FC<StepProps> = ({ initialValues }) => {
  return (
    <FormContainer>
      <Input
        label="Delivery Address"
        name="deliveryAddress"
        required
        errorMessage="Delivery Address is required"
        defaultValue={initialValues?.deliveryAddress}
      />
      <ComboBox name="preferredTime" options={Object.values(PreferredTime)} />
      <Input
        label="Special Instructions"
        name="specialInstructions"
        as="textarea"
        className="h-full"
        inputClassName="flex-1"
        defaultValue={initialValues?.specialInstructions}
      />
    </FormContainer>
  );
};
