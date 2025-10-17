import { useState } from 'react'

const RecipeSearch = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')

  const tags = ['all', 'vegetarian', 'vegan', 'pescatarian', 'gluten-free', 'quick']

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onFilter({ search: value, tag: selectedTag })
  }

  const handleTagFilter = (tag) => {
    setSelectedTag(tag)
    onFilter({ search: searchTerm, tag: tag })
  }

  return (
    <div className="recipe-search">
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search recipes by name or ingredient..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="tag-filters">
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => handleTagFilter(tag)}
          >
            {tag === 'all' ? 'All Recipes' : tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecipeSearch

