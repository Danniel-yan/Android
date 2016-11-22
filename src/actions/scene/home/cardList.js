//import fetch from 'isomorphic-fetch';

import { get } from 'utils/fetch'

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

    return get('/card/category-list')
      .then(cards => dispatch(receiveCards(cards.data)))
      .catch(err => console.log(err))
  }
}
