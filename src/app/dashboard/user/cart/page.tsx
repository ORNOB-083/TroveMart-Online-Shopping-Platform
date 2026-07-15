'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import { getItemById } from '@/lib/actions/items';
import { Item } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { getCartItems, removeFromCart, updateCartQuantity } from '@/lib/cart';

export default function UserCartPage() {
    const [items, setItems] = useState<(Item & { quantity: number })[]>([]);
    const [loading, setLoading] = useState(true);
    const user = getCurrentUser();

    useEffect(() => {
        async function loadCart() {
            setLoading(true);
            try {
                const cartItems = getCartItems();

                if (!cartItems.length) {
                    setItems([]);
                    setLoading(false);
                    return;
                }

                const resolved: (Item & { quantity: number })[] = [];

                for (const entry of cartItems) {
                    try {
                        const { item } = await getItemById(entry.itemId);
                        resolved.push({ ...item, quantity: entry.quantity });
                    } catch (err) {
                        console.warn(`Skipping cart item ${entry.itemId}:`, err);
                    }
                }

                setItems(resolved);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load your cart.');
            } finally {
                setLoading(false);
            }
        }

        loadCart();
    }, []);

    const updateQty = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;
        await updateCartQuantity(itemId, quantity);
        setItems((prev) => prev.map((entry) => (entry._id === itemId ? { ...entry, quantity } : entry)));
    };

    const removeItem = async (itemId: string) => {
        await removeFromCart(itemId);
        setItems((prev) => prev.filter((entry) => entry._id !== itemId));
        toast.success('Removed from cart.');
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!user) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-[#B75D3E] mb-4" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Please sign in to view your cart</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Log in to keep your cart items saved.</p>
                <Link href="/login?redirect=/dashboard/user/cart" className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white font-semibold">
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">My Cart</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your shopping cart items</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
                </div>
            ) : items.length === 0 ? (
                <div className="bg-white dark:bg-[#1a1d24] border border-dashed border-[#E4D9C7] dark:border-gray-700 rounded-2xl p-10 text-center">
                    <ShoppingBag className="w-12 h-12 mx-auto text-[#B75D3E]" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Your cart is empty</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Pick a few items to get started.</p>
                    <Link href="/items" className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] px-5 py-2.5 text-sm font-semibold text-white">
                        Explore Products
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-6">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item._id} className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-[#E4D9C7] dark:border-gray-800 bg-white dark:bg-[#1a1d24] p-4 shadow-sm">
                                <Link href={`/items/${item._id}`} className="relative h-28 w-full sm:w-28 rounded-2xl overflow-hidden bg-[#F5EFE6] dark:bg-gray-800 shrink-0">
                                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                                </Link>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                                        </div>
                                        <button onClick={() => removeItem(item._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4.5 h-4.5" />
                                        </button>
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center rounded-full border border-[#E4D9C7] dark:border-gray-700 overflow-hidden">
                                            <button onClick={() => updateQty(item._id, item.quantity - 1)} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-[#F5EFE6] dark:hover:bg-gray-800">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="min-w-10 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">{item.quantity}</span>
                                            <button onClick={() => updateQty(item._id, item.quantity + 1)} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-[#F5EFE6] dark:hover:bg-gray-800">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="text-base font-semibold text-gray-900 dark:text-gray-100">{formatPrice(item.price * item.quantity)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6 h-fit shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Order Summary</h2>
                        <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>
                        <div className="mt-5 border-t border-[#E4D9C7] dark:border-gray-800 pt-4 flex items-center justify-between text-base font-semibold text-gray-900 dark:text-gray-100">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <Link
                            href="/cart"
                            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-[#B75D3E]/40 transition-all"
                        >
                            Proceed to Checkout
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}