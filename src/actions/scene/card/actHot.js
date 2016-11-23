
import { get } from 'utils/fetch'

export function requestActHot() {
  return {
    type: 'requestActHot'
  }
}

export function receiveActHot(bannerList) {
  return {
    type: 'receiveActHot',
    bannerList: bannerList
  }
}

export function fetchActHot() {

  return function (dispatch) {

    dispatch(requestActHot())

    return get('/card/act-hot')
      .then(bannerList => dispatch(receiveActHot(bannerList.data)))
      .catch(err => console.log(err))
  }
}
