import { useState } from 'react'
import './Faq.css'

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  )
}

const Faq = () => {
  const faqs = [
    {
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer: 'Aceptamos tarjetas de crédito (Visa, MasterCard, American Express), tarjetas de débito, y PayPal.'
    },
    {
      question: '¿Cuánto tiempo tarda en llegar mi pedido?',
      answer: 'El tiempo de entrega estándar es de 3 a 5 días hábiles. Ofrecemos envío express por un costo adicional.'
    },
    {
        question: '¿Cómo puedo hacer seguimiento de mi pedido?',
        answer: 'Una vez que tu pedido ha sido enviado, recibirás un correo electrónico con un número de seguimiento. Puedes usar este número en el sitio web del transportista para ver el estado de tu entrega.'
    }
  ]

  return (
    <div className="faq-page">
      <div className="container">
        <h1>Preguntas Frecuentes</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faq
