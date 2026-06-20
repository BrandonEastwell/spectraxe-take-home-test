import {SORT_OPTIONS} from "../constants/sortOptions.ts";
import type {Sort} from "../types/sort.ts";

interface QuoteToolbarProps {
    showFilters: boolean;
    sortOrder: Sort | undefined;
    onToggleFilters: () => void;
    onSortChange: (sortOrder: Sort | undefined) => void;
}

export function QuoteToolbar({ showFilters, sortOrder, onToggleFilters, onSortChange }: QuoteToolbarProps) {
    return (
        <div className="flex flex-row gap-2 mb-4">
            <button
                type="button"
                aria-controls="filters-dialog"
                aria-expanded={showFilters}
                onClick={onToggleFilters}
                className="flex flex-row place-items-center gap-1 bg-primary text-white px-3 py-1 rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     aria-hidden="true"
                     className="feather feather-filter">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                {showFilters ? "Hide filters" : "Show filters"}
            </button>
            <div className="flex flex-row gap-2 place-items-center">
                <label htmlFor="sortBy" className="text-sm font-medium">Sort By:</label>
                <select
                    id="sortBy"
                    name="sortBy"
                    className="p-2 bg-background border rounded-md cursor-pointer"
                    value={sortOrder ?? ""}
                    onChange={(e) => onSortChange(e.target.value ? e.target.value as Sort : undefined)}
                >
                    <option value="">No Order</option>
                    { SORT_OPTIONS.map(sortOption => (
                        <option key={sortOption} value={sortOption}>{sortOption}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
