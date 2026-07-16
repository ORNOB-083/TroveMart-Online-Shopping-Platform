import { api } from '../api';
import { Item } from '../types';
import { AdminUser } from '../types';

export async function getAdminItems(status: string = 'pending'): Promise<Item[]> {
    const { data } = await api.get('/admin/items', { params: { status } });
    return data.items;
}

export async function approveItem(id: string): Promise<Item> {
    const { data } = await api.patch(`/admin/items/${id}/approve`);
    
    // Dispatch events to update dashboards
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('trovemart:admin-change'));
        window.dispatchEvent(new Event('trovemart:item-change'));
    }
    
    return data.item;
}

export async function rejectItem(id: string): Promise<Item> {
    const { data } = await api.patch(`/admin/items/${id}/reject`);
    
    // Dispatch events to update dashboards
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('trovemart:admin-change'));
        window.dispatchEvent(new Event('trovemart:item-change'));
    }
    
    return data.item;
}

export async function getAllUsers(role: string = 'all'): Promise<AdminUser[]> {
    const { data } = await api.get('/admin/users', { params: { role } });
    return data.users;
}

export async function banUser(id: string): Promise<AdminUser> {
    const { data } = await api.patch(`/admin/users/${id}/ban`);
    
    // Dispatch event to update admin dashboard
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('trovemart:admin-change'));
    }
    
    return data.user;
}

export async function unbanUser(id: string): Promise<AdminUser> {
    const { data } = await api.patch(`/admin/users/${id}/unban`);
    
    // Dispatch event to update admin dashboard
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('trovemart:admin-change'));
    }
    
    return data.user;
}

// Admin stats functions
export async function getAdminStats() {
    try {
        const [usersResponse, itemsResponse, applicationsResponse] = await Promise.all([
            api.get('/admin/users', { params: { role: 'all' } }),
            api.get('/admin/items', { params: { status: 'all' } }),
            api.get('/seller-applications', { params: { status: 'pending' } })
        ]);

        return {
            totalUsers: usersResponse.data.users?.length || 0,
            totalItems: itemsResponse.data.items?.length || 0,
            pendingApplications: applicationsResponse.data.applications?.length || 0,
            pendingItems: itemsResponse.data.items?.filter((item: Item) => item.status === 'pending').length || 0
        };
    } catch (error) {
        console.error('Failed to fetch admin stats:', error);
        return {
            totalUsers: 0,
            totalItems: 0,
            pendingApplications: 0,
            pendingItems: 0
        };
    }
}