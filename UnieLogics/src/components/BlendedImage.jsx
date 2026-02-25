export default function BlendedImage({ 
  src, 
  alt, 
  blendMode = 'overlay', 
  opacity = 1,
  gradientOverlay = true,
  className = '',
  style = {}
}) {
  return (
    <div 
      className={`blended-image ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          mixBlendMode: blendMode,
          opacity: opacity,
          transition: 'opacity 0.3s ease, transform 0.3s ease'
        }}
      />
      {gradientOverlay && (
        <div
          className="blended-image-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, 
              rgba(7, 8, 11, 0.3), 
              rgba(7, 8, 11, 0.7)
            )`,
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  )
}
