import { useState } from 'react'

const RecipeImage = ({ src, alt, className = '' }) => {
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fallback placeholder image - use a reliable food image
  const fallbackImage = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop'

  const handleError = () => {
    setImageError(true)
    setLoading(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <img
      src={imageError ? fallbackImage : src}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      style={{
        opacity: loading ? 0.7 : 1,
        transition: 'opacity 0.3s ease'
      }}
    />
  )
}

export default RecipeImage

