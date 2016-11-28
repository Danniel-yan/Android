import { get, responseStatus } from 'utils/fetch';
import alert from 'utils/alert';

export default function(pos = 0) {

  return dispatch => {

    dispatch(pos == 0 ? fetchingMessages(pos) : paginationMessages(pos));

    return get(`/user/message?pos=${pos}`)
      .then(response => {
        if(response.res === responseStatus.success) {
          dispatch(receiveMessages(response.data, pos));
        }
      }).catch(err => alert('网络错误'));
  };
}

function fetchingMessages(pos) {
  return {
    type: 'fetchingMessages',
    pos
  };
}

function paginationMessages(pos) {
  return {
    type: 'paginationMessages',
    pos
  };
}

function receiveMessages(messages, pos) {
  return {
    type: 'receiveMessages',
    messages,
    pos: pos + messages.length,
    nomore: messages.length === 0,
  };
}
