import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserInfoForm } from "./UserInfoForm";

const getRender = () => {
  return render(<UserInfoForm />);
};

describe("UserInfoForm", () => {
  test("render", () => {
    getRender();
    expect(screen.getByText("First Name")).toBeInTheDocument();
  });

  describe("email validation", () => {
    // TODO: test more email scenarios
    test("shows invalid email message", () => {
      getRender();
      const input = screen.getByLabelText("Email");
      fireEvent.change(input, { target: { value: "invalid-email" } });
      expect(
        screen.queryByText("Please insert a valid email address")
      ).toBeInTheDocument();
    });

    test("hide invalid email message for valid email", async () => {
      getRender();
      const input = screen.getByLabelText("Email");

      fireEvent.change(input, {
        target: { value: "valid.email@test.com" },
      });
      expect(
        screen.queryByText("Please insert a valid email address")
      ).toBeFalsy();
    });
  });

  describe("form steps", () => {
    // TODO: Add tests to submit
    test("change button label to submit", () => {
      getRender();
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    test("disable back button in first step", () => {
      getRender();
      const backButton = screen.getByText("Back").closest("button");
      expect(backButton).toBeDisabled();
    });

    test("enables back in next steps", async () => {
      getRender();
      const nextButton = screen.getByText("Next");

      fireEvent.click(nextButton);

      await waitFor(() => {
        const backButton = screen.getByText("Back").closest("button");
        return expect(backButton).not.toBeDisabled();
      });
    });
  });
});
