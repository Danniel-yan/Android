const initState = {
  isFetching: true,
  fetched: false,
  status: undefined,
  err: undefined
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineYysResult':
      return initState;
    case 'receiveOnlineYysResult':
      return Object.assign({}, state, { isFetching: false, fetched: true, status: action.status})
    default: 
      return state;
  }
}
