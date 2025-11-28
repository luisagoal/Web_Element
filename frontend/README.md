# Element SAS - Sports Clothes Store Frontend

A modern, responsive e-commerce frontend for Element SAS, a sports clothing marketplace built with React and Vite.

## 🚀 Features

- **Product Catalog**: Browse sports clothes with filtering and sorting
- **Product Details**: Detailed product pages with size selection and image gallery
- **User Authentication**: Login and registration system
- **Responsive Design**: Mobile-first approach for all device sizes
- **Category Navigation**: Organized by gender and product type
- **Search Functionality**: Find products quickly with search
- **Shopping Cart**: Add products to cart (UI ready)

## 🛠 Tech Stack

- **Frontend**: React 18 + JavaScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios (ready for API integration)
- **Styling**: CSS3 with custom modules
- **Icons**: Unicode emoji icons

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── ProductCard.jsx # Product card component
├── pages/              # Page components
│   ├── Home.jsx        # Homepage with featured products
│   ├── ProductList.jsx # Product listing page (PLP)
│   ├── ProductDetail.jsx # Product detail page (PDP)
│   ├── Login.jsx       # Login page
│   └── Register.jsx    # Registration page
├── services/           # API and data services
│   └── api.js          # Mock API service
├── utils/              # Utility functions
│   └── helpers.js      # Common helper functions
└── hooks/              # Custom React hooks (ready for expansion)
```

## 🎯 Product Categories

Based on the database schema:

### Men's Categories (Hombre)
- Camisetas (T-shirts)
- Pantalonetas (Shorts)
- Pantalones (Pants/Joggers)
- Zapatillas (Sneakers)

### Women's Categories (Mujer)
- Camisetas (T-shirts)
- Tops (Sports tops)
- Faldas (Skirts)
- Licras (Leggings)
- Zapatillas (Sneakers)

## 💾 Database Integration

The frontend is designed to work with a MySQL database containing:

- **users**: User authentication and profiles
- **categories**: Hierarchical product categories
- **products**: Complete product catalog with pricing in Colombian pesos

Currently using mock data that matches the database schema for development.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Integration

The application uses a service layer (`src/services/api.js`) that currently provides mock data. To integrate with a real backend:

1. Update the `API_BASE_URL` in `src/services/api.js`
2. Replace mock functions with actual HTTP requests
3. Update error handling as needed

### Expected API Endpoints

```
GET /api/products          # Get all products
GET /api/products/:id      # Get product by ID
GET /api/categories        # Get all categories
POST /api/auth/login       # User login
POST /api/auth/register    # User registration
```

## 🎨 Styling

- **CSS Modules**: Component-specific styles
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Blue primary (#007bff) with professional grays
- **Typography**: System font stack for performance

## 🌍 Localization

- **Language**: Spanish (Colombia)
- **Currency**: Colombian Peso (COP)
- **Date Format**: DD/MM/YYYY
- **Number Format**: Colombian standards

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The application is ready for deployment to modern hosting platforms like Vercel or Netlify.

## 🎯 Next Steps

1. **Backend Integration**: Connect to MySQL database
2. **Payment Gateway**: Integrate payment processing
3. **Inventory Management**: Real-time stock updates
4. **User Profiles**: Account management and order history
5. **Admin Panel**: Product and category management

---

**Element SAS** - Quality sports clothing for athletes like you! 🏃‍♂️⚽🏀+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
