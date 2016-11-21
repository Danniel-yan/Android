require('mock');

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

    return fetch(`recommend.json`)
      .then(response => response.json())
      .then(bannerList => dispatch(receiveActHot(bannerList)))
      .catch(err => console.log(err))
  }
}
