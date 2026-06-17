
export function isExpired(date: string) {
    const now = new Date();
    const expiry = new Date(date);
    const isSameMonth = now.getUTCMonth() === expiry.getUTCMonth();
    return isSameMonth ? now.getUTCDate() > expiry.getUTCDate() : now.getUTCMonth() > expiry.getUTCMonth();
}