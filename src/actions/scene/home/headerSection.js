//import fetch from 'isomorphic-fetch';

function requestfetch() {
  return {
    type: 'fetching'
  }
}

function receiveImgList(list) {
  return {
    type: 'receiveImgList',
    imgList: list
  }
}

export function fetchBannerImgList() {

  return function (dispatch) {

    dispatch(requestfetch())

    return fetch(`bannerImages.json`)
      .then(response => response.json())
      .then(json =>dispatch(receiveImgList(json)))
      .catch(err => console.log(err))
  }
}

function receiveMsgList(list) {
  return {
    type: 'receiveMsgList',
    msgList: list
  }
}

export function fetchBroadcastList() {

  return function (dispatch) {

    dispatch(requestfetch())

    return fetch(`broadcastMsgList.json`)
      .then(response => response.json())
      .then(json =>dispatch(receiveMsgList(json)))
      .catch(err => console.log(err))
  }
}