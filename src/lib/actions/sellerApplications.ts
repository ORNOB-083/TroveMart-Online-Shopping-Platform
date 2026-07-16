import { api } from '../api';
import { SellerApplication } from '../types';

export interface SubmitApplicationPayload {
    businessName: string;
    businessDescription: string;
    phone: string;
}

export async function submitApplication(payload: SubmitApplicationPayload): Promise<SellerApplication> {
    const { data } = await api.post('/seller-applications', payload);
    return data.application;
}

export async function getMyApplication(): Promise<SellerApplication | null> {
    const { data } = await api.get('/seller-applications/mine');
    return data.application;
}

export async function getAllApplications(status: string = 'pending'): Promise<SellerApplication[]> {
    const { data } = await api.get('/seller-applications', { params: { status } });
    return data.applications;
}

export async function approveApplication(id: string): Promise<void> {
    await api.patch(`/seller-applications/${id}/approve`);
    
    // Dispatch event to update dashboards
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('trovemart:admin-change'));
        window.dispatchEvent(new Event('trovemart:seller-change'));
    }
}

export async function rejectApplication(id: string): Promise<void> {
    await api.patch(`/seller-applications/${id}/reject`);
    
    // Dispatch event to update dashboards
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('trovemart:admin-change'));
    }
}