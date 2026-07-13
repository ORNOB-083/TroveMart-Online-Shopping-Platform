'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import toast from 'react-hot-toast';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields.');
            return;
        }
        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

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
                            Get in{' '}
                            <span className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent">
                                Touch
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Have a question, feedback, or just want to say hello? We’d love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 bg-white dark:bg-gray-800/60 rounded-3xl p-8 shadow-lg border border-[#E4D9C7] dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Contact Info
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] mt-2 rounded-full" />
                        <div className="mt-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10">
                                    <Mail className="w-5 h-5 text-[#B75D3E] dark:text-[#E08B5E]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</p>
                                    <a
                                        href="mailto:hello@trovemart.com"
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors"
                                    >
                                        hello@trovemart.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10">
                                    <Phone className="w-5 h-5 text-[#B75D3E] dark:text-[#E08B5E]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Phone</p>
                                    <a
                                        href="tel:+8801700000000"
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors"
                                    >
                                        +880 1700-000000
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10">
                                    <MapPin className="w-5 h-5 text-[#B75D3E] dark:text-[#E08B5E]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Address</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Dhaka, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-[#E4D9C7] dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Follow Us</p>
                            <div className="flex gap-4 mt-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] hover:border-[#B75D3E]/40 transition-colors"
                                >
                                    <FaFacebook className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] hover:border-[#B75D3E]/40 transition-colors"
                                >
                                    <FaInstagram className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] hover:border-[#B75D3E]/40 transition-colors"
                                >
                                    <FaTwitter className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.043252589035!2d90.4068355!3d23.774792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7f9c8a4c2b1%3A0x9b3f6f0b0c5f3e5e!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700000000000"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-3 bg-white dark:bg-gray-800/60 rounded-3xl p-8 shadow-lg border border-[#E4D9C7] dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Send a Message
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] mt-2 rounded-full" />
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-3 rounded-xl border border-[#E4D9C7] dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#B75D3E]/40 focus:border-[#B75D3E] transition-all"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-3 rounded-xl border border-[#E4D9C7] dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#B75D3E]/40 focus:border-[#B75D3E] transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-3 rounded-xl border border-[#E4D9C7] dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#B75D3E]/40 focus:border-[#B75D3E] transition-all"
                                    placeholder="What's this about?"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-3 rounded-xl border border-[#E4D9C7] dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#B75D3E]/40 focus:border-[#B75D3E] transition-all resize-none"
                                    placeholder="Your message..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white font-semibold shadow-lg shadow-[#B75D3E]/30 hover:shadow-[#B75D3E]/50 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            </section>

            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Check our <Link href="/help" className="text-[#B75D3E] dark:text-[#E08B5E] hover:underline">Help Center</Link> for quick answers.
                    </p>
                </motion.div>
            </section>
        </main>
    );
}