import { get, post } from 'utils/fetch';

export function requestRecommends() {
  return {
    type: 'requestRecommends'
  }
}

export function receiveRecommends(response) {
  return {
    type: 'receiveRecommends',
    recommends: response.data.list,
    offset: response.data.offset
  }
}

export function fetchHomeRecommends(params = {offset: 0}) {

  return function (dispatch) {

    dispatch(requestRecommends())

    return get(`/loan/index-list?offset=${params.offset}`)
      .then(response => dispatch(receiveRecommends(response)))
      .catch(err => console.log(err))
  }
}
