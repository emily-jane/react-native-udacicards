import { fetchDecks, createDeck, addCard } from '../utils/api';

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const DELETE_DECK = 'DELETE_DECK';

export const getDecks = () => dispatch => {
  fetchDecks()
    .then((response) => {
      console.log('get decks:', response)
      return dispatch({
        type: GET_DECKS,
        payload: response
      })
    })
};

export const addDeckTitle = (title) => dispatch => {
  console.log(title)
  const newDeck = {
    title,
    questions: []
  };

  createDeck(newDeck)
    .then(() => {
      return dispatch({
        type: ADD_DECK_TITLE,
        payload: newDeck
      })
    })
};

export const addCardToDeck = (question, answer, deck) => dispatch => {
  const newCard = {
    title: deck,
    questions: [{
      question,
      answer
    }]
  };

  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newCard))
    .then(() => {
      return dispatch({
        type: ADD_CARD_TO_DECK,
        payload: newCard
      })
    })
};

// export const deleteDeck = (deck) => dispatch => {
//   AsyncStorage.removeItem(DECKS_STORAGE_KEY, )
// }
