export default function ProductDetail({ product }) {
  const oneLiner = product.description.split('.')[0] + (product.description.includes('.') ? '.' : '')
  return (
    <div className={`product-detail-card ${product.highlight ? 'highlight' : ''}`}>
      <div className="product-detail-header">
        <h3>{product.name}</h3>
        {product.status && (
          <span className={`product-status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
            {product.status}
          </span>
        )}
      </div>
      <p className="product-detail-description">{oneLiner}</p>
      {product.link && (
        <div className="product-cta" style={{ marginTop: '16px' }}>
          <a className="btn" href={product.link} target="_blank" rel="noopener noreferrer">
            Visit {product.name}
          </a>
        </div>
      )}
    </div>
  )
}
