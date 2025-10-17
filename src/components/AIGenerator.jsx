import { useState } from 'react'
import { generateAIRecipe } from '../services/aiRecipeService'

const AIGenerator = () => {
  const [ingredients, setIngredients] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateRecipe = async () => {
    if (ingredients.trim() === '') {
      setError('Please enter at least one ingredient.')
      setResult(null)
      return
    }

    setError('')
    setLoading(true)
    setResult(null)

    // Simulate AI processing delay for better UX
    setTimeout(async () => {
      try {
        const recipe = await generateAIRecipe(ingredients)
        setResult(recipe)
      } catch (error) {
        setError('Failed to generate recipe. Please try again.')
      } finally {
        setLoading(false)
      }
    }, 1500)
  }


  return (
    <section className="ai-generator">
      <div className="ai-header">
        <h2><i className="fas fa-robot"></i> AI-Powered Recipe Generator</h2>
        <p className="muted">Enter ingredients you have, and our advanced AI will create a personalized recipe!</p>
      </div>
      <div className="input-group">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., chicken, broccoli, rice, garlic, soy sauce"
          onKeyPress={(e) => e.key === 'Enter' && generateRecipe()}
        />
        <button className="btn primary" onClick={generateRecipe}>
          <i className="fas fa-magic"></i> Generate Recipe
        </button>
      </div>
      <div className="ai-result">
        {error && <div className="error"><i className="fas fa-exclamation-circle"></i> {error}</div>}
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>🤖 AI analyzing ingredients and creating your custom recipe...</p>
          </div>
        )}
        {result && (
          <div className="generated-recipe">
            <div className="recipe-header-ai">
              <h3><i className="fas fa-utensils"></i> {result.name}</h3>
              <div className="recipe-badges">
                <span className="badge cuisine">{result.cuisine}</span>
                <span className="badge difficulty">{result.difficulty}</span>
              </div>
            </div>
            
            <div className="recipe-quick-info">
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Time</strong>
                  <p>{result.prepTime}</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-users"></i>
                <div>
                  <strong>Servings</strong>
                  <p>{result.servings}</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-fire"></i>
                <div>
                  <strong>Calories</strong>
                  <p>{result.nutrition.calories} kcal</p>
                </div>
              </div>
            </div>

            <div className="nutrition-info">
              <h4><i className="fas fa-chart-pie"></i> Nutrition (per serving)</h4>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">{result.nutrition.protein}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{result.nutrition.carbs}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fat</span>
                  <span className="nutrition-value">{result.nutrition.fat}g</span>
                </div>
              </div>
            </div>
            
            <div className="recipe-section">
              <h4><i className="fas fa-list"></i> Ingredients</h4>
              <div className="ingredient-list">
                {result.ingredients.map((ingredient, index) => (
                  <span key={index} className="ingredient-tag">{ingredient}</span>
                ))}
              </div>
            </div>
            
            <div className="recipe-section">
              <h4><i className="fas fa-clipboard-list"></i> Cooking Instructions</h4>
              <div className="cooking-steps">
                {result.steps.map((step, index) => (
                  <div key={index} className="step-card">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <h5>{step.title}</h5>
                      <p>{step.description}</p>
                      <span className="step-time"><i className="fas fa-clock"></i> {step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="recipe-actions-ai">
              <button className="btn primary" onClick={() => window.print()}>
                <i className="fas fa-print"></i> Print Recipe
              </button>
              <button className="btn outline" onClick={() => setResult(null)}>
                <i className="fas fa-redo"></i> Generate Another
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AIGenerator
