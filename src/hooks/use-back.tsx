import { useNavigate } from "react-router-dom";

export function useBack() {
  const navigate = useNavigate();

  return () => {
    navigate(-1);
  };
}
