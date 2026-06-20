import type {Rfq} from "../types/rfq.ts";
import type {Sort} from "../types/sort.ts";

export function sortRfqs(rfqs: Rfq[], sortOrder: Sort | undefined): Rfq[] {
    return [...rfqs].sort((rfq1, rfq2) => {
        if (sortOrder === "Currency Pair") return rfq1.currencyPair.localeCompare(rfq2.currencyPair);
        if (sortOrder === "Last Updated") {
            if (rfq1.lastUpdated === undefined || rfq2.lastUpdated === undefined) return 0;
            return new Date(rfq2.lastUpdated).getTime() - new Date(rfq1.lastUpdated).getTime();
        }
        return 0;
    });
}
