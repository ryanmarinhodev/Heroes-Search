import React, { useState, useEffect } from 'react';
import HeroList from './Components/HeroList/HeroList';
import SearchBar from './Components/SearchBar/SearchBar';
import Modal from './Components/Modal/Modal';
import BattleResult from './Components/BattleResult/BattleResult';
import './App.css';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState(null);
  const [heroesForBattle, setHeroesForBattle] = useState([]);
  const [battleResult, setBattleResult] = useState(null);
  const [battleStarted, setBattleStarted] = useState(false);

  useEffect(() => {
    fetch('https://homologacao3.azapfy.com.br/api/ps/metahumans')
      .then(response => response.json())
      .then(data => {
        setHeroes(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        setIsLoading(false);
      });
  }, []);

  const filteredHeroes = heroes.filter(hero =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHeroClick = (hero) => {
    setSelectedHero(hero);
  };

  const addHeroForBattle = (hero) => {
    if (heroesForBattle.length < 2) {
      setHeroesForBattle(prev => [...prev, hero]);
    }
  };

  const initiateBattle = () => {
    if (heroesForBattle.length !== 2) return;

    const [hero1, hero2] = heroesForBattle;

    const hero1Stats = Object.values(hero1.powerstats).reduce((acc, stat) => acc + (stat || 0), 0);
    const hero2Stats = Object.values(hero2.powerstats).reduce((acc, stat) => acc + (stat || 0), 0);

    let result = '';
    if (hero1Stats > hero2Stats) {
      result = `${hero1.name} venceu!`;
    } else if (hero1Stats < hero2Stats) {
      result = `${hero2.name} venceu!`;
    } else {
      result = 'It\'s a tie!';
    }

    setBattleResult({ hero1, hero2, result });
    setBattleStarted(true);
  };

  const resetBattle = () => {
    setHeroesForBattle([]);
    setBattleResult(null);
    setBattleStarted(false);
  };

  const closeModal = () => setSelectedHero(null);

  return (
    <div className="App">
      <h1>Batalha de Heróis By Ryan Marinho</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="battle-control">
        {!battleStarted && heroesForBattle.length === 2 && (
          <button className="start-button" onClick={initiateBattle}>Iniciar Batalha</button>
        )}
        {battleResult && (
          <button className="reset-button" onClick={resetBattle}>Resetar Batalha</button>
        )}
      </div>
      {battleResult && <BattleResult {...battleResult} />}
      {isLoading ? (
        <p className='spinner'></p>
      ) : (
        <HeroList 
          heroes={filteredHeroes}
          onHeroClick={handleHeroClick}
          onHeroSelect={addHeroForBattle}
          selectedHeroes={heroesForBattle.map(hero => hero.id)}
        />
      )}
      <Modal hero={selectedHero} onClose={closeModal} />
    </div>
  );
}

export default App;
