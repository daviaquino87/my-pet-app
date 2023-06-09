import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { AuthPage } from ".";
import { AuthPageTypeEnum } from "./auth-page.enum";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

function renderLogin() {
  return render(
    <MemoryRouter>
      <ChakraProvider>
        <AuthPage type={AuthPageTypeEnum.LOGIN} />
      </ChakraProvider>
    </MemoryRouter>
  );
}

describe("Login page", () => {
  test("render login page", () => {
    renderLogin();

    expect(
      screen.queryByTestId("auth-form-name-field")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("auth-form-email-field")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-password-field")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(screen.getByText(/Criar uma conta/i)).toBeInTheDocument();
  });

  test("show required errors onClick to login", async () => {
    renderLogin();

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(screen.getByTestId("form-error-email")).toHaveTextContent(
        /Campo obrigatório/i
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("form-error-password")).toHaveTextContent(
        /Campo obrigatório/i
      );
    });
  });

  test("show minLength errors onClick to login", async () => {
    renderLogin();

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    fireEvent.change(screen.getByTestId("auth-form-password-field"), {
      target: {
        value: "123",
      },
    });

    await waitFor(() => {
      expect(screen.getByTestId("form-error-password")).toHaveTextContent(
        /Nome deve ter pelo menos/i
      );
    });
  });

  // TODO: add mock api to test valid form and loaders
});
