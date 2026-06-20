import type {RfqStatus} from "../../mock-api";
import {type Dispatch, type SetStateAction, useRef} from "react";
import {CURRENCIES} from "../constants/currencies.ts";
import type {Filters} from "../types/filters.ts";

interface FilterProps {
    showFilters: boolean;
    setShowFilters: Dispatch<SetStateAction<boolean>>;
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
}

export default function FilterSideBar(filterProps: FilterProps) {
    const { showFilters, setShowFilters, filters, setFilters } = filterProps;
    const dialogRef = useRef<HTMLDivElement>(null);

    const handleClearFilters = () => {
        setFilters({ currencyBase: undefined, currencyQuote: undefined, status: undefined, actionableOnly: false });
    }

    const handleApplyFilters = () => {
        setShowFilters(false);
    }


    return (
        <div className={"fixed inset-0 z-10 bg-transparent " + (showFilters ? "block" : "hidden")}>
            <div
                id="filters-dialog"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="filters-heading"
                className={"flex flex-col justify-between bg-linear-to-r from-background to-surface min-h-screen w-80 absolute z-20 p-3"}
            >
                <div className="flex flex-col gap-2">
                    <div className="mb-2 flex items-center justify-between">
                        <h2 id="filters-heading" className="text-lg font-bold">Filters</h2>
                        <button
                            type="button"
                            onClick={() => setShowFilters(false)}
                            aria-label="Close filters"
                            className="rounded-md border border-border px-3 py-1 text-sm hover:bg-surface-hover cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="w-full p-2 bg-background border rounded-md cursor-pointer"
                        value={filters.status ?? ""}
                        onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value ? e.target.value as RfqStatus : undefined }))}
                    >
                        <option value="">All</option>
                        <option value="Open">Open</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Expired">Expired</option>
                    </select>
                    <label htmlFor="currencyBase" className="text-sm font-medium">Base Currency</label>
                    <select
                        id="currencyBase"
                        name="currencyBase"
                        className="w-full p-2 bg-background border rounded-md cursor-pointer"
                        value={filters.currencyBase ?? ""}
                        onChange={(e) => setFilters((prev) => ({ ...prev, currencyBase: e.target.value || undefined }))}
                    >
                        <option value="">Any</option>
                        { CURRENCIES.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                    <label htmlFor="currencyQuote" className="text-sm font-medium">Quote Currency</label>
                    <select
                        id="currencyQuote"
                        name="currencyQuote"
                        className="w-full p-2 bg-background border rounded-md cursor-pointer"
                        value={filters.currencyQuote ?? ""}
                        onChange={(e) => setFilters((prev) => ({ ...prev, currencyQuote: e.target.value || undefined }))}
                    >
                        <option value="">Any</option>
                        { CURRENCIES.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                    <div className="grid grid-cols-2 items-center justify-items-start mt-2">
                        <label htmlFor="actionableOnly" className="text-sm font-medium cursor-pointer">Actionable Only</label>
                        <input
                            type="checkbox"
                            id="actionableOnly"
                            name="actionableOnly"
                            className="w-4 h-4 cursor-pointer"
                            checked={filters.actionableOnly}
                            onChange={(e) => setFilters((prev) => ({ ...prev, actionableOnly: e.target.checked }))}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <button type="button" onClick={handleClearFilters}
                            className="w-full rounded-md bg-primary/20 px-4 py-2 text-white hover:opacity-90 cursor-pointer">
                        Clear Filters
                    </button>
                    <button type="button" onClick={handleApplyFilters} className="w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 cursor-pointer">
                        Apply Filters
                    </button>
                </div>
            </div>
            <button
                type="button"
                aria-label="Close filters"
                className="w-full h-full bg-black/25 absolute inset-0 cursor-default"
                onClick={() => setShowFilters(false)}
            />
        </div>

    )
}
