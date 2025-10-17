import { createContext, useContext, useState } from 'react'

const PlannerContext = createContext()

export const usePlanner = () => {
  const context = useContext(PlannerContext)
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerContext')
  }
  return context
}

// Recipe data
const recipesData = [
  { 
    name: 'Creamy Tomato Pasta', 
    ingredients: ['pasta', 'olive oil', 'garlic', 'crushed tomatoes', 'heavy cream', 'parmesan cheese', 'salt', 'pepper', 'fresh basil'] 
  },
  { 
    name: 'Grilled Lemon Salmon', 
    ingredients: ['salmon fillet', 'olive oil', 'lemon', 'garlic', 'dill', 'salt', 'pepper'] 
  },
  { 
    name: 'Avocado Toast Deluxe', 
    ingredients: ['bread', 'avocado', 'lime', 'garlic powder', 'salt', 'pepper', 'red pepper flakes', 'pumpkin seeds'] 
  },
  { 
    name: 'Chicken Caesar Salad', 
    ingredients: ['romaine lettuce', 'chicken breast', 'croutons', 'parmesan cheese', 'caesar dressing'] 
  },
  { 
    name: 'Vegetable Stir Fry', 
    ingredients: ['broccoli', 'carrots', 'bell pepper', 'snap peas', 'ginger', 'soy sauce', 'rice vinegar'] 
  }
]

export const PlannerProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({
    monday: null,
    tuesday: null,
    wednesday: 'Creamy Tomato Pasta',
    thursday: null,
    friday: null,
    saturday: 'Avocado Toast Deluxe',
    sunday: null
  })

  const addToDay = (day, recipeName) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: recipeName
    }))
  }

  const removeFromDay = (day) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: null
    }))
  }

  const clearPlan = () => {
    if (window.confirm('Are you sure you want to clear your meal plan?')) {
      setMealPlan({
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null
      })
    }
  }

  const getShoppingList = () => {
    const plannedRecipes = Object.values(mealPlan).filter(Boolean)
    const allIngredients = []
    
    plannedRecipes.forEach(recipeName => {
      const recipe = recipesData.find(r => r.name === recipeName)
      if (recipe) {
        recipe.ingredients.forEach(ingredient => {
          if (!allIngredients.includes(ingredient)) {
            allIngredients.push(ingredient)
          }
        })
      }
    })
    
    return allIngredients
  }

  const getRecipeIngredients = (recipeName) => {
    const recipe = recipesData.find(r => r.name === recipeName)
    return recipe ? recipe.ingredients.slice(0, 3).join(', ') : ''
  }

  const value = {
    mealPlan,
    addToDay,
    removeFromDay,
    clearPlan,
    getShoppingList,
    getRecipeIngredients,
    recipesData
  }

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
}

