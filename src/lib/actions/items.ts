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