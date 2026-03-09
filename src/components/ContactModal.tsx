import React, { useState } from 'react'
import styles from './ContactModal.module.css'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  language: 'fr' | 'en'
}

const translations = {
  fr: {
    title: 'Me contacter',
    wip: '🚧 Fonctionnalité en développement',
    name: 'Nom',
    email: 'Email',
    subject: 'Sujet',
    message: 'Message',
    send: 'Envoyer',
    cancel: 'Annuler',
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'votre@email.com',
    subjectPlaceholder: 'Sujet du message',
    messagePlaceholder: 'Votre message...',
  },
  en: {
    title: 'Contact me',
    wip: '🚧 Feature in development',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    cancel: 'Cancel',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    subjectPlaceholder: 'Message subject',
    messagePlaceholder: 'Your message...',
  },
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const t = translations[language]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Send to backend
    setFormData({ name: '', email: '', subject: '', message: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.wipBanner}>{t.wip}</div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              {t.name}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              {t.subject}
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder={t.subjectPlaceholder}
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              {t.message}
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className={styles.textarea}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className={styles.btnSend}>
              {t.send}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
