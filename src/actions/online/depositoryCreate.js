import {get, post, responseStatus} from 'utils/fetch';
import {externalPush} from 'actions/navigation';
import alert from 'utils/alert'
import {AsyncStorage} from 'react-native';
import actions from 'actions/online';

export default function (mobile, bank_card_no, success, fail, error) {

    return (dispatch, getState) => {
        var state = getState(),
            loan_type = parseInt(state.online.loanType.type) || 0;

        dispatch({type: 'requestOnlineDepositoryCreate'})
        let params = {loan_type}
        if (mobile != null || bank_card_no != null) {
            params = {loan_type, mobile, bank_card_no}
        }
        post(`/payctcfcg/create`, params).then(response => {
            dispatch({type: 'receiveOnlineDepositoryCreate', detail: response.data})
            if (response.res == responseStatus.success) {
                let head = response.data.gatewayRequestHead;
                var uri = "", method = "POST", body = "";
                console.log(head);
                for (var key in head) {
                    if (key == 'gatewayUrl') {
                        uri = head[key];
                    } else {
                        body = body + key + "=" + encodeURIComponent(head[key]) + "&";
                    }
                }
                body = body.substring(0, body.length - 1);
                onMessage = e => {
                    var data = e.nativeEvent.data;
                    if (data == 'success') {
                        dispatch(externalPush(success))
                    } else if (data == 'fail') {
                        dispatch(externalPush(fail))
                    }
                };
                dispatch(externalPush({
                    web: {uri: uri, method: method, body: body},
                    title: "激活",
                    componentProps: {
                        onMessage: onMessage,
                        reFetching: () => {
                            dispatch(actions.depositoryResult())
                        }
                    },
                    backRoute: {backCount: 2}
                }))
            } else {
                dispatch(externalPush(error))
                alert(response.msg)
            }
        })

    }

}