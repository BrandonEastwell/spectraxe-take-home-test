import {getLastUpdatedText} from "../helpers/getLastUpdatedInSeconds.ts";
import {RFQCardRow} from "./RFQCardRow.tsx";
import {isTradeable} from "../helpers/isTradeable.ts";
import type {Rfq} from "../types/rfq.ts";
import {isStale} from "../helpers/isStale.ts";

interface RFQCardProps {
    rfq: Rfq;
    accepting: boolean;
    onAccept: (rfq: Rfq) => void;
}

export function RFQCard({ rfq, accepting, onAccept }: RFQCardProps) {

    return (
        <article
             aria-labelledby={`rfq-${rfq.id}-heading`}
             className={"rfq-card bg-surface flex flex-col gap-2 p-2 border rounded-lg " + (isStale(rfq.lastUpdated) ? "border-warning" : "border-border")}>
            <div className="flex flex-row justify-between mb-3">
                <h2 id={`rfq-${rfq.id}-heading`} className="font-semibold">{rfq.currencyPair}</h2>
                <span aria-label={`Status: ${rfq.status}`}>{rfq.status}</span>
            </div>
            <RFQCardRow>
                <span>{rfq.direction}</span>
                <span>{rfq.notional.toLocaleString()}</span>
            </RFQCardRow>
            <div>
                <RFQCardRow>
                    <span>Bid</span>
                    <span>{rfq.bid ? rfq.bid : "-"}</span>
                </RFQCardRow>
                <RFQCardRow>
                    <span>Offer</span>
                    <span>{rfq.offer ? rfq.offer : "-"}</span>
                </RFQCardRow>
            </div>
            <div>
                <RFQCardRow>
                    <span>Expiry</span>
                    <span>{rfq.expiry}</span>
                </RFQCardRow>
                <RFQCardRow>
                    <span>Updated</span>
                    <span aria-live="polite">{getLastUpdatedText(rfq.lastUpdated)}</span>
                </RFQCardRow>
                <RFQCardRow>
                    <span>Seq</span>
                    <span>{rfq.sequenceNumber}</span>
                </RFQCardRow>
            </div>
            <button disabled={!isTradeable(rfq) || accepting}
                    type="button"
                    onClick={() => onAccept(rfq)}
                    aria-label={`Accept quote for ${rfq.currencyPair}`}
                    className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 not-disabled:cursor-pointer disabled:opacity-50">
                {accepting ? "Accepting..." : "Accept Quote"}
            </button>
        </article>
    )
}
