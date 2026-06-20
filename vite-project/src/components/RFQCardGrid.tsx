import type {Rfq} from "../types/rfq.ts";
import {LoadingSpinner} from "./LoadingSpinner.tsx";
import {RFQCard} from "./RFQCard.tsx";

interface RFQCardGridProps {
    loading: boolean;
    rfqs: Rfq[];
    acceptingRfqId: string | undefined;
    onAccept: (rfq: Rfq) => void;
}

export function RFQCardGrid({ loading, rfqs, acceptingRfqId, onAccept }: RFQCardGridProps) {
    if (loading) {
        return <div className="flex min-h-80 place-self-center place-items-center"><LoadingSpinner /></div>;
    }

    if (rfqs.length === 0) {
        return <p className="p-8 text-center">No quotes match the current filters.</p>;
    }

    return (
        <div className="grid grid-cols-[1fr_1fr] w-full gap-4" aria-label="Quote cards">
            { rfqs.map((rfq) => (
                <RFQCard
                    key={rfq.id}
                    rfq={rfq}
                    accepting={acceptingRfqId === rfq.id}
                    onAccept={onAccept}
                />
            ))}
        </div>
    );
}
