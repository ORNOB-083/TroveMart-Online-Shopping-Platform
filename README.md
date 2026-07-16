<h1 align="center">
  <img src="public/logo.png" alt="TrovéMart Logo" width="40" height="40" style="vertical-align:middle; margin-right:12px;" />
  TrovéMart - Online Shopping Platform
</h1>

![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-9.0.3-red?style=for-the-badge&logo=jsonwebtoken)

A full-stack e-commerce platform for buying and selling fashion, electronics, home goods, and handmade treasures. Built with the Typescript and modern MERN stack (MongoDB, Express, React, Next.js) with a focus on performance, real-time data, and a seamless user experience.

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

## 🧪 Demo Accounts

To test the different dashboard features, use the credentials below:

| Role   | Email                 | Password   |
| ------ | --------------------- | ---------- |
| **Seller** | `vendor@gmail.com` | `vendor123` |
| **Admin** | `admin@gmail.com` | `admin123` |

> **Note:** 
> - **User**: Explore shopping, wishlist, cart, and reviews
> - **Seller**: Test product creation, store management, and analytics
> - **Admin**: Review platform management, user moderation, and analytics

---

## 🛠️ Tech Stack

### Frontend
| Package                  | Purpose                             |
| :----------------------- | :---------------------------------- |
| **Next.js 16.2**         | React framework (App Router)        |
| **React 19**             | UI library                          |
| **Tailwind CSS 4**       | Styling & responsiveness            |
| **Framer Motion 12.40**  | Premium page and element animations |
| **Swiper 12.2**          | Hero slider & product galleries     |
| **Recharts 3.8**         | Dashboard analytics & charts        |
| **JWT 9.0.3**            | Client-side authentication         |
| **Lucide Icons**         | Comprehensive icon set              |
| **react-hot-toast 2.6**  | Elegant toast notifications         |

### Backend
| Package                         | Purpose                                         |
| :------------------------------ | :---------------------------------------------- |
| **Express 5.2**                 | Node.js server framework                        |
| **MongoDB 7.5 (Native Driver)** | Database for products, users, orders           |
| **jsonwebtoken 9.0.3**          | JWT token generation & validation              |
| **bcryptjs 3.0.3**              | Password hashing for security                  |
| **CORS**                        | Cross-origin resource sharing                   |
| **dotenv**                      | Environment variable management                 |
| **google-auth-library 10.9.0**  | Google OAuth integration                        |

---

## 📊 Dashboard Analytics

All three dashboards feature interactive charts powered by Recharts:

### Admin Dashboard
- **User Distribution Pie Chart**: Total users, sellers, and admins breakdown
- **Item Status Bar Chart**: Approved vs pending items
- **Weekly Activity Line Chart**: Platform growth trends

### Seller Dashboard  
- **Item Status Distribution Pie Chart**: Active vs pending listings
- **Weekly Sales Performance Area Chart**: Sales vs views analytics
- **Category Performance Bar Chart**: Performance by product category

### User Dashboard
- **Weekly Shopping Activity Area Chart**: Views, cart additions, wishlist activity
- **Wishlist Categories Pie Chart**: Product category distribution
- **Price Range Distribution Bar Chart**: Items by price range
- **Monthly Spending Line Chart**: Personal spending trends
  
---

## 🌐 Backend Repository + Live Links

**Backend (Server):** [https://github.com/ORNOB-083/TroveMart-Server](https://github.com/ORNOB-083/TroveMart-Server)

**Live Demo (Server):** [https://trovemart-server-083.vercel.app/](https://trovemart-server-083.vercel.app)

---

