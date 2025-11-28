import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import apiService from '../services/api'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await apiService.login(formData)
      console.log('Login successful:', response)
      
      // Here you would typically:
      // 1. Store auth token in localStorage/context
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      alert('¡Inicio de sesión exitoso!')
      navigate('/')
      
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Error al iniciar sesión. Verifica tus credenciales.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h1>Iniciar Sesión</h1>
            <p>Accede a tu cuenta de Element SAS</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Tu contraseña"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="register-link">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="login-image">
          <div className="image-content">
            <h2>Bienvenido de vuelta</h2>
            <p>Continúa tu viaje deportivo con las mejores marcas</p>
            <div className="features-list">
              <div className="feature-item">
                <span className="icon">🏃‍♂️</span>
                <span>Productos premium</span>
              </div>
              <div className="feature-item">
                <span className="icon">🚚</span>
                <span>Envío gratis</span>
              </div>
              <div className="feature-item">
                <span className="icon">💯</span>
                <span>Garantía de calidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
