import React from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

const Hero = ({ onSearch }) => {
  return (
    <section className="hero">
      <div className="hero-bg-glow"></div>
      <div className="container hero-content animate-fade-in">
        <div className="search-wrapper glass">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search for nature, cyberpunk, abstract..." 
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="btn-search">Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
