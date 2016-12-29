const initState = {
  isFetching: true,
  fetched: false,
  error: null
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineApproveStatus':
      return initState;
    case 'receiveOnlineApproveStatus':
      return Object.assign({}, state, { isFetching: false, fetched: false, ...action.status});
    default: 
      return state;
  }
}
