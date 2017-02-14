import { get} from 'utils/fetch';

export function requestArticalList() {
  return {
    type: 'requestArticalList'
  }
}

export function receiveArticalList(response) {
  return {
    type: 'receiveArticalList',
    recommends: response.data,
    //offset: response.offset
  }
}

export function fetchArticalList(offset = 0, num = 10) {

  return function (dispatch) {

    dispatch(requestArticalList())

    return get(`/discover/info-list?offset=${offset}&num=${num}`)
      .then(response => dispatch(receiveArticalList(response)))
      .catch(err => console.log(err))
  }
}
