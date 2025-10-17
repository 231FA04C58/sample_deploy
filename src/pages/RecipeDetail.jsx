import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import CookingTimer from '../components/CookingTimer'
import RecipeImage from '../components/RecipeImage'
import { useFavorites } from '../hooks/useFavorites'
import { getRecipeDetails } from '../data/recipeDetails'

const RecipeDetail = () => {
  const { id } = useParams()
  const recipe = getRecipeDetails(id)
  const [servings, setServings] = useState(parseInt(recipe?.servings) || 4)
  const [timerOpen, setTimerOpen] = useState(false)
  const { toggleFavorite, isFavorite } = useFavorites()
  
  const baseServings = parseInt(recipe?.servings) || 4

  if (!recipe) {
    return (
      <div className="container">
        <h1>Recipe not found</h1>
        <Link to="/" className="btn primary">Back to Home</Link>
      </div>
    )
  }

  const adjustServings = (newServings) => {
    if (newServings > 0 && newServings <= 20) {
      setServings(newServings)
    }
  }

  return (
    <div className="container">
      <article className="recipe-page">
        <div className="recipe-header-actions">
          <button 
            className={`favorite-btn-large ${isFavorite(parseInt(id)) ? 'active' : ''}`}
            onClick={() => toggleFavorite(parseInt(id))}
          >
            <i className={isFavorite(parseInt(id)) ? 'fas fa-heart' : 'far fa-heart'}></i>
            {isFavorite(parseInt(id)) ? ' Saved' : ' Save Recipe'}
          </button>
          <button className="timer-btn" onClick={() => setTimerOpen(true)}>
            <i className="fas fa-clock"></i> Set Timer
          </button>
        </div>
        
        <RecipeImage src={recipe.image} alt={recipe.name} />
        <h1>{recipe.name}</h1>
        <p className="muted">Tags: {recipe.tags}</p>

        <div className="recipe-meta">
          <div className="meta-item">
            <h4>Prep Time</h4>
            <p>{recipe.prepTime}</p>
          </div>
          <div className="meta-item">
            <h4>Cook Time</h4>
            <p>{recipe.cookTime}</p>
          </div>
          <div className="meta-item">
            <h4>Servings</h4>
            <div className="serving-adjuster">
              <button onClick={() => adjustServings(servings - 1)}>
                <i className="fas fa-minus"></i>
              </button>
              <span className="serving-count">{servings}</span>
              <button onClick={() => adjustServings(servings + 1)}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          {recipe.steps.map((step, index) => (
            <div key={index} className="step">
              <h4>Step {index + 1}: {step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        {recipe.notes && (
          <>
            <h3>Chef's Notes</h3>
            <p>{recipe.notes}</p>
          </>
        )}

        <div className="recipe-actions">
          <Link to="/planner" className="btn primary">
            <i className="fas fa-calendar-plus"></i> Add to Meal Plan
          </Link>
          <button className="btn outline" onClick={() => window.print()}>
            <i className="fas fa-print"></i> Print Recipe
          </button>
          <Link to="/" className="btn outline">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </article>
      
      <CookingTimer isOpen={timerOpen} onClose={() => setTimerOpen(false)} />
    </div>
  )
}

export default RecipeDetail
