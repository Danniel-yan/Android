import { get, responseStatus } from 'utils/fetch';

export default function() {
  return (dispatch, getState) => {

    get('/loanctcf/status').then(response => {
      // TODO remove
      response = {
        "res": 1,
        "data": {
          "status": 13,
          "time_expire_status":0,
          "time_expire":"1970-01-01 08:00:00",
        }
      }

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineStatus', status: response.data })
      }
    }).catch(console.log)

  }
}
