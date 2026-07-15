import { api } from '../api';
import { Item } from '../types';

export async function getMyWishlist(): Promise<Item[]> {
    const { data } = await api.get('/wishlist/mine');
    return data.items;
}

export async function toggleWishlist(itemId: string): Promise<boolean> {
    const { data } = await api.post(`/wishlist/${itemId}/toggle`);
    return data.liked;
}