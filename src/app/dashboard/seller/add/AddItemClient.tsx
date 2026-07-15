'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import { createItem } from '@/lib/actions/items';
import ImageUploader from '@/components/ImageUploader';

const CATEGORIES = [
    'Fashion',
    'Electronics',
    'Home & Living',
    'Handmade Crafts',
    'Beauty',
    'Sports & Outdoors',
    'Books & Stationery',
    'Toys & Games',
    'Groceries',
    'Other',
];

export default function AddItemClient() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [specs, setSpecs] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
            toast.error('Only sellers can add items.');
            router.replace('/dashboard/user');
            return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAuthorized(true);
    }, [router]);

    const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
        setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
    };

    const addSpecRow = () => setSpecs((prev) => [...prev, { key: '', value: '' }]);
    const removeSpecRow = (index: number) => setSpecs((prev) => prev.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !category || !price || !quantity) {
            toast.error('Please fill in all required fields.');
            return;
        }
        if (images.length < 1) {
            toast.error('Add at least 1 image.');
            return;
        }

        const specsObject: Record<string, string> = {};
        specs.forEach((s) => {
            if (s.key.trim() && s.value.trim()) specsObject[s.key.trim()] = s.value.trim();
        });

        setSubmitting(true);
        try {
            await createItem({
                title: title.trim(),
                description: description.trim(),
                price: Number(price),
                category,
                images,
                quantity: Number(quantity),
                specs: specsObject,
            });
            toast.success('Item submitted for admin approval!');
            router.push('/items/manage');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to add item.');
        } finally {
            setSubmitting(false);
        }
    };

    if (authorized === null) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Add New Item</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Your item will be reviewed by an admin before it appears on TrovéMart.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5">
                        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Product Images
                        </label>
                        <ImageUploader images={images} onChange={setImages} max={5} />
                    </div>

                    <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Handwoven Ceramic Vase"
                                className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                placeholder="Describe the product in detail..."
                                className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#B75D3E] transition-colors"
                                >
                                    <option value="">Select category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="e.g. 25"
                                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                Price (৳)
                            </label>
                            <input
                                type="number"
                                min={0}
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g. 1500"
                                className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Specifications <span className="text-gray-400 font-normal">(optional)</span>
                            </label>
                            <button
                                type="button"
                                onClick={addSpecRow}
                                className="flex items-center gap-1 text-xs font-medium text-[#B75D3E] dark:text-[#E08B5E]"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Add Row
                            </button>
                        </div>
                        <div className="space-y-2">
                            {specs.map((spec, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={spec.key}
                                        onChange={(e) => updateSpec(i, 'key', e.target.value)}
                                        placeholder="e.g. Material"
                                        className="flex-1 px-3 py-2 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E]"
                                    />
                                    <input
                                        type="text"
                                        value={spec.value}
                                        onChange={(e) => updateSpec(i, 'value', e.target.value)}
                                        placeholder="e.g. Cotton"
                                        className="flex-1 px-3 py-2 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E]"
                                    />
                                    {specs.length > 1 && (
                                        <button type="button" onClick={() => removeSpecRow(i)} className="text-gray-400 hover:text-red-500 shrink-0">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] shadow-lg shadow-[#B75D3E]/25 hover:shadow-[#B75D3E]/40 disabled:opacity-60 transition-all"
                    >
                        {submitting ? 'Submitting...' : 'Submit for Approval'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}