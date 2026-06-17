import {
    fetchRfqs,
    subscribeToQuoteUpdates,
} from '../mock-api';
import {useEffect, useState} from "react";
import {RFQCardRow} from "./components/RFQCardRow.tsx";
import type {Rfq} from "./types/rfq.ts";
import {isTradeable} from "./helpers/isTradeable.ts";

function getLastUpdatedInSeconds(ISOString: string | undefined) {
    if (!ISOString) return "-";
    const date = new Date(ISOString);
    const timeNow = new Date();
    const diff = timeNow.getTime() - date.getTime();
    return Math.floor(diff / 1000);
}

function App() {
    const [loading, setLoading] = useState(true);
    const [rfqs, setRfqs] = useState<Rfq[]>([]);

    useEffect(() => {
        const initRFQS = async () => {
            const rfqs: Rfq[] = await fetchRfqs();
            setRfqs(rfqs);
            setLoading(false);

            // const unsubscribe = subscribeToQuoteUpdates((update) => {
            //     console.log('live update', update);
            // });
        }

        initRFQS();
    }, [])


    return (
        <main className="min-h-screen bg-background text-text-primary">
            { loading ? <div>Loading...</div> :
            <section className="grid grid-cols-3 p-2 gap-4">
                { rfqs.map((rfq) => (
                    <div key={rfq.id} className={"rfq-card bg-surface flex flex-col gap-2 p-2 w-full aspect-square border rounded-lg " + (Number(getLastUpdatedInSeconds(rfq.lastUpdated)) > 30 ? "border-warning" : "border-border")}>
                        <div className="flex flex-row justify-between mb-3">
                            <span>{rfq.currencyPair}</span>
                            <span>{rfq.status}</span>
                        </div>
                        <RFQCardRow>
                            <span>{rfq.direction}</span>
                            <span>{rfq.notional}</span>
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
                                <span>{rfq.lastUpdated ? getLastUpdatedInSeconds(rfq.lastUpdated) + "s ago" : "-"}</span>
                            </RFQCardRow>
                            <RFQCardRow>
                                <span>Seq</span>
                                <span>{rfq.sequenceNumber}</span>
                            </RFQCardRow>
                        </div>
                        <button disabled={isTradeable(rfq)}
                            className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 cursor-pointer">
                            Accept Quote
                        </button>
                    </div>
                ))}
            </section> }
        </main>

    )
}

export const statusClasses = {
    Open: "bg-status-open",
    Quoted: "bg-status-quoted",
    Accepted: "bg-status-accepted",
    Rejected: "bg-status-rejected",
    Expired: "bg-status-expired",
};


export default App
