import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contacto</h1>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
        <div className="contact-content">
          <div className="contact-form">
            <h2>Envíanos un mensaje</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
            </form>
          </div>
          <div className="contact-info">
            <h2>Información de Contacto</h2>
            <p><strong>Email:</strong> soporte@elementsas.com</p>
            <p><strong>Teléfono:</strong> +57 300 123 4567</p>
            <p><strong>Dirección:</strong> Calle Falsa 123, Bogotá, Colombia</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
