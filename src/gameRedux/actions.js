import * as actionTypes from "./actionTypes";

const setCurrentPage = (pageName, resetIndexes) => {
  return { type: actionTypes.SET_CURRENT_PAGE, pageName, resetIndexes };
};

const registerControl = yIndex => {
  return { type: actionTypes.REGISTER_CONTROL, yIndex };
};

const updateControl = pageName => {
  return { type: actionTypes.UPDATE_CONTROL, pageName };
};

const setLastSliderChild = (pageName, element) => {
  return { type: actionTypes.SET_LAST_SLIDER_CHILD, pageName, element };
};

const setActive = (yIndex, active) => {
  return { type: actionTypes.SET_ACTIVE, yIndex, active };
};

const onLeft = () => {
  return { type: actionTypes.ON_LEFT };
};

const onRight = () => {
  return { type: actionTypes.ON_RIGHT };
};

const onUp = () => {
  return { type: actionTypes.ON_UP };
};

const onDown = () => {
  return { type: actionTypes.ON_DOWN };
};

const onSaveAllCards = cardArray => {
  return { type: actionTypes.SAVE_ALL_CARDS, cardArray };
};

const onSaveCardsHtml = elementArray => {
  return { type: actionTypes.SAVE_ALL_CARDS_HTML, elementArray };
};

const onSaveCardStyle = elementStyle => {
  return { type: actionTypes.SAVE_CARD_STYLE, elementStyle };
};

const onCardFlip = card => {
  return { type: actionTypes.ON_CARD_FLIP, card };
};

const onSetGameIntro = bool => {
  return { type: actionTypes.SET_GAME_INTRO, bool };
};

const onSetGameLives = lives => {
  return { type: actionTypes.SET_GAME_LIVES, lives };
};

const onUnflipOldCards = cards => {
  return { type: actionTypes.UNFLIP_OLD_CARDS, cards };
};

const onResetGame = () => {
  return { type: actionTypes.onResetGame };
};

export {
  setCurrentPage,
  setActive,
  registerControl,
  onLeft,
  onRight,
  onUp,
  onDown,
  updateControl,
  setLastSliderChild,
  onSaveAllCards,
  onCardFlip,
  onSaveCardsHtml,
  onSaveCardStyle,
  onSetGameIntro,
  onSetGameLives,
  onUnflipOldCards
};
