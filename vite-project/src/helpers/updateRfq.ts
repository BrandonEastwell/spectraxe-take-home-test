import type {QuoteUpdate, Rfq} from "../types/rfq.ts";
import {TERMINAL_STATUSES} from "../constants/terminalStatuses.ts";

/**
 * If the update is for a terminal status, we want to keep the existing status.
 * If the update is for a non-terminal status, we want to update the status.
 * If the update is for a status that is not terminal, we want to keep the existing status.
 */
export function updateRfq(rfq: Rfq, update: QuoteUpdate): Rfq {
    if (rfq.id !== update.rfqId || update.sequenceNumber <= rfq.sequenceNumber) {
        return rfq;
    }

    const hasTerminalStatus = TERMINAL_STATUSES.includes(rfq.status);
    return {
        ...rfq,
        bid: update.bid ?? rfq.bid,
        offer: update.offer ?? rfq.offer,
        status: hasTerminalStatus && update.status !== undefined ? rfq.status : update.status ?? rfq.status,
        lastUpdated: update.lastUpdated,
        sequenceNumber: update.sequenceNumber,
    }
}
