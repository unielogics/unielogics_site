export default function TrustIndicators() {
  // Placeholder for client logos, certifications, etc.
  // This can be populated with actual data later
  return (
    <section className="trust-indicators">
      <div className="section-title">Trusted By Market Leaders</div>
      <p className="micro" style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        UnieLogics serves investors, enterprise sellers, brands, warehouse operators, and carrier operators who are unifying market activity and fixing industry discrepancies.
      </p>
      <div className="trust-grid">
        {/* Placeholder for client logos - can be replaced with actual logos */}
        <div className="trust-item">
          <div className="trust-logo-placeholder">Enterprise Brand</div>
        </div>
        <div className="trust-item">
          <div className="trust-logo-placeholder">Warehouse Operator</div>
        </div>
        <div className="trust-item">
          <div className="trust-logo-placeholder">Carrier Network</div>
        </div>
        <div className="trust-item">
          <div className="trust-logo-placeholder">3PL Provider</div>
        </div>
      </div>
      
      <div className="security-badges">
        <div className="badge-item">
          <span className="badge-icon">🔒</span>
          <span>Enterprise Security</span>
        </div>
        <div className="badge-item">
          <span className="badge-icon">📊</span>
          <span>Predictive Intelligence</span>
        </div>
        <div className="badge-item">
          <span className="badge-icon">🌐</span>
          <span>Market-Wide Network</span>
        </div>
        <div className="badge-item">
          <span className="badge-icon">⚡</span>
          <span>Real-Time Optimization</span>
        </div>
      </div>
    </section>
  )
}
