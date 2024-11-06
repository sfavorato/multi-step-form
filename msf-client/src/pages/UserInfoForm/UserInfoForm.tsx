import { MultiStepForm } from "../../components";
import { AddressStep } from "./AddressStep/AddressStep";
import { PersonalInfoStep } from "./PersonalInfoStep";

export const UserInfoForm = () => {
  return (
    <div className="bg-[#242424] p-20 rounded-2">
      <MultiStepForm storageKey="userInfo">
        <PersonalInfoStep />
        <AddressStep />
        {/* <AdditionalInfoStep /> */}
      </MultiStepForm>
    </div>
  );
};
