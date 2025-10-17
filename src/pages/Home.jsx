import { Link } from 'react-router-dom'
import { useState } from 'react'
import AIGenerator from '../components/AIGenerator'
import RecipeSearch from '../components/RecipeSearch'
import RecipeImage from '../components/RecipeImage'
import { useFavorites } from '../hooks/useFavorites'
import { allRecipes } from '../data/recipeData'

const Home = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes)
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const handleFilter = ({ search, tag }) => {
    let filtered = allRecipes

    // Filter by tag
    if (tag !== 'all') {
      filtered = filtered.filter(recipe => recipe.tags.toLowerCase().includes(tag.toLowerCase()))
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.tags.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilteredRecipes(filtered)
  }

  const handleFavoriteClick = (e, recipeId) => {
    e.preventDefault()
    toggleFavorite(recipeId)
  }

  return (
    <div className="container">
      <section className="hero">
        <div>
          <h1>Find tasty recipes tailored to you</h1>
          <p>Smart suggestions, weekly meal plans, and shopping lists — all in one bright, easy app.</p>
          <div className="hero-actions">
            <Link to="/planner" className="btn primary">Start Planning</Link>
            <a href="#explore" className="btn outline">Explore Recipes</a>
          </div>
        </div>
      </section>

      <section className="recipes-grid" id="explore">
        <h2>All Recipes ({filteredRecipes.length})</h2>
        
        <RecipeSearch onFilter={handleFilter} />

        <div className="card-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <Link key={recipe.id} className="card recipe-card" to={`/recipe/${recipe.id}`}>
                <div className="card-image-wrapper">
                  <RecipeImage src={recipe.image} alt={recipe.name} />
                  <button 
                    className={`favorite-btn ${isFavorite(recipe.id) ? 'active' : ''}`}
                    onClick={(e) => handleFavoriteClick(e, recipe.id)}
                  >
                    <i className={isFavorite(recipe.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
                  </button>
                </div>
                <div className="card-content">
                  <h3>{recipe.name}</h3>
                  <div className="recipe-meta-small">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <span>{recipe.rating}</span>
                    </div>
                    <p className="muted">{recipe.tags}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No recipes found. Try different search terms!</p>
            </div>
          )}
        </div>
      </section>

      <AIGenerator />

      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-magic"></i>
            </div>
            <h3>Personalized Suggestions</h3>
            <p>Tell SmartChef what you like and get recipes matched to your taste and diet.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>Weekly Planner</h3>
            <p>Drag-and-drop recipes into days, auto-generate a shopping list.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Save & Share</h3>
            <p>Save favorites, share meal plans with friends or export as PDF.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
