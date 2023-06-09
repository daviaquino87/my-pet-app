import { UseToastOptions, useToast as useToastUI } from "@chakra-ui/react";

const TOAST_DURATION = 1400;

export function useToast() {
  const toastUI = useToastUI();
  const success = ({ title, ...options }: UseToastOptions) => {
    toastUI({
      ...options,
      title,
      status: "success",
      duration: TOAST_DURATION,
    });
  };

  const error = ({ title, ...options }: UseToastOptions) => {
    toastUI({
      ...options,
      title,
      status: "error",
      duration: TOAST_DURATION,
    });
  };

  const toast = {
    success,
    error,
  };

  return toast;
}
