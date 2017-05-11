const initState = {
  isFetching: true,
  fetched: false,
  err: undefined,
  status: null
}


export default function(state = initState, action) {
  switch(action.type) {
    case 'requestPreloanStatus':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receivePreloanStatus':
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.status});
    default: 
      return state;
  }
}
