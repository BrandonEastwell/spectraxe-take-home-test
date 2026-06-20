export function getQuoteStatusMessage(loading: boolean, visibleCount: number, totalCount: number): string {
    if (loading) return "Loading live quotes.";
    if (visibleCount === 0) return "No quotes match the current filters.";
    return `Showing ${visibleCount} of ${totalCount} quotes.`;
}
