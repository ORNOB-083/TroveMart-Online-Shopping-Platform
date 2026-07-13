'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Award, Heart, Globe, ShoppingBag, ArrowRight } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const values = [
    {
        icon: Heart,
        title: 'Quality First',
        description: 'We handpick every product to ensure it meets our high standards of craftsmanship and durability.',
    },
    {
        icon: Users,
        title: 'Community Driven',
        description: 'Our marketplace is built by and for a global community of makers and conscious consumers.',
    },
    {
        icon: Award,
        title: 'Trust & Transparency',
        description: 'Every seller is verified, and every review is authentic — so you can shop with confidence.',
    },
    {
        icon: Globe,
        title: 'Global Reach',
        description: 'From local artisans to international brands, we connect you with the best from around the world.',
    },
];

const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', image: '👩‍💼' },
    { name: 'Michael Chen', role: 'Head of Product', image: '👨‍💻' },
    { name: 'Aisha Patel', role: 'Community Manager', image: '👩‍🎨' },
    { name: 'David Kim', role: 'Lead Engineer', image: '🧑‍🔧' },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F5EFE6] dark:bg-[#0f1117] transition-colors duration-300">
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B75D3E]/20 via-transparent to-[#E08B5E]/20 dark:from-[#B75D3E]/10 dark:to-[#E08B5E]/10" />
                <div className="relative max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
                            About{' '}
                            <span className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent">
                                TrovéMart
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We believe in the power of meaningful commerce — where every purchase tells a story and supports real people.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto bg-white dark:bg-gray-800/60 rounded-3xl shadow-xl p-8 md:p-12 border border-[#E4D9C7] dark:border-gray-700"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
                        Our Mission
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] mx-auto mt-2 rounded-full" />
                    <p className="mt-6 text-gray-600 dark:text-gray-400 text-center text-lg leading-relaxed">
                        To create a vibrant, trustworthy marketplace where shoppers can discover exceptional products
                        and sellers can thrive — all while fostering a community that values quality, authenticity, and connection.
                    </p>
                </motion.div>
            </section>

            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100"
                    >
                        What We Stand For
                    </motion.h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] mx-auto mt-2 rounded-full" />
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-gray-800/60 rounded-2xl p-6 shadow-md border border-[#E4D9C7] dark:border-gray-700 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10">
                                        <value.icon className="w-6 h-6 text-[#B75D3E] dark:text-[#E08B5E]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {value.title}
                                        </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                        Meet the Team
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] mx-auto mt-2 rounded-full" />
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="text-center bg-white dark:bg-gray-800/60 rounded-2xl p-6 shadow-md border border-[#E4D9C7] dark:border-gray-700"
                            >
                                <div className="text-5xl mb-3">{member.image}</div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] rounded-3xl p-8 md:p-12 text-center shadow-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Ready to discover your next treasure?
                    </h2>
                    <p className="mt-2 text-white/80 text-sm md:text-base">
                        Join thousands of happy shoppers and explore our curated collection.
                    </p>
                    <Link
                        href="/items"
                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-[#B75D3E] font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                        Start Shopping
                        <ShoppingBag className="w-4 h-4" />
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}