import { motion } from 'framer-motion'
import { Code2, Zap, Lightbulb } from 'lucide-react'

export default function About() {
  const stats = [
    { label: 'Anos de Evolução', value: '3+', icon: '📚' },
    { label: 'Projetos Práticos', value: '10+', icon: '🚀' },
    { label: 'Tecnologias', value: '15+', icon: '⚙️' },
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
            <span className="text-white">Sobre </span>
            <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-gray-400 text-lg">Conhecendo minha jornada e paixão pela tecnologia</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Sou um desenvolvedor Full Stack apaixonado por criar soluções web modernas, funcionais e
              com foco em experiência do usuário. Minha rotina combina desenvolvimento, análise de
              problemas reais e entrega de produtos com boa performance e organização.
            </motion.p>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Tenho experiência em frontend com React e TypeScript e também em backend com Node.js,
              integrações de APIs e arquitetura de sistemas escaláveis. Meu trabalho está centrado em
              transformar ideias em soluções concretas, automatizadas e fáceis de manter.
            </motion.p>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Tenho interesse em IoT, monitoramento em tempo real, automação e cloud computing,
              buscando sempre criar impactos práticos com tecnologia, produtividade e qualidade.
            </motion.p>

            {/* Highlights */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-4"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center hover:border-cyan-500/40 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Skills Cards */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Code2,
                title: 'Desenvolvimento Web Moderno',
                description:
                  'Especialista em React, TypeScript e frameworks modernos. Criando interfaces responsivas e performáticas.',
              },
              {
                icon: Zap,
                title: 'Performance & Otimização',
                description:
                  'Foco em performance, SEO e otimização de código. Garantindo experiências rápidas e fluidas.',
              },
              {
                icon: Lightbulb,
                title: 'Arquitetura & Escalabilidade',
                description:
                  'Design de sistemas escaláveis, microserviços e cloud. Preparado para crescimento.',
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg glass hover:border-cyan-500/40 transition-all group"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-all">
                    <skill.icon className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{skill.title}</h3>
                    <p className="text-gray-400 text-sm">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
