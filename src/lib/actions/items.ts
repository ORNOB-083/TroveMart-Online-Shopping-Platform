import { api } from '../api';
import { ItemsResponse, Item } from '../types';

export interface ItemsQuery {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export async function getItems(query: ItemsQuery = {}): Promise<ItemsResponse> {
    const { data } = await api.get('/items', { params: query });
    return data;
}

export async function getItemById(id: string): Promise<{ item: Item; related: Item[] }> {
    const { data } = await api.get(`/items/${id}`);
    return data;
}

export async function getCategories(): Promise<string[]> {
    const { data } = await api.get('/items/categories');
    return data.categories;
}

export interface CreateItemPayload {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    quantity: number;
    specs: Record<string, string>;
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
    const { data } = await api.post('/items', payload);
    return data.item;
}