const initState = {
  isFetching: true,
  fecthed: false,
  err: null
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineYysForms':
      return initState;
    case 'receiveOnlineYysForms':
      return Object.assign({}, state, { isFetching: false, fected: true, ...action.forms})
    default:
      return state;
  }
}
