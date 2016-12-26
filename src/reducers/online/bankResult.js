const initState = {
  isFetching: true,
  fetched: false,
  status: undefined,
  err: undefined
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineBankResult':
      return initState;
    case 'receiveOnlineBankResult':
      return Object.assign({}, state, { isFetching: false, fetched: true, status: action.status})
    default: 
      return state;
  }
}
