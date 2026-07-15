import { api } from './api';
import { getCurrentUser } from './auth';

export interface CartItem {
    itemId: string;
    quantity: number;
}

const CART_STORAGE_KEY = 'trovemart_cart_items';
const CART_CHANGE_EVENT = 'trovemart:cart-change';

function emitCartChange() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(CART_CHANGE_EVENT));
    }
}

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        return [];
    }
}

export function isInCart(itemId: string): boolean {
    return getCartItems().some((item) => item.itemId === itemId);
}

function saveCartItems(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    emitCartChange();
}

export function getCartCount(): number {
    const items = getCartItems();
    return items.reduce((sum, item) => {
        const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 0;
        return sum + quantity;
    }, 0);
}

export async function addToCart(itemId: string, quantity = 1): Promise<CartItem[]> {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        try {
            await api.post('/cart', { itemId, quantity });
            // After successful server update, sync with server
            await hydrateCartFromServer();
            return getCartItems();
        } catch (error) {
            console.error('Server cart update failed, using local storage:', error);
            // Fall back to local storage if server fails
        }
    }
    
    // Local storage fallback
    const nextItems = [...getCartItems()];
    const existing = nextItems.find((item) => item.itemId === itemId);

    if (existing) {
        existing.quantity += quantity;
    } else {
        nextItems.push({ itemId, quantity });
    }

    saveCartItems(nextItems);
    return nextItems;
}

export async function updateCartQuantity(itemId: string, quantity: number): Promise<CartItem[]> {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        try {
            await api.put(`/cart/${itemId}`, { quantity });
            // After successful server update, sync with server
            await hydrateCartFromServer();
            return getCartItems();
        } catch (error) {
            console.error('Server cart update failed, using local storage:', error);
            // Fall back to local storage if server fails
        }
    }
    
    // Local storage fallback
    const nextItems = getCartItems()
        .filter((item) => item.itemId !== itemId)
        .concat(quantity > 0 ? [{ itemId, quantity }] : []);

    saveCartItems(nextItems);
    return nextItems;
}

export async function removeFromCart(itemId: string): Promise<CartItem[]> {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        try {
            await api.delete(`/cart/${itemId}`);
            // After successful server update, sync with server
            await hydrateCartFromServer();
            return getCartItems();
        } catch (error) {
            console.error('Server cart update failed, using local storage:', error);
            // Fall back to local storage if server fails
        }
    }
    
    // Local storage fallback
    const nextItems = getCartItems().filter((item) => item.itemId !== itemId);
    saveCartItems(nextItems);
    return nextItems;
}

export async function hydrateCartFromServer(): Promise<CartItem[]> {
    const currentUser = getCurrentUser();
    if (!currentUser) return getCartItems();

    try {
        const { data } = await api.get('/cart');
        // Convert server format to local format
        const items = (data.items || []).map((serverItem: any) => ({
            itemId: serverItem.itemId,
            quantity: serverItem.quantity
        }));
        saveCartItems(items);
        return items;
    } catch (error) {
        console.error('Failed to hydrate cart from server:', error);
        return getCartItems();
    }
}

export function listenToCartChanges(callback: () => void) {
    if (typeof window === 'undefined') return () => undefined;

    const onChange = () => callback();
    window.addEventListener(CART_CHANGE_EVENT, onChange);
    window.addEventListener('storage', onChange);

    return () => {
        window.removeEventListener(CART_CHANGE_EVENT, onChange);
        window.removeEventListener('storage', onChange);
    };
}
