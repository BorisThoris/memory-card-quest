import * as actionTypes from "./actionTypes";

const initialState = {
  cardsPressed: 0,
  score: 0,
  lives: null,

  pages: {},
  cardsHtml: [],
  cards: [],
  disabled: [],

  currentPage: null,
  active: null,
  tempCurrentCard: null,
  lastCard: null,

  htmlSaved: false,
  matched: false,
  intro: false,
  gameOver: false,
  flippedCards: []
};

const pageReducer = (state = initialState, action) => {
  const pageName = action.pageName ? action.pageName : state.currentPage;
  const newPages = { ...state.pages };

  let cardsPressed = state.cardsPressed;
  let currentCard = state.tempCurrentCard;
  //let tempCurrentCard = state.cardTwo;

  let matched = state.matched;
  let htmlSaved = state.htmlSaved;
  let tempintro = state.intro;
  let tempLastCard = state.lastCard;
  let tempLives = state.lives;
  let tempScore = state.score;
  let tempGameOver = state.gameOver;
  let tempFlippedCards = state.flippedCards;
  let tempDisabled = state.disabled;

  let tempArr = [];
  for (let i = 0; i < state.cards.length; i++) {
    tempArr.push(state.cards[i]);
  }

  let newCards = tempArr;
  let newCardsHtml = state.cardsHtml;

  switch (action.type) {
    /* important */

    case actionTypes.SET_GAME_INTRO:
      // let bool = action.bool;
      tempintro = action.bool;

      break;

    case actionTypes.SET_GAME_LIVES:
      // let bool = action.bool;
      tempLives = action.lives;

      break;

    case actionTypes.SAVE_CARD_STYLE:
      break;

    case actionTypes.SAVE_ALL_CARDS:
      newCards = action.cardArray;
      break;

    case actionTypes.SAVE_ALL_CARDS_HTML:
      newCardsHtml = action.elementArray;
      htmlSaved = true;
      break;

    case actionTypes.UNFLIP_OLD_CARDS:
      tempFlippedCards = state.flippedCards.filter(cardId => {
        const cardIsMatched = state.disabled.includes(state.cards[cardId]);
        return cardIsMatched || !action.cards.includes(cardId);
      });

      cardsPressed = 0;
      tempLastCard = null;
      currentCard = null;

      break;

    case actionTypes.ON_CARD_FLIP:
      let tempCurrentCard = state.tempCurrentCard;
      let cards = state.cards;
      let disabled = state.disabled;

      if (
        cardsPressed >= 2 ||
        tempFlippedCards.includes(action.card) ||
        disabled.includes(cards[action.card])
      ) {
        break;
      }

      const matchBool =
        cards[action.card] &&
        cards[tempCurrentCard] &&
        cards[action.card].value === cards[tempCurrentCard].value &&
        cards[action.card] !== cards[tempCurrentCard];

      if (newCardsHtml[action.card]) {
        newCardsHtml[action.card].style = { backgroundColor: "red" };
      }

      matched = false;

      if (cardsPressed < 2) {
        cardsPressed++;

        currentCard = action.card;
        tempLastCard = state.tempCurrentCard;
        tempFlippedCards = [...tempFlippedCards, currentCard];
      }

      if (cardsPressed === 2) {
        if (matchBool) {
          matched = true;
          tempScore += 50;
          tempLives++;

          cardsPressed = 0;
          tempDisabled = [...disabled, cards[tempCurrentCard], cards[action.card]];

          if (cards.length === tempDisabled.length) {
            window.alert("SuCcEsS");
          }
        } else {
          currentCard = action.card;

          if (currentCard !== tempLastCard) {
            tempLives--;
          }

          // tempLastCard = null;
          // currentCard = null;

          if (tempLives === 0) {
            tempGameOver = true;
          }

          // cardsPressed = 0;
          break;
        }
      }

      break;

    default:
      return state;
  }

  return {
    ...state,
    pages: newPages,
    currentPage: pageName,
    test: "123",
    cards: newCards,
    cardsPressed: cardsPressed,
    tempCurrentCard: currentCard,
    lastCard: tempLastCard,
    matched: matched,
    htmlSaved: htmlSaved,
    cardsHtml: newCardsHtml,
    intro: tempintro,
    lives: tempLives,
    score: tempScore,
    gameOver: tempGameOver,
    flippedCards: tempFlippedCards,
    disabled: tempDisabled
  };
};

export default pageReducer;
