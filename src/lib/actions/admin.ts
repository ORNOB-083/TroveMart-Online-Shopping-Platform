import { api } from '../api';
import { Item } from '../types';

export async function getAdminItems(status: string = 'pending'): Promise<Item[]> {
    const { data } = await api.get('/admin/items', { params: { status } });
    return data.items;
}

export async function approveItem(id: string): Promise<Item> {
    const { data } = await api.patch(`/admin/items/${id}/approve`);
    return data.item;
}

export async function rejectItem(id: string): Promise<Item> {
    const { data } = await api.patch(`/admin/items/${id}/reject`);
    return data.item;
}