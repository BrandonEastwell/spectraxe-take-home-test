import {isExpired} from "./isExpired";
import type {Rfq} from "../types/rfq.ts";

export function isTradeable(rfq: Rfq): boolean {
    return rfq.status === "Quoted" && rfq.bid !== undefined && rfq.offer !== undefined && !isExpired(rfq.expiry);
}