'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck, Users } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // ✅ Removed Pagination module
import 'swiper/css';

const testimonials = [
    {
        name: 'Sarah M.',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+M&background=B75D3E&color=fff&size=64',
        location: 'Dhaka, BD',
        date: '2 days ago',
        review: 'Absolutely love the quality of the handmade crafts. Fast delivery and great packaging! Will definitely order again.',
        rating: 5,
        verified: true,
    },
    {
        name: 'John D.',
        avatar: 'https://ui-avatars.com/api/?name=John+D&background=E08B5E&color=fff&size=64',
        location: 'Chittagong, BD',
        date: '1 week ago',
        review: 'Found the perfect electronics deal here. The approval system for sellers ensures high quality and builds great trust.',
        rating: 4,
        verified: true,
    },
    {
        name: 'Aisha K.',
        avatar: 'https://ui-avatars.com/api/?name=Aisha+K&background=B75D3E&color=fff&size=64',
        location: 'Sylhet, BD',
        date: '3 weeks ago',
        review: 'The best local marketplace experience. Love supporting local sellers on TrovéMart! The customer support is outstanding.',
        rating: 5,
        verified: true,
    },
    {
        name: 'Rafiq H.',
        avatar: 'https://ui-avatars.com/api/?name=Rafiq+H&background=2C3E50&color=fff&size=64',
        location: 'Rajshahi, BD',
        date: '2 days ago',
        review: 'Pricing is unbeatable. I found a home appliance here for 40% less than other markets. Highly recommended!',
        rating: 5,
        verified: true,
    },
    {
        name: 'Nusrat J.',
        avatar: 'https://ui-avatars.com/api/?name=Nusrat+J&background=8E44AD&color=fff&size=64',
        location: 'Khulna, BD',
        date: '5 days ago',
        review: 'Shopping here feels very safe. The buyer protection and seller verification systems really set TrovéMart apart.',
        rating: 5,
        verified: true,
    },
    {
        name: 'Tareq A.',
        avatar: 'https://ui-avatars.com/api/?name=Tareq+A&background=16A085&color=fff&size=64',
        location: 'Barisal, BD',
        date: '1 week ago',
        review: 'Shipping was faster than I expected! The product quality matched the images perfectly. Excellent experience.',
        rating: 5,
        verified: true,
    },
    {
        name: 'Mehrab K.',
        avatar: 'https://ui-avatars.com/api/?name=Mehrab+K&background=D35400&color=fff&size=64',
        location: 'Dhaka, BD',
        date: '3 days ago',
        review: 'I love the community aspect. Buying from local artisans and small businesses feels great. TrovéMart is a game changer.',
        rating: 5,
        verified: true,
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-16 sm:py-20 bg-white dark:bg-[#1a1d24] transition-colors duration-300 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B75D3E]/5 dark:bg-[#E08B5E]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B75D3E]">Reviews</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                            What Our Customers Say
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg mx-auto md:mx-0">
                            Real feedback from real buyers. Join thousands of satisfied shoppers.
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#F5EFE6] dark:bg-[#0f1117] border border-[#E4D9C7] dark:border-gray-800">
                        <div className="flex items-center gap-1 mb-1">
                            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.9</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#E08B5E] text-[#E08B5E]" />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <Users className="w-3.5 h-3.5" />
                            <span>1,200+ Reviews</span>
                        </div>
                    </div>
                </div>

                <div className="pb-2">
                    <Swiper
                        modules={[Autoplay]} // No pagination
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false
                        }}
                        speed={1000}
                        loop={true}
                        className="testimonial-swiper"
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i}>
                                <div className="group p-6 rounded-2xl bg-[#F5EFE6] dark:bg-[#0f1117] border border-[#E4D9C7] dark:border-gray-800 hover:border-[#B75D3E]/40 dark:hover:border-[#E08B5E]/40 transition-colors duration-300 h-full">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                                            <img
                                                src={t.avatar}
                                                alt={t.name}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                    {t.name}
                                                </h4>
                                                {t.verified && (
                                                    <BadgeCheck className="w-3.5 h-3.5 text-[#B75D3E] dark:text-[#E08B5E]" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                <span>{t.location}</span>
                                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                                <span>{t.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(5)].map((_, s) => (
                                            <Star
                                                key={s}
                                                className={`w-3.5 h-3.5 ${s < t.rating ? 'fill-[#E08B5E] text-[#E08B5E]' : 'text-gray-300 dark:text-gray-600'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        &quot;{t.review}&quot;
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
}