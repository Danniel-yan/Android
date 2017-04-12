const initState = {
    isFetching: true,
    fetched: false,
    error: null,
    tempAmount: null,
    applydata: null,
    resultdata: null,
}

export default function (state = initState, action) {
    switch (action.type) {
        case 'requestOnlineApproveResult':
            var newState = Object.assign({}, state, {isFetching: true, fetched: false});
            // newState.applydata = null;
            // newState.resultdata = null;
            newState.tempAmount = null;

            return newState;
        case 'receiveOnlineApproveResult':
            var newState = Object.assign({}, state, {isFetching: false, fetched: true, error: action.error});
            newState.tempAmount == null && action.result && action.result.resultdata &&  (newState.tempAmount = action.result.resultdata.approve_amount);
            return action.result ? Object.assign({}, newState, {...action.result}) : newState;
        case 'receiveOnlineAdjustApproveAmount':

            console.log(action.tempAmount);
            var newState = Object.assign({}, state, {tempAmount: action.tempAmount});
            newState.tempAmount = action.tempAmount;
            return newState;
        case 'clearReceiveOnlineAdjustApproveAmount':
            console.log('clearReceiveOnlineAdjustApproveAmount执行了------------------->')
            var newState = Object.assign({}, state);
            newState.tempAmount = null;
            return newState;
        default:
            return state;
    }
}
