import { fetchDecks, createDeck, createDeckCard, removeDeck } from '../utils/api';

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const DELETE_DECK = 'DELETE_DECK';

export const getDecks = () => dispatch => {
  fetchDecks()
    .then((response) => {
      return dispatch({
        type: GET_DECKS,
        payload: response
      })
    })
};

export const addDeckTitle = (newDeck,callback) => (dispatch) => {
  createDeck(newDeck)
    .then(() => {
      return dispatch({
        type: ADD_DECK_TITLE,
        payload: newDeck,
      })
    }).then(() => callback());
};

export const addCardToDeck = (question, answer, deck) => dispatch => {
  const newCard = {
    title: deck,
    questions: [{
      question,
      answer
    }]
  };

  createDeckCard(newCard)
    .then(() => {
       return dispatch({
        type: ADD_CARD_TO_DECK,
        payload: newCard
      })
    });
};

export function deleteDeck(title, callback) {
  removeDeck(title).then(() => callback());

  return {
    type: DELETE_DECK,
    payload: title
  }
}
