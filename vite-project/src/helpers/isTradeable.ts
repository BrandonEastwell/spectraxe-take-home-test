import {isExpired} from "./isExpired";
import {Rfq} from "../types/rfq";

export function isTradeable(rfq: Rfq) {
    return rfq.status === "Quoted" && rfq.bid && rfq.offer && !isExpired(rfq.expiry);
}