//import fetch from 'isomorphic-fetch';

export function requestImgList() {
  return {
    type: 'requestImgList'
  }
}

export function receiveImgList(list) {
  return {
    type: 'receiveImgList',
    imgList: list
  }
}

export function fetchBannerImgList() {

  return function (dispatch) {

    dispatch(requestImgList())

    return fetch(`bannerImages.json`)
      .then(response => response.json())
      .then(json =>dispatch(receiveImgList(json)))
      .catch(err => console.log(err))
  }
}
