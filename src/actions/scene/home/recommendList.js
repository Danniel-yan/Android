
require('mock');

export function requestRecommends() {
  return {
    type: 'requestRecommends'
  }
}

export function receiveRecommends(recommends) {
  return {
    type: 'receiveRecommends',
    recommends: recommends
  }
}

export function fetchHomeRecommends(params) {

  return function (dispatch) {

    dispatch(requestRecommends())

    return fetch(`recommend.json`)
      .then(response => response.json())
      .then(recomends => dispatch(receiveRecommends(recomends)))
      .catch(err => console.log(err))
  }
}
