const initState = {
  isFetching: true,
  fetched: false
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineUserCreditLevel':
      return Object.assign({}, state, { isFetching: true, fetched: false});
    case 'receiveOnlineUserCreditLevel':
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.detail });
    default:
      return state;
  }
}
