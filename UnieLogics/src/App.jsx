import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './showcase/components/Navigation'
import Footer from './components/Footer'
import { ScrollManager } from './showcase/lib/nav'
import Home from './showcase/pages/Home'
import Cortex from './showcase/pages/Cortex'
import Wms from './showcase/pages/Wms'
import Tms from './showcase/pages/Tms'
import Products from './showcase/pages/Products'
import Audit from './showcase/pages/Audit'
import Join from './showcase/pages/Join'
import Services from './pages/Services'
import Solutions from './pages/Solutions'
import IndustryProblems from './pages/IndustryProblems'
import Articles from './pages/Articles'
import GetStarted from './pages/GetStarted'

function App() {
  return (
    <Router>
      <ScrollManager />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cortex" element={<Cortex />} />
        <Route path="/wms" element={<Wms />} />
        <Route path="/tms" element={<Tms />} />
        <Route path="/products" element={<Products />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/join" element={<Join />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industry-problems" element={<IndustryProblems />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/contact" element={<GetStarted />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
