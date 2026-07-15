import { api } from '../api';
import { Item } from '../types';
import { AdminUser } from '../types';

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

export async function getAllUsers(role: string = 'all'): Promise<AdminUser[]> {
    const { data } = await api.get('/admin/users', { params: { role } });
    return data.users;
}

export async function banUser(id: string): Promise<AdminUser> {
    const { data } = await api.patch(`/admin/users/${id}/ban`);
    return data.user;
}

export async function unbanUser(id: string): Promise<AdminUser> {
    const { data } = await api.patch(`/admin/users/${id}/unban`);
    return data.user;
}