'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'How do I track my order?',
        answer: 'Once your order is shipped, you will receive a tracking number via email. You can also track your order directly from the "My Orders" section in your Dashboard.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 7-day return policy on all items. If the product does not match the description or is defective, you can initiate a return from your Dashboard for a full refund.',
    },
    {
        question: 'How do I become a seller on TrovéMart?',
        answer: 'Click the "Become a Seller" link in your user menu and fill out the application form. Our admin team will review your details and approve your store within 24 hours.',
    },
    {
        question: 'Is it safe to make payments online?',
        answer: 'Absolutely! All payments are processed via secure, SSL-encrypted gateways. We do not store your card details and use industry-standard security protocols.',
    },
    {
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for certain areas and can deliver within 1-2 business days.',
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 sm:py-20 bg-[#F5EFE6] dark:bg-[#0f1117] transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B75D3E] mb-2">
                        Support
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-3">
                        Can’t find the answer? <a href="/contact" className="text-[#B75D3E] dark:text-[#E08B5E] underline">Contact our support team</a>.
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-200 ${isOpen ? 'bg-[#B75D3E]/5 dark:bg-[#E08B5E]/5' : 'hover:bg-[#F5EFE6] dark:hover:bg-[#0f1117]'
                                        }`}
                                >
                                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-[#B75D3E] dark:text-[#E08B5E] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-5 pt-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}