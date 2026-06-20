import type {Rfq} from "../types/rfq";
import {sortRfqs} from "./sortRfqs";

const baseRfq: Rfq = {
    id: "rfq-001",
    currencyPair: "GBP/USD",
    direction: "Buy",
    notional: 1_000_000,
    expiry: "2099-01-01",
    status: "Quoted",
    bid: 0.12,
    offer: 0.13,
    lastUpdated: "2026-01-01T10:00:00.000Z",
    sequenceNumber: 2,
};

test("sortRfqs sorts by last updated newest first without mutating input", () => {
    const oldest: Rfq = {
        ...baseRfq,
        id: "rfq-001",
        currencyPair: "EUR/USD",
        lastUpdated: "2026-01-01T10:00:00.000Z",
    };
    const newest: Rfq = {
        ...baseRfq,
        id: "rfq-002",
        currencyPair: "AUD/USD",
        lastUpdated: "2026-01-01T10:05:00.000Z",
    };
    const input = [oldest, newest];

    expect(sortRfqs(input, "Last Updated")).toEqual([newest, oldest]);
    expect(input).toEqual([oldest, newest]);
});