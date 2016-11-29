import { get } from 'utils/fetch'

export function requestActHotDetail() {
  return {
    type: 'requestActHotDetail'
  }
}

export function receiveActHotDetail(detail) {
  return {
    type: 'receiveActHotDetail',
    detail: detail
  }
}

export function fetchActHotDetail(id) {

  return function (dispatch) {

    dispatch(requestActHotDetail())

    return get(`/card/act-detail?act_id=${id}`)
      .then(response => dispatch(receiveActHotDetail(response.data)))
      .catch(err => console.log(err))
  }
}
