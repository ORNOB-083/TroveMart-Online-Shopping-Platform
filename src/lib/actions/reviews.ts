import { api } from '../api';
import { Review } from '../types';
import { MyReview } from '../types';

export async function getReviews(itemId: string): Promise<Review[]> {
    const { data } = await api.get(`/items/${itemId}/reviews`);
    return data.reviews;
}

export async function addReview(itemId: string, rating: number, comment: string) {
    const { data } = await api.post(`/items/${itemId}/reviews`, { rating, comment });
    return data.review;
}

export async function getMyReviews(): Promise<MyReview[]> {
    const { data } = await api.get('/reviews/mine');
    return data.reviews;
}

export async function deleteReview(id: string): Promise<void> {
    await api.delete(`/reviews/${id}`);
}