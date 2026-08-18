import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CV_FILES, SOCIAL_LINKS } from '../utils/constants'

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'Desenvolvedor Full Stack'
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, index + 1))
        setIndex(index + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [index])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-1 shadow-glow-lg">
            <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
              <img src="/perfil.jpg" alt="Foto de Gustavo Silveira Soares" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          variants={itemVariants}
        >
          <span className="text-white">Gustavo</span>
          <br />
          <span className="gradient-text">Silveira Soares</span>
        </motion.h1>

        {/* Typing Effect */}
        <motion.div
          className="h-12 mb-6"
          variants={itemVariants}
        >
          <p className="text-xl md:text-2xl text-cyan-400 font-semibold">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Especializado em criar aplicações web modernas, escaláveis e de alta performance.
          Apaixonado por React, TypeScript e arquitetura de sistemas. Transformando ideias em
          código que funciona.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector('#projects')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-glow-lg transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Projetos <ArrowRight size={20} />
          </motion.button>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {CV_FILES.map((cv) => (
              <motion.a
                key={cv.label}
                href={cv.href}
                download={cv.filename}
                className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-cyan-500/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {cv.label} <Download size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">✉️</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-400 text-sm">Scroll para explorar</div>
          <div className="text-2xl">↓</div>
        </motion.div>
      </motion.div>
    </section>
  )
}
