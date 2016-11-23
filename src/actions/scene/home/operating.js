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
  return (dispatch) => {
    dispatch(fetchingOperating());

    get('/app/index-config')
      .then(response => dispatch(receiveOperating(response.data)))
      .catch(err => {
        dispatch(fetchingError('网络错误'));
        console.log(err)
      })
  }
}
