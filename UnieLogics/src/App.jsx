import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './showcase/components/Navigation'
import Footer from './components/Footer'
import { ScrollManager } from './showcase/lib/nav'
import Home from './showcase/pages/Home'
import Audit from './showcase/pages/Audit'
import Join from './showcase/pages/Join'
import Wms from './showcase/pages/Wms'
import Tms from './showcase/pages/Tms'
import UnieConnectPage from './showcase/pages/UnieConnectPage'
import IndustryPros from './showcase/pages/IndustryPros'
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
        <Route path="/audit" element={<Audit />} />
        <Route path="/join" element={<Join />} />
        <Route path="/wms" element={<Wms />} />
        <Route path="/tms" element={<Tms />} />
        <Route path="/connect" element={<UnieConnectPage />} />
        <Route path="/industry-pros" element={<IndustryPros />} />
        <Route path="/cortex" element={<Navigate to="/join#intelligence" replace />} />
        <Route path="/products" element={<Navigate to="/join#products" replace />} />
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
