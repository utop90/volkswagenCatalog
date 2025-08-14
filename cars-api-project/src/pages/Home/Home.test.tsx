import Home from "./Home";
import { Provider } from "react-redux";
import { store } from "reduxStore/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme/theme";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

// Reusable Provider wrapper
const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

describe("Home Page - Integration test", () => {
  it("renders the top bar with logo, title, and control panel buttons", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    await waitFor(() => {
      expect(screen.getByAltText(/Volkswagen Logo/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Volkswagen Catalog/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add Car/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Filter Cars/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sort Cars/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reset Cars/i })
    ).toBeInTheDocument();
  });

  it("renders the car cards correctly", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    const cards = await screen.findAllByTestId("car-card");

    expect(
      cards.every((card) => card.textContent?.trim().startsWith("Volkswagen"))
    ).toBe(true);
    expect(cards).toHaveLength(8);
  });

  it("opens Filter Cars popover, waits for Year Range select, and shows options after clicking it", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    await screen.findAllByTestId("car-card");

    fireEvent.click(screen.getByRole("button", { name: /Filter Cars/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Year Range/i)).toBeInTheDocument();
    });

    const yearRangeSelect = screen.getByLabelText(/Year Range/i);

    fireEvent.mouseDown(yearRangeSelect);

    await waitFor(() => {
      expect(screen.getByText(/2020\s*-\s*2024/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/2010\s*-\s*2019/i)).toBeInTheDocument();
    expect(screen.getByText(/Up to 2009/i)).toBeInTheDocument();
  });

  it("opens Sort Cars popover and shows all sort options", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    await screen.findAllByTestId("car-card");

    fireEvent.click(screen.getByRole("button", { name: /Sort Cars/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Alphabetical by Model \(A-Z\)/i })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /Old → New \(Year\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /New → Old \(Year\)/i })
    ).toBeInTheDocument();
  });

  it("opens car details modal when clicking a card and displays mandatory content", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    const cards = await screen.findAllByTestId("car-card");
    const firstCard = cards[0];
    const carName = firstCard.textContent?.trim().split("\n")[0];

    fireEvent.click(firstCard);

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(`Details For ${carName}`, "i"))
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/model/i)).toBeInTheDocument();
    expect(screen.getByText(/year/i)).toBeInTheDocument();
  });

  it("opens Add New Car modal, fills required fields, clicks Add Car and modal closes", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    fireEvent.click(screen.getByRole("button", { name: /Add Car/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Photo Url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Car/i })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Model/i), {
      target: { value: "Mock Car" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "2023" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Car/i }));

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByLabelText(/Model/i)).not.toBeInTheDocument();
    });
  });

  it("opens Edit Car modal, edits the model, saves changes, and verifies updated card is shown", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    const cards = await screen.findAllByTestId("car-card");
    const firstCard = cards[0];
    const originalModel = firstCard.textContent?.trim().split("\n")[0];

    const editButtons = screen.getAllByTestId("edit-car-btn");
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Edit Car/i)).toBeInTheDocument();
    });

    const modelInput = screen.getByLabelText(/Model/i) as HTMLInputElement;
    fireEvent.change(modelInput, {
      target: { value: `${originalModel} edited` },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Edit Car/i)).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(new RegExp(`${originalModel} edited`, "i"))
    ).toBeInTheDocument();
  });

  it("removes a car when clicking the remove button", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    const cards = await screen.findAllByTestId("car-card");
    const firstCard = cards[0];
    const carName = firstCard.textContent?.trim().split("\n")[0];

    const removeButtons = screen.getAllByTestId("delete-car-btn");
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(
        screen.queryByText(new RegExp(`^${carName}$`, "i"))
      ).not.toBeInTheDocument();
    });
  });

  it("navigates between pages using pagination icons and shows correct cards", async () => {
    render(<Home />, { wrapper: ProviderWrapper });

    const firstPageCards = await screen.findAllByTestId("car-card");
    const firstPageNames = firstPageCards.map(
      (card) => card.textContent?.trim().split("\n")[0]
    );

    // Navigate to forward page
    fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));

    await waitFor(() => {
      const secondPageNames = screen
        .getAllByTestId("car-card")
        .map((card) => card.textContent?.trim().split("\n")[0]);
      expect(secondPageNames).not.toEqual(firstPageNames);
    });

    // Navigate to previous page
    fireEvent.click(screen.getByTestId("KeyboardArrowLeftIcon"));

    await waitFor(() => {
      const backToFirstPageNames = screen
        .getAllByTestId("car-card")
        .map((card) => card.textContent?.trim().split("\n")[0]);
      expect(backToFirstPageNames).toEqual(firstPageNames);
    });
  });
});
