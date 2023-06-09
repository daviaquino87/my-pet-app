import { fireEvent, render, screen } from "@testing-library/react";
import { Calendar } from ".";

test("render Calendar correctly", () => {
  render(<Calendar />);

  expect(screen.getByText("Dom")).toBeInTheDocument();
  expect(screen.getByText("Seg")).toBeInTheDocument();
  expect(screen.getByText("Ter")).toBeInTheDocument();
  expect(screen.getByText("Qua")).toBeInTheDocument();
  expect(screen.getByText("Qui")).toBeInTheDocument();
  expect(screen.getByText("Sex")).toBeInTheDocument();
  expect(screen.getByText("Sáb")).toBeInTheDocument();
});

test("onChange callback", () => {
  const onChange = jest.fn();

  render(<Calendar onChange={onChange} />);

  fireEvent.click(screen.getByRole("button", { name: /Jun 03 2023/i }));
  expect(onChange).toHaveBeenCalled();
  expect(onChange.mock.calls).toHaveLength(1);
});
