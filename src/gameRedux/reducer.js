import * as actionTypes from "./actionTypes";

const initialState = {
  cards: [], cardsHtml: [], htmlSaved: false, disabled: [], flippedCards: [],
  cardsPressed: 0, tempCurrentCard: null, lastCard: null,
  score: 0, lives: null, moves: 0, intro: false, gameOver: false, won: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_GAME":
      return { ...initialState, cards: action.cards, lives: action.cards.length / 2 };
    case actionTypes.SAVE_ALL_CARDS:
      return { ...state, cards: action.cardArray };
    case actionTypes.SAVE_ALL_CARDS_HTML:
      return { ...state, cardsHtml: action.elementArray, htmlSaved: true };
    case actionTypes.SET_GAME_LIVES:
      return { ...state, lives: action.lives };
    case actionTypes.SET_GAME_INTRO:
      return { ...state, intro: action.bool };
    case actionTypes.UNFLIP_OLD_CARDS:
      return { ...state, cardsPressed: 0, tempCurrentCard: null, lastCard: null,
        flippedCards: state.flippedCards.filter(id => state.disabled.includes(state.cards[id]) || !action.cards.includes(id)) };
    case actionTypes.ON_CARD_FLIP: {
      const card = state.cards[action.card];
      if (!card || state.gameOver || state.intro || state.cardsPressed >= 2 ||
          state.flippedCards.includes(action.card) || state.disabled.includes(card)) return state;
      const flippedCards = [...state.flippedCards, action.card];
      if (state.cardsPressed === 0) return { ...state, flippedCards, cardsPressed: 1, tempCurrentCard: action.card };
      const first = state.cards[state.tempCurrentCard];
      if (first.value === card.value) {
        const disabled = [...state.disabled, first, card];
        const won = disabled.length === state.cards.length;
        return { ...state, disabled, flippedCards, score: state.score + 50, lives: state.lives + 1,
          moves: state.moves + 1, cardsPressed: 0, tempCurrentCard: null, lastCard: null, won, gameOver: won };
      }
      const lives = Math.max(0, state.lives - 1);
      return { ...state, flippedCards, cardsPressed: 2, lastCard: state.tempCurrentCard,
        tempCurrentCard: action.card, moves: state.moves + 1, lives, gameOver: lives === 0 };
    }
    default: return state;
  }
}
