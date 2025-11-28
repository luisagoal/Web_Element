import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import apiService from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.fullName) {
      newErrors.fullName = 'El nombre completo es requerido'
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'El nombre debe tener al menos 2 caracteres'
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await apiService.register(formData)
      console.log('Registration successful:', response)
      
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
      navigate('/login')
      
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Error al registrarse. Intenta nuevamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-image">
          <div className="image-content">
            <h2>Únete a Element SAS</h2>
            <p>Descubre el mejor equipamiento deportivo</p>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="icon">🎯</span>
                <span>Ofertas exclusivas</span>
              </div>
              <div className="benefit-item">
                <span className="icon">📦</span>
                <span>Envío prioritario</span>
              </div>
              <div className="benefit-item">
                <span className="icon">🏅</span>
                <span>Productos premium</span>
              </div>
              <div className="benefit-item">
                <span className="icon">💬</span>
                <span>Soporte personalizado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="register-form-wrapper">
          <div className="register-header">
            <h1>Crear Cuenta</h1>
            <p>Regístrate en Element SAS</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Tu nombre completo"
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

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
                placeholder="Mínimo 6 caracteres"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Repite tu contraseña"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="terms-agreement">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  Acepto los{' '}
                  <Link to="/terms" className="terms-link">
                    términos y condiciones
                  </Link>
                  {' '}y la{' '}
                  <Link to="/privacy" className="terms-link">
                    política de privacidad
                  </Link>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="register-button"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="register-footer">
            <p>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="login-link">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
