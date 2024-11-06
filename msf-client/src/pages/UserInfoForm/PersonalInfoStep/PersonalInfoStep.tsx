import { Input, StepProps } from "../../../components";
import { FormContainer } from "../../../components/MultiStepForm";
import { ignoreTab } from "../../../utils";

export const PersonalInfoStep: React.FC<StepProps> = ({ initialValues }) => {
  return (
    <FormContainer>
      <Input
        label="First Name"
        name="firstName"
        defaultValue={initialValues?.firstName}
        required
        errorMessage="First Name is required"
      />
      <Input
        label="Last Name"
        name="lastName"
        defaultValue={initialValues?.lastName}
        required
        errorMessage="Last Name is required"
      />
      <Input
        label="Email"
        name="email"
        type="email" // TODO: Set a pattern to match backend validation
        required
        defaultValue={initialValues?.email}
        onKeyDown={ignoreTab}
        errorMessage="Please insert a valid email address"
      />
    </FormContainer>
  );
};
