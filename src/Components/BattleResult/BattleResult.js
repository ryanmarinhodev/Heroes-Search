import React from 'react';
import './BattleResult.css';

const BattleResult = ({ hero1, hero2, result }) => {
  return (
    <div className="battle-result">
      <h2>Resultado da Batalha</h2>
      <div className="battle-heroes">
        <div className="battle-hero">
          <img src={hero1.images.md} alt={hero1.name} />
          <p>{hero1.name}</p>
        </div>
        <div className="battle-hero">
          <img src={hero2.images.md} alt={hero2.name} />
          <p>{hero2.name}</p>
        </div>
      </div>
      <h3 className='name-result'>{result}</h3>
    </div>
  );
};

export default BattleResult;
