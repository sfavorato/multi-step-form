import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  Children,
  FC,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from "react";
import { Button } from "../Button";
import { Switch } from "../Switch";
import { ReviewForm } from "./ReviewForm";
import { usePostUserInfo } from "../../hooks";

type Props = {
  storageKey: string;
  children: ReactNode;
};

export type StepProps = {
  initialValues?: Record<string, string>;
};

export type FormStorage = Record<
  string,
  { label: string | null; value: string | number }
>;

export const MultiStepForm: FC<Props> = ({ storageKey, children }) => {
  const [storage, setStorage] = useLocalStorage<FormStorage>(storageKey);
  const [currentPage, setCurrentPage] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [formData, setFormData] =
    useState<Record<string, FormDataEntryValue>>();
  const { mutate: postUserInfo } = usePostUserInfo({
    onSuccess: () => {
      // TODO: Handle error
      // TODO: Show success message
      // TODO: Configure isLoading and show/hide a spinner
    },
  });

  const pageCount = Children.count(children);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pageCount - 1;

  const elementWidth = 400;
  const gap = 20;

  const formSteps = Children.map(children, (child, index) => {
    if (!isValidElement<{ initialValues: StepProps }>(child)) {
      return null;
    }
    let initialValues = {};
    if (storage) {
      initialValues = Object.entries(storage).reduce((acc, [key, props]) => {
        acc[key] = props.value;
        return acc;
      }, {} as Record<string, string | number>);
    }
    return (
      <div
        key={`msf-step-${index}`}
        className={`transition-all w-full ${
          currentPage !== index ? "opacity-0" : ""
        } `}
        style={{
          minWidth: `${elementWidth}px`,
          transform: `translateX(-${currentPage * (elementWidth + gap)}px)`,
        }}
      >
        {cloneElement(child, { initialValues })}
      </div>
    );
  });

  return (
    <form
      noValidate
      onBlur={(event) => {
        const { name, value, ariaLabel: label } = event.target;
        if (Boolean(name)) {
          setStorage((prev) => {
            return { ...prev, [name]: { label, value } };
          });
        }
      }}
      onChange={(event) => {
        const form = event.currentTarget;
        setIsValid(form.checkValidity());
      }}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
          const fd = new FormData(form);
          const entries = Object.fromEntries(fd.entries());
          setIsReviewing(true);
          setFormData(entries);
        }
      }}
    >
      {/* Inputs */}
      <Switch
        condition={!isReviewing}
        fallback={
          <ReviewForm
            formData={storage}
            onBack={() => {
              setIsReviewing(false);
              setCurrentPage(0);
            }}
            onSubmit={() => {
              postUserInfo(formData);
              setIsReviewing(false);
              setCurrentPage(0);
              setStorage({});
            }}
          />
        }
      >
        <div
          className={`flex overflow-hidden w-${elementWidth}px`}
          style={{
            width: `${elementWidth}px`,
            gap: `${gap}px`,
          }}
        >
          {formSteps}
        </div>
        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            disabled={isFirstPage}
            text="Back"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setCurrentPage((prev) => prev - 1);
            }}
          />
          <Switch
            condition={!isLastPage}
            fallback={
              <Button text="Review" type="submit" disabled={!isValid} />
            }
          >
            <Button
              text="Next"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setCurrentPage((prev) => prev + 1);
              }}
            />
          </Switch>
        </div>
      </Switch>
    </form>
  );
};
