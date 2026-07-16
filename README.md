<h1 align="center">
  <img src="public/favicon.ico" alt="TrovéMart Logo" width="40" height="40" style="vertical-align:middle; margin-right:12px;" />
  TrovéMart - Online Shopping Platform
</h1>

![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-9.0.3-red?style=for-the-badge&logo=jsonwebtoken)

A full-stack e-commerce platform for buying and selling fashion, electronics, home goods, and handmade treasures. Built with the modern MERN stack (MongoDB, Express, React, Next.js) with a focus on performance, real-time data, and a seamless user experience.

## 🌐 Live Demo

[https://trovemart-083.vercel.app/](https://trovemart-083.vercel.app/)

---

## ✨ Key Features

### 🛍️ For All Users
- **Browse & Shop**: Search, filter, and purchase products across multiple categories.
- **Advanced Search & Filter**: Search by name, filter by Category, Price Range, and Rating.
- **Sort & Pagination**: Sort by Newest, Popular, Rating, Price (Low to High / High to Low) with server-side pagination.
- **Wishlist & Cart**: Save favorite items and manage shopping cart with real-time updates.
- **Dark/Light Mode**: Fully functional theme toggle persisted in local storage.

### 👥 Role-Based Dashboards
- **User (Buyer)**:
  - View personal profile and shopping activity.
  - Manage wishlist with real-time synchronization.
  - Track cart items with quantity management.
  - Write and manage product reviews.
  - View shopping analytics with interactive charts (Recharts).
- **Seller (Vendor)**:
  - Add, update, and delete product listings with image uploads.
  - Manage incoming product approval requests.
  - View store performance with interactive charts (Recharts).
  - Track active listings and pending approvals.
- **Admin**:
  - Approve / Reject seller applications and product listings.
  - Manage users (Ban / Unban, View all users).
  - Platform analytics with comprehensive charts (Recharts).
  - Monitor pending items and seller applications.

### 🛡️ Security & Performance
- **JWT Authentication**: Robust authentication with Email/Password and OAuth (Google & Facebook).
- **Role-Based Access Control**: Secure API endpoints protected by role-based middleware.
- **Input Validation & Sanitization**: Protection against XSS and SQL injection attacks.
- **Vercel Deploy**: Frontend optimized for production on Vercel.

---
