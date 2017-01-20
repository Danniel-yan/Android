import { AsyncStorage } from 'react-native';
import { get, post, responseStatus } from 'utils/fetch';

export default function() {
  return (dispatch, getState) => {
      var state = getState(), type = state.online.loanType.type || 0;
      return post('/loanctcf/status', type ? { loan_type: type } : {}).then(response => {
        // TODO remove
            //  response = {
            //    "res": 1,
            //    "data": {
            //      "status": 5,
            //      "time_expire_status":0,
            //      "time_expire":"1970-01-01 08:00:00",
            //    }
            //  }

        if(response.res == responseStatus.success) {
          dispatch({ type: 'receiveOnlineStatus', status: response.data })
        }
      }).catch(console.log)
  }
}
