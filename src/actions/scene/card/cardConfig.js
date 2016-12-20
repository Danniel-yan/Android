import { get, responseStatus } from 'utils/fetch';

function fetching() {
  return {
    type: 'fetchingCardConfig'
  };
}

function fetchError(err) {
  return {
    type: 'fetchError',
    err
  };
}

function receiveConfig(config) {
  return {
    type: 'receiveCardConfig',
    config: config
  }
}

export default function fetchCardConfig() {
  return (dispatch) => {

    dispatch(fetching);

    get('/card/config').then(response => {
      if(response.res == responseStatus.success) {
        dispatch(receiveConfig(response.data));
      } else {
        dispatch(fetchError(response.msg))
      }
    })
    .catch(err => dispatch(fetchError(err)))
  }
}
