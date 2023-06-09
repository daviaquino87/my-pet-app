import { render, screen } from "@testing-library/react";
import { GlobalLoader } from ".";

test("render GlobalLoader correctly", () => {
  render(<GlobalLoader />);
  expect(screen.getByTestId("global-loader")).toBeInTheDocument();
});
