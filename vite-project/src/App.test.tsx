import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.tsx";
import {__resetMockApi} from "../mock-api";

beforeEach(() => {
    __resetMockApi({
        fetchDelayMs: 0,
        updateIntervalMs: 0,
        acceptFailureRate: 0,
        acceptAlwaysFailIds: [],
    });
});

function getQuoteTable() {
    return screen.getByRole("table", { name: /live quote requests/i });
}

async function waitForLoadedRfqs() {
    await screen.findAllByText("GBP/USD");
}

test("RFQs render after loading", async () => {
    render(<App />);

    expect(screen.getByText("Loading live quotes.")).toBeInTheDocument();
    await waitForLoadedRfqs();

    expect(screen.getAllByText("GBP/USD").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AUD/USD").length).toBeGreaterThan(0);
});

test('"Actionable only" filter hides non-tradeable RFQs', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForLoadedRfqs();

    await user.click(screen.getByRole("button", { name: /show filters/i }));
    await user.click(screen.getByRole("checkbox", { name: /actionable only/i }));
    await user.click(screen.getByRole("button", { name: /apply filters/i }));

    const table = getQuoteTable();
    await waitFor(() => {
        expect(within(table).queryByRole("rowheader", { name: "USD/JPY" })).not.toBeInTheDocument();
        expect(within(table).queryByRole("rowheader", { name: "EUR/GBP" })).not.toBeInTheDocument();
    });
    expect(within(table).getByRole("rowheader", { name: "GBP/USD" })).toBeInTheDocument();
    expect(within(table).getByRole("rowheader", { name: "AUD/USD" })).toBeInTheDocument();
});

test("accept is disabled for non-tradeable RFQs", async () => {
    render(<App />);
    await waitForLoadedRfqs();

    const usdJpyAcceptButtons = screen.getAllByRole("button", { name: /accept quote for USD\/JPY/i });
    expect(usdJpyAcceptButtons.length).toBeGreaterThan(0);
    usdJpyAcceptButtons.forEach((button) => {
        expect(button).toBeDisabled();
    });
});

test("accepting a tradeable RFQ opens confirmation modal", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForLoadedRfqs();

    const gbpUsdAcceptButton = screen.getAllByRole("button", { name: /accept quote for GBP\/USD/i })
        .find((button) => !button.hasAttribute("disabled"));

    expect(gbpUsdAcceptButton).toBeDefined();
    await user.click(gbpUsdAcceptButton!);

    expect(screen.getByRole("dialog", { name: /accept quote/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirm accept/i })).toBeInTheDocument();
});

test("successful accept updates RFQ status", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForLoadedRfqs();

    const gbpUsdAcceptButton = screen.getAllByRole("button", { name: /accept quote for GBP\/USD/i })
        .find((button) => !button.hasAttribute("disabled"));

    expect(gbpUsdAcceptButton).toBeDefined();
    await user.click(gbpUsdAcceptButton!);
    await user.click(screen.getByRole("button", { name: /confirm accept/i }));

    expect(await screen.findByText("GBP/USD quote accepted.")).toBeInTheDocument();
    await waitFor(() => {
        expect(screen.getAllByText("Accepted").length).toBeGreaterThan(0);
    });
});

test("sorting by currency pair works", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForLoadedRfqs();

    await user.selectOptions(screen.getByLabelText(/sort by/i), "Currency Pair");

    const table = getQuoteTable();
    const rowHeaders = within(table).getAllByRole("rowheader").map((header) => header.textContent);
    expect(rowHeaders).toEqual([
        "AUD/USD",
        "EUR/GBP",
        "EUR/USD",
        "EUR/USD",
        "GBP/USD",
        "USD/CAD",
        "USD/JPY",
    ]);
});
