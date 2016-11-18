//import fetch from 'isomorphic-fetch';

export function requestCards() {
  return {
    type: 'requestCards'
  }
}

export function receiveCards(cards) {
  return {
    type: 'receiveCards',
    cards: cards
  }
}

export function fetchHomeCards() {

  return function (dispatch) {

    dispatch(requestCards())

    return fetch(`recommend.json`)
      .then(response => response.json())
      .then(cards => dispatch(receiveCards(cards)))
      .catch(err => console.log(err))
  }
}
