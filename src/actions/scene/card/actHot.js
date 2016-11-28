import { get } from 'utils/fetch'

export function requestActHot() {
  return {
    type: 'requestActHot'
  }
}

export function receiveActHot(actHot) {
  return {
    type: 'receiveActHot',
    actHot: actHot
  }
}

export function fetchActHot(num = 8) {

  return function (dispatch) {

    dispatch(requestActHot())

    return get(`/card/act-hot?num=${num}`)
      .then(actHot => dispatch(receiveActHot(actHot.data)))
      .catch(err => console.log(err))
  }
}
