// Utility functions for the application

/**
 * Format price to Colombian Pesos currency
 * @param {number} price - Price in COP
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price)
}

/**
 * Format date to Colombian locale
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-CO').format(new Date(date))
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Generate placeholder image URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display
 * @returns {string} Placeholder image URL
 */
export const generatePlaceholderImage = (width = 400, height = 400, text = 'Producto') => {
  return `https://via.placeholder.com/${width}x${height}/007bff/ffffff?text=${encodeURIComponent(text)}`
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres' }
  }
  
  if (password.length < 8) {
    return { isValid: true, message: 'Contraseña débil' }
  }
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length
  
  if (strength >= 3) {
    return { isValid: true, message: 'Contraseña fuerte' }
  } else if (strength >= 2) {
    return { isValid: true, message: 'Contraseña media' }
  } else {
    return { isValid: true, message: 'Contraseña débil' }
  }
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Get category name by ID
 * @param {number} categoryId - Category ID
 * @returns {string} Category name
 */
export const getCategoryName = (categoryId) => {
  const categories = {
    1: 'Hombre',
    2: 'Mujer',
    3: 'Camisetas Hombre',
    4: 'Pantalonetas Hombre',
    5: 'Pantalones Hombre',
    6: 'Zapatillas Hombre',
    7: 'Camisetas Mujer',
    8: 'Tops Mujer',
    9: 'Faldas Mujer',
    10: 'Licras Mujer',
    11: 'Zapatillas Mujer'
  }
  
  return categories[categoryId] || 'Categoría'
}

/**
 * Get available sizes for a category
 * @param {number} categoryId - Category ID
 * @returns {Array} Array of available sizes
 */
export const getSizesForCategory = (categoryId) => {
  // Shoes categories
  if ([6, 11].includes(categoryId)) {
    return ['36', '37', '38', '39', '40', '41', '42', '43', '44']
  }
  
  // Clothing categories
  return ['XS', 'S', 'M', 'L', 'XL', 'XXL']
}

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Generate breadcrumb items
 * @param {string} pathname - Current pathname
 * @param {object} params - Route parameters
 * @returns {Array} Breadcrumb items
 */
export const generateBreadcrumbs = (pathname, params = {}) => {
  const breadcrumbs = [{ name: 'Inicio', path: '/' }]
  
  if (pathname.startsWith('/products')) {
    breadcrumbs.push({ name: 'Productos', path: '/products' })
    
    if (params.id) {
      breadcrumbs.push({ name: 'Detalle del Producto', path: null })
    }
  } else if (pathname.startsWith('/category')) {
    breadcrumbs.push({ name: 'Productos', path: '/products' })
    
    if (params.categoryId) {
      const categoryName = getCategoryName(parseInt(params.categoryId))
      breadcrumbs.push({ name: categoryName, path: null })
    }
  } else if (pathname === '/login') {
    breadcrumbs.push({ name: 'Iniciar Sesión', path: null })
  } else if (pathname === '/register') {
    breadcrumbs.push({ name: 'Registrarse', path: null })
  }
  
  return breadcrumbs
}

export default {
  formatPrice,
  formatDate,
  truncateText,
  generatePlaceholderImage,
  isValidEmail,
  validatePassword,
  debounce,
  getCategoryName,
  getSizesForCategory,
  calculateDiscount,
  generateBreadcrumbs
}
