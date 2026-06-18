import type {RfqStatus} from "../../mock-api";
import type {CURRENCIES} from "../constants/currencies.ts";

export type Currency = typeof CURRENCIES[number];

export interface Filters {
    currencyBase?: Currency;
    currencyQuote?: Currency;
    status?: RfqStatus;
    actionableOnly: boolean;
}