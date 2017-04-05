const initState = {
  isFetching: true,
  fetched: false
}

export default function(state = initState, action) {
  switch(action.type) {
    //case 'requestOnlineRepayAmount':
    //  return Object.assign({}, state, { isFetching: true, fetched: false});
    case 'receiveOnlineAdjustApproveAmount':
        //console.log('receiveOnlineAdjustApproveAmount')
        //console.log(action.detail)
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.detail });
    //case 'receiveOnlineRepaymentAmount':
    //  return Object.assign({}, state, { isFetching: false, fetched: true, ...action.detail });
    default:
      return state;
  }
}
