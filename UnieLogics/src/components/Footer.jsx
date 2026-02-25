import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-content">
          <div className="footer-mission">
            <h4>Our Mission</h4>
            <p className="footer-mission-lead">
              UnieLogics is a technology firm redefining ecommerce and logistics for small and medium-sized businesses.
            </p>
            <p className="footer-mission-text">
              We empower SMBs with an interconnected network that makes operations self-sustaining, efficient, and competitive—offering features that were once exclusive to large corporations.
            </p>
            <p className="footer-mission-text">
              By leveraging AI, we identify and resolve inefficiencies that are nearly impossible to detect when operating in isolation. Our platform enables suppliers, buyers, distributors, transportation companies, and warehouses to collaborate seamlessly, reducing costs, improving speed, and creating a balanced ecosystem where every participant benefits.
            </p>
            <p className="footer-mission-text">
              Our mission is simple: to build a sustainable and equitable environment for SMBs in the ecommerce and logistics space, leveling the playing field and unlocking growth opportunities that were previously out of reach.
            </p>
          </div>

          <div className="footer-links-column">
            <div className="footer-section">
              <h4>Products</h4>
              <ul className="footer-links">
                <li><a href="https://uniewms.com" target="_blank" rel="noopener noreferrer">UnieWMS</a></li>
                <li><Link to="/products">UnieFreight</Link></li>
                <li><Link to="/products">UnieCourier</Link></li>
                <li><a href="https://prepcenternearme.com" target="_blank" rel="noopener noreferrer">PrepCenterNearMe</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul className="footer-links">
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
                <li><Link to="/industry-problems">Industry Problems</Link></li>
                <li><Link to="/articles">Articles</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <ul className="footer-links">
                <li><Link to="/get-started">Get Started</Link></li>
                <li><a href="mailto:contact@unielogics.com">Contact</a></li>
                <li><a href="mailto:contact@unielogics.com">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} UnieLogics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
