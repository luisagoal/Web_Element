# Element SAS - Sports Clothes Store Frontend

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React + Vite frontend application for Element SAS, a sports clothes store marketplace. The application is built with JavaScript and uses React Router for navigation.

## Project Structure
- `/src/components/` - Reusable React components
- `/src/pages/` - Page components for different routes
- `/src/services/` - API service functions and mock data
- `/src/utils/` - Utility functions and helpers
- `/src/hooks/` - Custom React hooks (to be added)

## Key Features
- **Product Listing Page (PLP)** - Browse products with filtering and sorting
- **Product Detail Page (PDP)** - Detailed product information with size selection
- **User Authentication** - Login and registration pages
- **Responsive Design** - Mobile-first approach
- **Mock Data** - Currently using mock data service based on MySQL database schema

## Database Schema Context
The backend uses MySQL with the following main tables:
- `users` - User authentication and profiles
- `categories` - Product categories (hierarchical structure)
- `products` - Product catalog with pricing and descriptions

Main categories:
- Hombre (ID: 1) - Men's sportswear
- Mujer (ID: 2) - Women's sportswear

Subcategories include shirts, shorts, pants, shoes for both men and women.

## Design Patterns
- Component-based architecture
- Mock API service for development
- CSS modules for styling
- Colombian peso (COP) currency formatting
- Spanish language interface

## Code Style Guidelines
- Use functional components with hooks
- Follow ESLint rules
- Use semantic HTML
- Implement proper error handling
- Add loading states for async operations
- Use Spanish for user-facing text
- Format prices in Colombian pesos

## When generating code:
1. Maintain consistency with existing component structure
2. Use the mock API service for data operations
3. Follow the established CSS patterns
4. Include proper error handling and loading states
5. Use Spanish text for user interface
6. Follow Colombian e-commerce conventions
