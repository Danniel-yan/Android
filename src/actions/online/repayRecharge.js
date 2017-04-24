import {get, post, responseStatus} from 'utils/fetch';
import {externalPush} from 'actions/navigation';
import alert from 'utils/alert'
import {AsyncStorage} from 'react-native';

export default function (amount) {

    return (dispatch, getState) => {
        var state = getState(),
            loan_type = parseInt(state.online.loanType.type) || 0;

        dispatch({type: 'requestOnlineRepayRecharge'})

        post(`/payctcfcg/quick-recharge`, {loan_type, amount}).then(response => {
            dispatch({type: 'receiveOnlineRepayRecharge', detail: response.data})
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
                        dispatch(externalPush({
                            key: 'OnlineLoanSign',
                            title: "签约"
                        }))
                    } else if (data == 'fail') {
                        dispatch(externalPush({
                            key: "OnlineReceiptCard",
                            title: "添加银行卡"
                        }))
                    }
                };
                dispatch(externalPush({
                    web: {uri: uri, method: method, body: body},
                    title: "充值",
                    componentProps: {onMessage: onMessage}
                }))
            } else {
                alert(response.msg)
            }
        })

    }

}
