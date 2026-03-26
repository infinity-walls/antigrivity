import React, { useRef } from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, activeCategory, onSelect }) => {
  const scrollRef = useRef(null);
  
  // Custom drag to scroll or just styling for premium feel
  return (
    <div className="category-section">
      <div className="container">
        <div className="category-scroll" ref={scrollRef}>
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
