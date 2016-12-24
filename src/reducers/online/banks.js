const initState = {
  isFetching: false,
  fetched: false,
  err: null,
  banks: []
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineBanks':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveOnlineBanks':
      return Object.assign({}, state, { isFetching: false, fetched: true, banks: action.banks });
    case 'requestOnlineBanksError':
      return Object.assign({}, state, { isFetching: false, fetched: false, err: action.err });
    default: 
      return state;
  }

}
