export interface Item {
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