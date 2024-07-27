import React from 'react';
import './Modal.css';

const Modal = ({ hero, onClose }) => {
  if (!hero) return null;

  const { name, powerstats } = hero;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{name}</h2>
        <div className="modal-content">
          <p>Intelligence: {powerstats.intelligence}</p>
          <p>Strength: {powerstats.strength}</p>
          <p>Speed: {powerstats.speed}</p>
          <p>Durability: {powerstats.durability}</p>
          <p>Power: {powerstats.power}</p>
          <p>Combat: {powerstats.combat}</p>
        </div>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
