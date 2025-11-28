const express = require('express');
const cors = require('cors');
const { mockProducts, mockCategories } = require('./data');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let products = [...mockProducts];
let categories = [...mockCategories];

// Products
app.get('/api/products', (req, res) => {
  let filteredProducts = [...products];
  const { category_id, search, priceRange, sortBy } = req.query;

  if (category_id) {
    const catId = parseInt(category_id);
    if (catId === 1) {
      filteredProducts = filteredProducts.filter(p => [3, 4, 5, 6].includes(p.category_id));
    } else if (catId === 2) {
      filteredProducts = filteredProducts.filter(p => [7, 8, 9, 10, 11].includes(p.category_id));
    } else {
      filteredProducts = filteredProducts.filter(p => p.category_id === catId);
    }
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (priceRange) {
    filteredProducts = filteredProducts.filter(product => {
      switch (priceRange) {
        case 'under-100k':
          return product.price < 100000;
        case '100k-200k':
          return product.price >= 100000 && product.price < 200000;
        case '200k-300k':
          return product.price >= 200000 && product.price < 300000;
        case 'over-300k':
          return product.price >= 300000;
        default:
          return true;
      }
    });
  }

  if (sortBy) {
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }

  res.json({ data: filteredProducts, total: filteredProducts.length });
});

app.get('/api/products/featured', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 4;
    const featuredProducts = products.filter(p => p.is_new).slice(0, limit);
    res.json(featuredProducts);
  });

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/categories/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (category) {
    res.json(category);
  } else {
    res.status(404).send('Category not found');
  }
});

// Auth
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      user: {
        id: 1,
        email: email,
        full_name: 'Usuario Test'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  const { email, fullName } = req.body;
  res.json({
    user: {
      id: 1,
      email: email,
      full_name: fullName
    },
    message: 'User registered successfully'
  });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
