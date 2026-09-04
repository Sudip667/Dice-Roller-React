import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import dice1 from './assets/1.png';
import dice2 from './assets/2.png';
import dice3 from './assets/3.png';
import dice4 from './assets/4.png';
import dice5 from './assets/5.png';
import dice6 from './assets/6.png';

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

function App() {
  const [count, setCount] = useState(1);
  const [values, setValues] = useState([]);

  const rollDice = () => {
    const safeCount = Math.min(Math.max(Number(count) || 1, 1), 20);
    setCount(safeCount);
    setValues(Array.from({ length: safeCount }, () => Math.floor(Math.random() * 6) + 1));
  };

  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <main className="app">
      <section className="dice-card">
        <div className="badge">🎲 RANDOM GAME</div>
        <h1>Dice Roller</h1>
        <p className="subtitle">Choose how many dice to roll and let luck decide.</p>

        <div className="controls">
          <label htmlFor="diceCount">Number of dice</label>
          <div className="input-row">
            <input
              id="diceCount"
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && rollDice()}
            />
            <button onClick={rollDice}>Roll Dice <span>→</span></button>
          </div>
        </div>

        {values.length > 0 ? (
          <div className="result-area">
            <div className="result-summary">
              <span>Rolled values</span>
              <strong>{values.join(' • ')}</strong>
              <small>Total: {total}</small>
            </div>
            <div className="dice-grid">
              {values.map((value, index) => (
                <img key={`${value}-${index}`} src={diceImages[value - 1]} alt={`Dice showing ${value}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">Click <b>Roll Dice</b> to start 🎯</div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
