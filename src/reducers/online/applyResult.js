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
            var newState = Object.assign({}, state, {isFetching: true, fetched: false, tempAmount: null });
            newState.applydata = null;
            newState.resultdata = null;

            return newState;
        case 'receiveOnlineApproveResult':
            var newState = Object.assign({}, state, {isFetching: false, fetched: true, error: action.error});
            console.log("action.result........");
            console.log(action.result);
            return action.result ? Object.assign({}, newState, {...action.result}) : newState;
        case 'receiveOnlineAdjustApproveAmount':
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
