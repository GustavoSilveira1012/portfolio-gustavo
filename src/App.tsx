import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Home from '@pages/Home'
import './App.css'

function App() {
  useEffect(() => {
    // Initialize EmailJS
    // emailjs.init('YOUR_PUBLIC_KEY')
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gradient-dark flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
