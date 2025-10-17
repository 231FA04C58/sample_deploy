import { useState } from 'react'
import { usePlanner } from '../contexts/PlannerContext'
import { allRecipes } from '../data/recipeData'
import RecipeImage from '../components/RecipeImage'

const recipes = allRecipes

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const Planner = () => {
  const { mealPlan, addToDay, clearPlan, getShoppingList, getRecipeIngredients } = usePlanner()
  const [draggedRecipe, setDraggedRecipe] = useState(null)
  const [dragOverDay, setDragOverDay] = useState(null)

  const handleDragStart = (recipeName) => {
    setDraggedRecipe(recipeName)
  }

  const handleDragOver = (e, day) => {
    e.preventDefault()
    setDragOverDay(day)
  }

  const handleDragLeave = () => {
    setDragOverDay(null)
  }

  const handleDrop = (e, day) => {
    e.preventDefault()
    if (draggedRecipe) {
      addToDay(day, draggedRecipe)
    }
    setDraggedRecipe(null)
    setDragOverDay(null)
  }

  const shoppingList = getShoppingList()

  return (
    <div className="container planner-page">
      <h1>Weekly Meal Planner</h1>
      <p className="muted">Select recipes for each day to plan your week.</p>

      <div className="planner-grid">
        <aside className="planner-recipes">
          <h3>All Recipes ({recipes.length})</h3>
          <p className="muted" style={{marginBottom: '1rem'}}>Drag recipes to days to plan your week</p>
          <div className="card-grid small">
            {recipes.map((recipe) => (
              <div
                key={recipe.name}
                className="card"
                draggable="true"
                onDragStart={() => handleDragStart(recipe.name)}
              >
                <RecipeImage src={recipe.image} alt={recipe.name} />
                <h4>{recipe.name}</h4>
                <p className="muted" style={{fontSize: '0.75rem', padding: '0.5rem'}}>{recipe.category}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="planner">
          <h2>Your Plan</h2>
          <div className="planner-days">
            {days.map((day) => (
              <div key={day} className="day">
                <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                <div
                  className={`slot ${dragOverDay === day ? 'dragover' : ''}`}
                  onDragOver={(e) => handleDragOver(e, day)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, day)}
                >
                  {mealPlan[day] && (
                    <div
                      className="card"
                      draggable="true"
                      onDragStart={() => handleDragStart(mealPlan[day])}
                    >
                      <h4>{mealPlan[day]}</h4>
                      <p className="muted">{getRecipeIngredients(mealPlan[day])}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="planner-actions">
            <button className="btn primary">Generate Shopping List</button>
            <button className="btn outline" onClick={clearPlan}>Clear Plan</button>
          </div>

          <div className="shopping-list">
            <h3>Shopping List</h3>
            <ul>
              {shoppingList.length > 0 ? (
                shoppingList.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))
              ) : (
                <li className="muted">No ingredients needed. Add some recipes to your plan!</li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Planner

