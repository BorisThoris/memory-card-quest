import reducer from "./reducer";
import * as actionTypes from "./actionTypes";

const buildState = cards => {
  let state = reducer(undefined, { type: "@@INIT" });
  state = reducer(state, { type: actionTypes.SAVE_ALL_CARDS, cardArray: cards });
  state = reducer(state, {
    type: actionTypes.SAVE_ALL_CARDS_HTML,
    elementArray: cards.map(card => ({ index: card.id, style: {} }))
  });
  return reducer(state, { type: actionTypes.SET_GAME_LIVES, lives: 3 });
};

describe("game reducer card flips", () => {
  it("allows card id 0 through a mismatch and delayed unflip", () => {
    const cards = [
      { key: 0, id: 0, value: "a" },
      { key: 1, id: 1, value: "b" }
    ];

    const firstFlip = reducer(buildState(cards), {
      type: actionTypes.ON_CARD_FLIP,
      card: 0
    });
    const mismatch = reducer(firstFlip, {
      type: actionTypes.ON_CARD_FLIP,
      card: 1
    });
    const unflipped = reducer(mismatch, {
      type: actionTypes.UNFLIP_OLD_CARDS,
      cards: [0, 1]
    });

    expect(firstFlip.flippedCards).toEqual([0]);
    expect(mismatch.flippedCards).toEqual([0, 1]);
    expect(unflipped.flippedCards).toEqual([]);
    expect(unflipped.cardsPressed).toBe(0);
    expect(unflipped.tempCurrentCard).toBeNull();
    expect(unflipped.lastCard).toBeNull();
  });

  it("keeps matched cards flipped and disabled during later unflip handling", () => {
    const cards = [
      { key: 0, id: 0, value: "a" },
      { key: 1, id: 1, value: "a" },
      { key: 2, id: 2, value: "b" },
      { key: 3, id: 3, value: "b" }
    ];

    const firstFlip = reducer(buildState(cards), {
      type: actionTypes.ON_CARD_FLIP,
      card: 0
    });
    const match = reducer(firstFlip, {
      type: actionTypes.ON_CARD_FLIP,
      card: 1
    });
    const afterUnflip = reducer(match, {
      type: actionTypes.UNFLIP_OLD_CARDS,
      cards: [0, 1]
    });
    const repeatedClick = reducer(afterUnflip, {
      type: actionTypes.ON_CARD_FLIP,
      card: 0
    });

    expect(match.disabled).toEqual([cards[0], cards[1]]);
    expect(match.disabled).not.toBe(firstFlip.disabled);
    expect(afterUnflip.flippedCards).toEqual([0, 1]);
    expect(repeatedClick.flippedCards).toEqual([0, 1]);
  });

  it("does not add duplicate flipped entries for repeated clicks", () => {
    const cards = [
      { key: 0, id: 0, value: "a" },
      { key: 1, id: 1, value: "b" }
    ];

    const firstFlip = reducer(buildState(cards), {
      type: actionTypes.ON_CARD_FLIP,
      card: 0
    });
    const repeatedClick = reducer(firstFlip, {
      type: actionTypes.ON_CARD_FLIP,
      card: 0
    });

    expect(repeatedClick.flippedCards).toEqual([0]);
    expect(repeatedClick.cardsPressed).toBe(1);
  });
});
