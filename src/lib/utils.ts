const CART_STORAGE_KEY = 'trovemart_cart_items';
const WISHLIST_STORAGE_KEY = 'trovemart_wishlist_items';

export function formatPrice(price: number): string {
    return `৳${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getStoredItemIds(key: string): string[] {
    if (typeof window === 'undefined') return [];

    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
        return [];
    }
}

export function saveStoredItemIds(key: string, ids: string[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(ids));
}

export function hasStoredItemId(key: string, itemId: string): boolean {
    return getStoredItemIds(key).includes(itemId);
}

export function addStoredItemId(key: string, itemId: string): boolean {
    const current = getStoredItemIds(key);
    if (current.includes(itemId)) return false;

    const next = [...current, itemId];
    saveStoredItemIds(key, next);
    return true;
}

export function toggleStoredItemId(key: string, itemId: string): boolean {
    const current = getStoredItemIds(key);
    const exists = current.includes(itemId);

    if (exists) {
        saveStoredItemIds(key, current.filter((id) => id !== itemId));
        return false;
    }

    saveStoredItemIds(key, [...current, itemId]);
    return true;
}

export function getCartItemIds(): string[] {
    return getStoredItemIds(CART_STORAGE_KEY);
}

export function getWishlistItemIds(): string[] {
    return getStoredItemIds(WISHLIST_STORAGE_KEY);
}

export function addToCart(itemId: string): boolean {
    return addStoredItemId(CART_STORAGE_KEY, itemId);
}

export function toggleWishlistItem(itemId: string): boolean {
    return toggleStoredItemId(WISHLIST_STORAGE_KEY, itemId);
}

export function isLiked(itemId: string): boolean {
    return hasStoredItemId(WISHLIST_STORAGE_KEY, itemId);
}

export function isInCart(itemId: string): boolean {
    return hasStoredItemId(CART_STORAGE_KEY, itemId);
}
