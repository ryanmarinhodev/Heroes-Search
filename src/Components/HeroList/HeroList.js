import React from 'react';
import './HeroList.css';

const HeroList = ({ heroes, onHeroClick, onHeroSelect, selectedHeroes }) => {
  return (
    <div className="hero-list">
      {heroes.map(hero => (
        <div 
          key={hero.id} 
          className={`hero-item ${selectedHeroes.includes(hero.id) ? 'selected' : ''}`}
        >
          <img 
            src={hero.images.md} 
            alt={hero.name} 
            className="hero-image"
            onClick={() => onHeroClick(hero)}
          />
          <p className="hero-name">{hero.name}</p>
          <button onClick={() => onHeroSelect(hero)}>Batalhar</button>
        </div>
      ))}
    </div>
  );
};

export default HeroList;
