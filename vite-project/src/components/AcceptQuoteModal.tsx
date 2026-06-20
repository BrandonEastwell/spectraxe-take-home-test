import {type KeyboardEvent, useEffect, useRef} from "react";
import type {Rfq} from "../types/rfq.ts";

interface AcceptQuoteModalProps {
    rfq: Rfq;
    accepting: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function AcceptQuoteModal({ rfq, accepting, onCancel, onConfirm }: AcceptQuoteModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea',
        );
        firstFocusable?.focus();
    }, []);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape" && !accepting) {
            onCancel();
            return;
        }

        if (event.key !== "Tab" || !dialogRef.current) return;

        const focusableElements = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
            ),
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="accept-quote-heading"
                aria-describedby="accept-quote-description"
                className="w-full max-w-md rounded-lg border border-border bg-surface p-4 text-text-primary shadow-xl"
                onKeyDown={handleKeyDown}
            >
                <h2 id="accept-quote-heading" className="text-lg font-bold">Accept quote?</h2>
                <p id="accept-quote-description" className="mt-2 text-sm text-text-secondary">
                    Confirm acceptance for {rfq.currencyPair}, {rfq.direction.toLowerCase()} {rfq.notional.toLocaleString()}.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <span className="text-text-secondary">Bid</span>
                    <span>{rfq.bid ?? "-"}</span>
                    <span className="text-text-secondary">Offer</span>
                    <span>{rfq.offer ?? "-"}</span>
                    <span className="text-text-secondary">Status</span>
                    <span>{rfq.status}</span>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        disabled={accepting}
                        onClick={onCancel}
                        className="rounded-md border border-border px-4 py-2 hover:bg-surface-hover not-disabled:cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={accepting}
                        onClick={onConfirm}
                        className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 not-disabled:cursor-pointer disabled:opacity-50"
                    >
                        {accepting ? "Accepting..." : "Confirm Accept"}
                    </button>
                </div>
            </div>
        </div>
    );
}
