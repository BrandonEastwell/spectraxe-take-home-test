export function getLastUpdatedText(isoString?: string): string {
    if (!isoString) return "-";
    const diff = Date.now() - new Date(isoString).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds === 0) return `Now`;
    return `${Math.floor(diff / 1000)}s ago`;
}