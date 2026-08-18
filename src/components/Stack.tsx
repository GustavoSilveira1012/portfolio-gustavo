import { motion } from 'framer-motion'
import { technologies } from '@data/technologies'

export default function Stack() {
  const categories = [
    { id: 'frontend', label: 'Frontend', color: 'from-blue-500 to-cyan-500' },
    { id: 'backend', label: 'Backend', color: 'from-green-500 to-emerald-500' },
    { id: 'database', label: 'Banco de Dados', color: 'from-purple-500 to-pink-500' },
    { id: 'devops', label: 'Cloud & DevOps', color: 'from-orange-500 to-red-500' },
  ]

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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'text-cyan-400'
      case 'advanced':
        return 'text-blue-400'
      case 'intermediate':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'expert':
        return 'Especialista'
      case 'advanced':
        return 'Avançado'
      case 'intermediate':
        return 'Intermediário'
      default:
        return 'Iniciante'
    }
  }

  return (
    <section id="stack" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
            <span className="text-white">Stack </span>
            <span className="gradient-text">Tecnológico</span>
          </h2>
          <p className="text-gray-400 text-lg">Tecnologias que domino e utilizo em meus projetos</p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryTechs = technologies.filter((tech) => tech.category === category.id)

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Category Title */}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.label}
                  </h3>
                  <div className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full mt-2`}></div>
                </div>

                {/* Tech Grid */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {categoryTechs.map((tech) => (
                    <motion.div
                      key={tech.id}
                      className="group relative"
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                    >
                      <div className="p-4 rounded-lg glass hover:border-cyan-500/40 transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center">
                        {/* Icon */}
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                          {tech.icon}
                        </div>

                        {/* Name */}
                        <h4 className="text-white font-semibold text-sm mb-2">{tech.name}</h4>

                        {/* Level Badge */}
                        <div className={`text-xs font-semibold ${getLevelColor(tech.level)}`}>
                          {getLevelLabel(tech.level)}
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all pointer-events-none"></div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-16 p-6 rounded-lg glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h4 className="text-white font-semibold mb-4">Legenda de Níveis</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-gray-300">Especialista - Domínio completo</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-gray-300">Avançado - Experiência sólida</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="text-gray-300">Intermediário - Conhecimento prático</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
