import Hero from '@components/Hero'
import About from '@components/About'
import Stack from '@components/Stack'
import Projects from '@components/Projects'
import Experience from '@components/Experience'
import Certificates from '@components/Certificates'
import Contact from '@components/Contact'

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Experience />
      <Certificates />
      <Contact />
    </div>
  )
}
