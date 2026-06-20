import type {Filters} from "../types/filters.ts";
import type {Rfq} from "../types/rfq.ts";
import {isTradeable} from "./isTradeable.ts";

export function filterRfqs(rfqs: Rfq[], filters: Filters): Rfq[] {
    return rfqs.filter((rfq) => {
        if (filters.actionableOnly && !isTradeable(rfq)) return false;
        if (filters.currencyQuote && filters.currencyBase && (filters.currencyBase + "/" + filters.currencyQuote) !== rfq.currencyPair) return false;
        if (filters.status && rfq.status !== filters.status) return false;
        return true;
    });
}
