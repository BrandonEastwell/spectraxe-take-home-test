import type {QuoteUpdate, Rfq} from "../types/rfq.ts";
import {updateRfq} from "./updateRfq.ts";

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

describe("updateRfq", () => {
    test("updateRfq ignores stale sequence numbers", () => {
        const staleUpdate: QuoteUpdate = {
            rfqId: "rfq-001",
            status: "Accepted",
            lastUpdated: "2026-01-01T10:01:00.000Z",
            sequenceNumber: 2,
        };

        expect(updateRfq(baseRfq, staleUpdate)).toBe(baseRfq);
    });

    test("updateRfq preserves terminal status from later stream status updates", () => {
        const acceptedRfq: Rfq = {
            ...baseRfq,
            status: "Accepted",
            sequenceNumber: 3,
        };
        const lateQuotedUpdate: QuoteUpdate = {
            rfqId: "rfq-001",
            status: "Quoted",
            bid: 0.2,
            offer: 0.21,
            lastUpdated: "2026-01-01T10:02:00.000Z",
            sequenceNumber: 4,
        };

        expect(updateRfq(acceptedRfq, lateQuotedUpdate)).toEqual({
            ...acceptedRfq,
            bid: 0.2,
            offer: 0.21,
            status: "Accepted",
            lastUpdated: "2026-01-01T10:02:00.000Z",
            sequenceNumber: 4,
        });
    });
})

