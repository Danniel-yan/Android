import { get } from 'utils/fetch'

export function requestActHotDetail() {
  return {
    type: 'requestActHotDetail'
  }
}

export function receiveActHotDetail(detail, id) {
  return {
    type: 'receiveActHotDetail',
    detail: detail,
    fetchedParams: id
  }
}

export function fetchActHotDetail(id) {

  return function (dispatch) {

    dispatch(requestActHotDetail())

    return get(`/card/act-detail?act_id=${id}`)
      .then(response => dispatch(receiveActHotDetail(response.data, id)))
      .catch(err => console.log(err))
  }
}
