
require('mock');

export function requestFastLoanRecommends() {
  return {
    type: 'requestFastLoanRecommends'
  }
}

export function receiveFastLoanRecommends(recommends) {
  return {
    type: 'receiveFastLoanRecommends',
    recommends: recommends
  }
}

export function fetchFastLoanRecommends() {

  return function (dispatch) {

    dispatch(requestFastLoanRecommends())

    return fetch(`recommend.json`)
      .then(response => response.json())
      .then(recomends => dispatch(receiveFastLoanRecommends(recomends)))
      .catch(err => console.log(err))
  }
}
