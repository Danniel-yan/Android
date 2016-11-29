//import fetch from 'isomorphic-fetch';

import { get } from 'utils/fetch'

export function requestCategory() {
  return {
    type: 'requestCategory'
  }
}

export function receiveCategory(category) {
  return {
    type: 'receiveCategory',
    category: category
  }
}

export function fetchCategory() {

  return function (dispatch) {

    dispatch(requestCategory())

    return get(`/card/category-list`)
      .then(category => dispatch(receiveCategory(category.data)))
      .catch(err => console.log(err))
  }
}
