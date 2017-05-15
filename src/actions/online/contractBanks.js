import { get, responseStatus } from 'utils/fetch';

export default function() {
  return (dispatch, getState) => {
    dispatch({type: 'requestOnlineContractBanks'})

    get('/payctcfcg/contract-bank-list').then(response => {
      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineContractBanks', banks: response.data})
      }
    })
  };
}
