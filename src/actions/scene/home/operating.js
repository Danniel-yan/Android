import { get } from 'utils/fetch';

export function fetchingOperating() {
  return {
    type: 'fetchingOperating',
  }
}

export function receiveOperating(operating) {
  return {
    type: 'receiveOperating',
    operating
  }
}

export function fetchingError(err) {
  return {
    type: 'fetchingOperatingError',
    err
  }
}

export default function homeOperating() {
  return (dispatch, getState) => {
    dispatch(fetchingOperating());
    var state = getState(), isIOS = state.iosConfig && state.iosConfig.isIOS;

    get(isIOS ? '/app/ios-index-config' : '/app/index-config')
      .then(response => dispatch(receiveOperating(response.data)))
      .catch(err => {
        dispatch(fetchingError('网络错误'));
        console.log(err)
      })
  }
}
