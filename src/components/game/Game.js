import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../gameRedux/actionTypes";
import "./game.css";

export function createDeck(pairs = 6) {
  const values = Array.from({ length: pairs * 2 }, (_, index) => Math.floor(index / 2));
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values.map((value, id) => ({ id, key: id, value }));
}
const symbols = ["☀", "☾", "★", "♠", "♥", "◆", "♣", "✿", "♫", "⚓"];
const names = ["Sun", "Moon", "Star", "Spade", "Heart", "Diamond", "Clover", "Flower", "Music", "Anchor"];
function readBest(pairs) {
  try { const value = Number(localStorage.getItem(`memory-quest-best-${pairs}`)); return Number.isInteger(value) && value >= pairs ? value : null; } catch (_) { return null; }
}
function Game({ game, dispatch }) {
  const [nextPairs, setNextPairs] = useState(6);
  const [best, setBest] = useState(null);
  const [saved, setSaved] = useState(true);
  const board = useRef(null);
  const pairs = game.cards.length / 2 || 6;
  const found = game.disabled.length / 2;
  const restart = () => { dispatch({ type: "NEW_GAME", cards: createDeck(nextPairs) }); setBest(readBest(nextPairs)); setSaved(true); };
  useEffect(() => { dispatch({ type: "NEW_GAME", cards: createDeck() }); setBest(readBest(6)); }, [dispatch]);
  useEffect(() => {
    if (game.cardsPressed !== 2 || game.gameOver) return undefined;
    const timer = setTimeout(() => dispatch({ type: actionTypes.UNFLIP_OLD_CARDS,
      cards: [game.tempCurrentCard, game.lastCard] }), 850);
    return () => clearTimeout(timer);
  }, [game.cardsPressed, game.tempCurrentCard, game.lastCard, game.gameOver, dispatch]);
  useEffect(() => {
    if (!game.won) return;
    const previous = readBest(pairs);
    const record = previous === null ? game.moves : Math.min(previous, game.moves);
    setBest(record);
    try { localStorage.setItem(`memory-quest-best-${pairs}`, String(record)); } catch (_) { setSaved(false); }
  }, [game.won, game.moves, pairs]);
  const navigate = event => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const cards = Array.from(board.current.querySelectorAll('button'));
    const columns = getComputedStyle(board.current).gridTemplateColumns.split(' ').length;
    const step = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' ? -columns : columns;
    let index = cards.indexOf(event.currentTarget);
    for(let i=0;i<cards.length;i++) { index=(index+step+cards.length)%cards.length; if(!cards[index].disabled) { cards[index].focus(); break; } }
  };
  const message = game.gameOver ? (game.won ? `All ${pairs} pairs found in ${game.moves} moves.` : 'Out of hearts. You can still study the board before trying again.') : game.cardsPressed === 2 ? 'Not quite. Take a moment to remember these two.' : game.cardsPressed === 1 ? 'One card open. Where is its pair?' : found ? 'A pair secured. Find the next one.' : 'Choose two cards. Let the patterns settle in.';
  return <main className="quest">
    <header className="quest-header"><div><p className="eyebrow">A LITTLE FOCUS. A LITTLE LUCK.</p><h1>Memory Card Quest</h1><p>Find the pairs. A miss costs a heart; a match brings one back.</p></div><div className="quest-setup"><label htmlFor="difficulty">Your next board</label><select id="difficulty" value={nextPairs} onChange={event => setNextPairs(Number(event.target.value))}><option value={6}>Gentle · 6 pairs</option><option value={8}>Classic · 8 pairs</option><option value={10}>Challenge · 10 pairs</option></select><button className="restart" onClick={restart}>New game</button></div></header>
    <section className="quest-stats" aria-label="Game statistics"><span>HEARTS<strong>{game.lives || 0} <small>♥</small></strong></span><span>PAIRS FOUND<strong>{found}<small> / {pairs}</small></strong></span><span>MOVES<strong>{game.moves}</strong></span><span>BEST · {pairs} PAIRS<strong>{best || '—'}<small>{best ? ' moves' : ''}</small></strong></span></section>
    <div className={`quest-status ${game.gameOver ? 'finished' : ''}`} role="status"><span>{game.won ? '✦ Quest complete. ' : ''}{message}</span>{game.gameOver && <button className="restart" onClick={restart}>Play again</button>}</div>
    <div className="quest-progress" role="progressbar" aria-label="Pairs found" aria-valuemin={0} aria-valuemax={pairs} aria-valuenow={found}><span style={{width:`${found/pairs*100}%`}} /></div>
    <section ref={board} className={`quest-board pairs-${pairs}`} aria-label="Memory cards">
      {game.cards.map(card => {
        const matched = game.disabled.includes(card), revealed = game.flippedCards.includes(card.id);
        return <button key={card.id} className={`quest-card ${revealed ? 'revealed' : ''} ${matched ? 'matched' : ''}`} aria-label={`Card ${card.id+1}${revealed ? `: ${names[card.value]}${matched ? ', matched' : ''}` : ', hidden'}`} aria-pressed={revealed} disabled={matched || game.gameOver || (game.cardsPressed===2 && !revealed)} onKeyDown={navigate} onClick={()=>dispatch({type:actionTypes.ON_CARD_FLIP,card:card.id})}>
          <span className="card-face card-back" aria-hidden="true"><span>✦</span><small>{String(card.id+1).padStart(2,'0')}</small></span><span className="card-face card-front" aria-hidden="true"><span>{symbols[card.value]}</span><small>{matched?'✓ '+names[card.value]:names[card.value]}</small></span>
        </button>;
      })}
    </section>
    <footer className="quest-footer"><span>{game.moves ? Math.round(found/game.moves*100)+'% matching accuracy' : 'A calm challenge, one pair at a time.'}</span><span>Tab or arrows to choose · Enter to turn</span></footer>
    {!saved && <p className="quest-hint">Storage unavailable. Your best result is kept for this visit.</p>}
  </main>;
}
export default connect(state => ({ game: state }))(Game);
