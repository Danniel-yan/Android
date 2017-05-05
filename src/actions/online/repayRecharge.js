import {get, post, responseStatus} from 'utils/fetch';
import {externalPush} from 'actions/navigation';
import alert from 'utils/alert'
import {AsyncStorage} from 'react-native';
import actions from 'actions/online';

export default function (amount) {

    return (dispatch, getState) => {
        var state = getState(),
            loan_type = parseInt(state.online.loanType.type) || 0;

        dispatch({type: 'requestOnlineRepayRecharge'})

        return post(`/payctcfcg/quick-recharge`, {loan_type, amount}).then(response => {
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
                    if (data == 'successfinal') {
                        dispatch(externalPush({
                            key: 'OnlineLoanDetail',
                            title: '借款详情'
                        }))
                    } else if (data == 'success' || data == 'fail') {
                        dispatch(externalPush({
                            key: 'RepaymentScene',
                            title: '借款详情'
                        }))
                    }
                };
                dispatch(externalPush({
                    web: {uri: uri, method: method, body: body},
                    title: "确认还款",
                    componentProps: {
                        onMessage: onMessage,
                        reFetching: () => {
                            dispatch(actions.repayAmount())
                        }
                    },
                    backRoute: {backCount: 2}
                }))
            } else {
                dispatch(externalPush({
                    key: 'RepaymentScene',
                    title: '借款详情'
                }))
                alert(response.msg)
            }
        })

    }

}
