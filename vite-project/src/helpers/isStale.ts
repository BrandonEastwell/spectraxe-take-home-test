export function isStale(isoString?: string, threshold = 30): boolean {
    if (!isoString) return false;
    const diff = Date.now() - new Date(isoString).getTime();
    return diff > threshold * 1000;
}