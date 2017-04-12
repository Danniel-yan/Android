import {get, post, responseStatus} from 'utils/fetch';
import {externalPush} from 'actions/navigation';

export default function (dispatch, mobile, bank_card_no) {

    return (dispatch, getState) => {
        var state = getState(),
            loan_type = parseInt(state.online.loanType.type) || 0;

        dispatch({type: 'requestOnlineDepositoryCreate'})

        post(`/payctcfcg/create`, {loan_type, mobile, bank_card_no}).then(response => {
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
                dispatch(externalPush({
                    web: {uri: uri, method: method, body: body},
                    title: "激活",
                    backRoute: null
                }))
            }
        })

    }

}
