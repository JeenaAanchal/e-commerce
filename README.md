# MERN E-Commerce Website

Full-stack E-Commerce platform built with **MongoDB, Express, React, Node.js** and **Stripe** payment intent integration.

## Features
- JWT authentication with bcrypt password hashing
- User profile + role-based admin access
- Product catalog with search, category filtering, and price sorting
- Product details with reviews and ratings
- Cart + wishlist management
- Checkout flow with shipping address + Stripe payment intent creation
- Order confirmation lifecycle and order history
- Admin dashboard for product and order status management

## Tech Stack
- **Backend:** Express, Mongoose, JWT, bcrypt, Stripe SDK
- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS, react-hot-toast

## Project Structure
- `backend/` REST API, schemas, middleware, and controllers
- `frontend/` React application and global state management

## Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` in frontend environment if backend is not running on `http://localhost:5000/api`.
