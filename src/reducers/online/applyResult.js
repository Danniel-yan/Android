const initState = {
  isFetching: true,
  fetched: false,
  error: null,
  tempAmount: null,
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineApproveResult':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveOnlineApproveResult':
      var newState = Object.assign({}, state, { isFetching: false, fetched: true, error: action.error });
      return action.result ? Object.assign({}, newState, { ...action.result}) : newState;
    case 'receiveOnlineAdjustApproveAmount':
        var newState = Object.assign({}, state, { tempAmount: action.tempAmount });
        newState.tempAmount = action.tempAmount;
          return newState;
    default:
      return state;
  }
}
