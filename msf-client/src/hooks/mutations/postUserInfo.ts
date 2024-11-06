import { useMutation } from "@tanstack/react-query";
import { apiUrl } from "../../utils";

type Props = {
  onSuccess: (data: any) => void;
};

export const usePostUserInfo = ({ onSuccess }: Props) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${apiUrl}/user-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess,
  });
};
