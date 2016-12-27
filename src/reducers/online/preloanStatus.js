const initState = {
  isFetching: true,
  fetched: false,
  err: undefined,
  status: null
}


export default function(state = initState, action) {
  switch(action.type) {
    case 'requestPreloanStatus':
      return initState;
    case 'receivePreloanStatus':
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.status});
    default: 
      return state;
  }
}
