'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, BadgeCheck, Headphones } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Free Delivery',
        description: 'Enjoy free shipping on all orders over ৳500 across Bangladesh.',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Payments',
        description: 'Shop with confidence. All transactions are encrypted and safe.',
    },
    {
        icon: BadgeCheck,
        title: 'Buyer Protection',
        description: 'Get a full refund if your item doesn’t match the description.',
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Our dedicated support team is always here to help you.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUsSection() {
    return (
        <section className="py-16 sm:py-20 bg-white dark:bg-[#1a1d24] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B75D3E] mb-2">
                        Why Choose Us
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                        Built for Trust &amp; Convenience
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-3">
                        We make online shopping seamless, secure, and enjoyable for every buyer.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="group relative p-6 rounded-2xl bg-[#F5EFE6] dark:bg-[#0f1117] border border-[#E4D9C7] dark:border-gray-800 hover:border-[#B75D3E]/40 dark:hover:border-[#E08B5E]/40 hover:shadow-lg hover:shadow-[#B75D3E]/10 dark:hover:shadow-[#E08B5E]/10 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B75D3E]/5 to-[#E08B5E]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#B75D3E]/15 transition-all duration-300">
                                    <feature.icon className="w-6 h-6 text-[#B75D3E] dark:text-[#E08B5E]" />
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}