import {get, post, responseStatus} from 'utils/fetch';
import actions from 'actions/online';

export default function (dispatch) {
    return (dispatch) => {
        dispatch({type: 'requestOnlineDepositoryResult'})
        post(`/payctcfcg/create-result`).then(response => {
            if (response.res == responseStatus.success) {
                if (response.data.status == 2) {
                    dispatch(actions.bankInfo()).then(() => {
                        dispatch({type: 'receiveOnlineDepositoryResult', detail: response.data})
                    })
                } else {
                    dispatch({type: 'receiveOnlineDepositoryResult', detail: response.data})
                }
            }
        })
    }

}
