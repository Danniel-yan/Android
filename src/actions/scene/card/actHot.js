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

export function fetchActHot() {

  return function (dispatch) {

    dispatch(requestActHot())

    return get('/card/act-hot')
      .then(actHot => dispatch(receiveActHot(actHot.data)))
      .catch(err => console.log(err))
  }
}
