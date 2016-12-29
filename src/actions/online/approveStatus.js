import { get, responseStatus } from 'utils/fetch';

export default function() {

  return (dispatch, getState) => {

    dispatch({type: 'requestOnlineApproveStatus'});

    dispatch({type: 'receiveOnlineApproveStatus', status: {status: 1}});
  }

}
