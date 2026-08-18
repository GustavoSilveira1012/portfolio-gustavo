import { motion } from 'framer-motion'
import { experiences } from '@data/experience'
import { Briefcase, BookOpen, Code2, Award } from 'lucide-react'

export default function Experience() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="text-cyan-400" size={24} />
      case 'freelance':
        return <Code2 className="text-purple-400" size={24} />
      case 'education':
        return <BookOpen className="text-blue-400" size={24} />
      case 'project':
        return <Award className="text-pink-400" size={24} />
      default:
        return <Briefcase className="text-cyan-400" size={24} />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'work':
        return 'Trabalho'
      case 'freelance':
        return 'Freelance'
      case 'education':
        return 'Educação'
      case 'project':
        return 'Projeto'
      default:
        return 'Experiência'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'from-cyan-500 to-blue-500'
      case 'freelance':
        return 'from-purple-500 to-pink-500'
      case 'education':
        return 'from-blue-500 to-cyan-500'
      case 'project':
        return 'from-pink-500 to-red-500'
      default:
        return 'from-cyan-500 to-blue-500'
    }
  }

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Minha </span>
            <span className="gradient-text">Experiência</span>
          </h2>
          <p className="text-gray-400 text-lg">Jornada profissional e evolução na programação</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative"
              variants={itemVariants}
            >
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-1 h-12 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTypeColor(exp.type)} p-0.5`}>
                  <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center">
                    {getIcon(exp.type)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <motion.div
                className="ml-24 p-6 rounded-lg glass hover:border-cyan-500/40 transition-all group"
                whileHover={{ x: 10 }}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-cyan-400 font-semibold">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400">
                      {getTypeLabel(exp.type)}
                    </span>
                    <span className="text-sm text-gray-400">{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">{exp.description}</p>

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
