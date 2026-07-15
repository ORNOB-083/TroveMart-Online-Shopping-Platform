export interface Item {
    status: "pending" | "approved" | "rejected";
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    quantity: number;
    specs: Record<string, string>;
    sellerId: string;
    sellerName: string;
    ratingAvg: number;
    reviewCount: number;
    createdAt: string;
}

export interface ItemsResponse {
    items: Item[];
    total: number;
    page: number;
    totalPages: number;
}

export interface Review {
    _id: string;
    itemId: string;
    userId: string;
    userName: string;
    userImage?: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'seller' | 'admin';
    image?: string;
    provider: string;
    banned: boolean;
    createdAt: string;
}

export interface MyReview extends Review {
    item: {
        _id: string;
        title: string;
        images: string[];
        price: number;
    } | null;
}

export interface SellerApplication {
    _id: string;
    userId: string;
    userName: string;
    userEmail: string;
    businessName: string;
    businessDescription: string;
    phone: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}