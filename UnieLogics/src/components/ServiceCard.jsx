import { Link } from 'react-router-dom'

const BULLET_MAX = 3

export default function ServiceCard({ service, showBullets = false }) {
  const idealFor = service.idealFor && service.idealFor.length > 0
    ? service.idealFor.join(' · ')
    : null
  const bullets = showBullets && service.benefits
    ? service.benefits.slice(0, BULLET_MAX)
    : []

  return (
    <div className="service-card">
      <h3>{service.title}</h3>
      {idealFor && (
        <p className="service-ideal-for" aria-label={`Ideal for: ${idealFor}`}>
          {idealFor}
        </p>
      )}
      <p className="service-description">{service.description}</p>
      {bullets.length > 0 && (
        <ul className="service-bullets">
          {bullets.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      <div className="service-cta">
        <Link className="btn" to="/get-started">Request Consultation</Link>
      </div>
    </div>
  )
}
