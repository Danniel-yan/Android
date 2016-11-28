import { get } from 'utils/fetch'

export function requestActHot() {
  return {
    type: 'requestActHot'
  }
}

export function receiveActHot(actHot, num ) {
  return {
    type: 'receiveActHot',
    actHot: actHot,
    num
  }
}

export function fetchActHot(num) {

  return function (dispatch) {

    dispatch(requestActHot())

    return get(`/card/act-hot?num=${num}`)
      .then(actHot => dispatch(receiveActHot(actHot.data, num)))
      .catch(err => console.log(err))
  }
}
