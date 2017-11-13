import { AsyncStorage } from 'react-native'

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const DELETE_DECK = 'DELETE_DECK';

const DECKS_STORAGE_KEY = 'UdaciCards:Decks';

export const getDecks = () => dispatch => {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((response) => {
      return dispatch({
        type: GET_DECKS,
        payload: JSON.parse(response)
      })
    })
}

export const addDeckTitle = (title) => dispatch => {
  const newDeck = {
    [title] : {
      title,
      questions: []
    }
  };

  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
    .then(() => {
      return dispatch({
        type: ADD_DECK_TITLE,
        payload: newDeck
      })
    })
}

export const addCardToDeck = ({question, answer, deck}) => dispatch => {
  const mergeNewCard = {
    [deck]: {
      questions: [{
        question,
        answer
      }]
    }
  };

  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(mergeNewCard))
    .then(() => {
      return dispatch({
        type: ADD_CARD_TO_DECK,
        payload: mergeNewCard
      })
    })
}

// export const deleteDeck = (deck) => dispatch => {
//   AsyncStorage.removeItem(DECKS_STORAGE_KEY, )
// }
