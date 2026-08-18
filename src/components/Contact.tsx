import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { CONTACT_INFO, SOCIAL_LINKS } from '../utils/constants'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Formspree config from environment variables
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Verifica se o endpoint do Formspree está configurado
    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === 'https://formspree.io/f/SEU_ID_AQUI') {
      // Fallback: abre o cliente de email com os dados do formulário
      const subject = encodeURIComponent(`Contato pelo portfólio — ${formData.name}`)
      const body = encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
      )
      window.location.href = `mailto:${CONTACT_INFO.email.address}?subject=${subject}&body=${body}`
      setLoading(false)
      return
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 6000)
      } else {
        const data = await response.json()
        if (Object.hasOwn(data, 'errors')) {
          setError(data.errors.map((e: any) => e.message).join(', '))
        } else {
          setError('Ops! Falha ao enviar. Tente pelo WhatsApp ou email diretamente.')
        }
      }
    } catch (err) {
      console.error('Formspree error:', err)
      setError('Ops! Falha ao enviar. Tente pelo WhatsApp ou email diretamente.')
    } finally {
      setLoading(false)
    }
  }

  const whatsappMessage = encodeURIComponent(CONTACT_INFO.whatsapp.message || 'Olá Gustavo, gostaria de conversar!')
  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp.phoneNumber.replace(/\D/g, '')}?text=${whatsappMessage}`
  const mailtoHref = `mailto:${CONTACT_INFO.email.address}?subject=${encodeURIComponent(CONTACT_INFO.email.subject)}`
  const rawPhone = CONTACT_INFO.whatsapp.phoneNumber.replace(/\D/g, '').slice(-11)
  const formattedPhone = `+55 (${rawPhone.slice(0, 2)}) ${rawPhone.slice(2, 7)}-${rawPhone.slice(7)}`

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_INFO.email.address,
      href: mailtoHref,
      target: '_self' as const,
      rel: undefined,
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: formattedPhone,
      href: whatsappHref,
      target: '_blank' as const,
      rel: 'noopener noreferrer',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: CONTACT_INFO.location.address,
      href: CONTACT_INFO.location.url,
      target: '_blank' as const,
      rel: 'noopener noreferrer',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Vamos </span>
            <span className="gradient-text">Conversar</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Estou sempre aberto a novas oportunidades e colaborações
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info and Quick Actions */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            {/* Detailed Contact Info */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={info.target}
                rel={info.rel}
                className="p-6 rounded-lg glass hover:border-cyan-500/40 transition-all group min-h-[100px] flex items-center cursor-pointer"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className="p-3 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-all flex-shrink-0">
                    <info.icon className="text-cyan-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{info.label}</h3>
                    <p className="text-gray-400 group-hover:text-cyan-400 transition-colors break-words">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              className="pt-6 border-t border-cyan-500/20"
              variants={itemVariants}
            >
              <h3 className="text-white font-semibold mb-4">Redes Sociais</h3>
              <div className="flex gap-4 flex-wrap">
                {[
                  { label: 'GitHub', emoji: '🐙', href: SOCIAL_LINKS.github },
                  { label: 'LinkedIn', emoji: '💼', href: SOCIAL_LINKS.linkedin },
                  { label: 'Twitter', emoji: '𝕏', href: SOCIAL_LINKS.twitter },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{social.emoji}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="p-8 rounded-lg glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-white font-semibold mb-3">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/60 border-2 border-cyan-500/40 text-white placeholder-slate-300 focus:border-cyan-400 focus:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                  placeholder="Seu nome"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block text-white font-semibold mb-3">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/60 border-2 border-cyan-500/40 text-white placeholder-slate-300 focus:border-cyan-400 focus:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                  placeholder="seu@email.com"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-white font-semibold mb-3">Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/60 border-2 border-cyan-500/40 text-white placeholder-slate-300 focus:border-cyan-400 focus:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none"
                  placeholder="Sua mensagem aqui..."
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading || submitted}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-glow-lg transition-all disabled:opacity-50 mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : submitted ? (
                  <>
                    <span>✓</span>
                    Mensagem Enviada!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensagem
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  className="p-4 rounded-lg bg-green-500/20 border border-green-500/40 text-green-300 mt-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold">Mensagem enviada!</p>
                    <p className="text-sm text-green-400">Responderei em breve. Obrigado!</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 mt-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
