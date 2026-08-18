import { motion } from 'framer-motion'
import { certificates } from '@data/certificates'
import { Award, ExternalLink } from 'lucide-react'

export default function Certificates() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
            <span className="text-white">Certificados & </span>
            <span className="gradient-text">Credenciais</span>
          </h2>
          <p className="text-gray-400 text-lg">Certificações profissionais que validam minha expertise</p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="group p-6 rounded-lg glass hover:border-cyan-500/40 transition-all cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Icon */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-5xl">{cert.icon}</div>
                <Award className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="text-cyan-400 text-sm font-semibold mb-3">{cert.issuer}</p>

              {/* Date */}
              <p className="text-gray-400 text-sm mb-4">Obtido em {cert.date}</p>

              {/* Credential ID */}
              {cert.credentialId && (
                <div className="mb-4 p-3 rounded bg-cyan-500/10 border border-cyan-500/20">
                  <p className="text-xs text-gray-400 mb-1">ID da Credencial</p>
                  <p className="text-xs text-cyan-300 font-mono break-all">{cert.credentialId}</p>
                </div>
              )}

              {/* View Credential Link */}
              {cert.credentialUrl && cert.credentialUrl !== '#' && (
                <motion.a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Ver Credencial <ExternalLink size={16} />
                </motion.a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 p-8 rounded-lg glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">{certificates.length}</div>
              <p className="text-gray-400">Certificações Ativas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
              <p className="text-gray-400">Anos de Aprendizado Contínuo</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
              <p className="text-gray-400">Comprometido com Excelência</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
