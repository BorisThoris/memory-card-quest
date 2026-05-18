import React, { Component } from "react";
import * as actionTypes from "../../gameRedux/actionTypes";
import { connect } from "react-redux";
import Card from "../mysteryCard/Card";
import GameOver from "../gameOver";
import InformationDiv from "../informationDiv";
import ReplayButton from "../replayButton";

import "./game.css";
import bgnImage from "./gameBoardBackground.jpg";
// import { url } from "inspector";
// import cards from "../mysteryCard/Card";

class Game extends Component {
  componentDidMount() {
    const { saveCards, setIntro } = this.props;

    let cardCount = 12;

    let valuesCount = cardCount / 2;
    let vals = [];

    for (let i = 0; i < valuesCount; i++) {
      vals.push({ number: i, count: 0 });
    }

    let cards = [];
    for (let i = 0; i < cardCount; i++) {
      cards.push({ key: i, id: i, value: "empty" });
    }

    for (let i = 0; i < vals.length; i++) {
      while (vals[i].count < 2) {
        let card = cards[Math.floor(Math.random() * cards.length)];

        if (card.value === "empty") {
          card.value = vals[i].number;
          vals[i].count++;
        }
      }
    }

    setIntro(true);
    setTimeout(() => {
      setIntro(false);
    }, 325);
    saveCards(cards);
  }

  onClick = id => {
    const { flipCard, cards, disabled, gameIsOver, flippedCards } = this.props;

    if (
      !disabled.includes(cards[id]) &&
      !flippedCards.includes(id) &&
      !gameIsOver
    ) {
      flipCard(id);
    }
    // console.log((e.target.childNodes[0].style.display = "inline-block"));
  };

  render() {
    const {
      cards,
      saveCardsHtml,
      htmlSaved,
      cardStyles,
      activeCard,
      disabled,
      lastCard,
      setLives,
      lives,
      flippedCards,
      unFlipCards,
      cardsPressed
    } = this.props;

    let cardArray = [];
    let styleArray = [];

    let bool = false;
    let cardDisabled = false;

    if (lives === null && cards.length > 0) {
      setLives(cards.length / 2);
    }

    for (let i = 0; i < cards.length; i++) {
      if (i === activeCard || i === lastCard) {
        if (
          flippedCards.includes(activeCard) ||
          flippedCards.includes(lastCard)
        ) {
          bool = true;
        }
      }

      if (disabled.includes(cards[i])) {
        bool = true;
        cardDisabled = true;
      }

      cardArray.push(
        <Card
          id={cards[i].id}
          key={cards[i].key}
          value={cards[i].value}
          onClick={this.onClick}
          style={cardStyles[i] ? cardStyles[i].style : null}
          classToAdd={!disabled || bool ? "active" : null}
          disabled={cardDisabled}
        />
      );

      bool = false;
      styleArray.push({ index: cards[i].id, style: {} });

      cardDisabled = false;
    }

    if (activeCard !== null && lastCard !== null && cardsPressed === 2) {
      // window.alert("hey");
      setTimeout(() => {
        let cardsToFlip = [activeCard, lastCard];
        unFlipCards(cardsToFlip);
      }, 700);
    }

    if (!htmlSaved && styleArray.length > 0) saveCardsHtml(styleArray);

    // TO BE MADE INTO COMPONENTS

    return (
      <div id="appDiv">
        <InformationDiv />
        <GameOver />
        <ReplayButton />
        <div id="gameBoard" style={{ backgroundImage: `url(${bgnImage})` }}>
          <div id="cardsDiv">{cardArray ? cardArray : null}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    htmlSaved: state.htmlSaved,
    cardStyles: state.cardsHtml,
    activeCard: state.tempCurrentCard,
    cardTwo: state.cardTwo,
    disabled: state.disabled,
    lastCard: state.lastCard,
    lives: state.lives,
    score: state.score,
    gameIsOver: state.gameOver,
    flippedCards: state.flippedCards,
    cardsPressed: state.cardsPressed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setIntro: bool => dispatch({ type: actionTypes.SET_GAME_INTRO, bool }),
    onTest: () => dispatch({ type: actionTypes.ON_TEST }),
    saveCards: cardArray => {
      dispatch({ type: actionTypes.SAVE_ALL_CARDS, cardArray });
    },
    saveCardsHtml: elementArray => {
      dispatch({ type: actionTypes.SAVE_ALL_CARDS_HTML, elementArray });
    },
    flipCard: card => {
      dispatch({ type: actionTypes.ON_CARD_FLIP, card });
    },
    setLives: lives => {
      dispatch({ type: actionTypes.SET_GAME_LIVES, lives });
    },
    unFlipCards: cards => {
      dispatch({ type: actionTypes.UNFLIP_OLD_CARDS, cards });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
