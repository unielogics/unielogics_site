import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Services from './pages/Services'
import Solutions from './pages/Solutions'
import IndustryProblems from './pages/IndustryProblems'
import Products from './pages/Products'
import Articles from './pages/Articles'
import GetStarted from './pages/GetStarted'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industry-problems" element={<IndustryProblems />} />
        <Route path="/products" element={<Products />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/contact" element={<GetStarted />} />
      </Routes>
    </Router>
  )
}

export default App
