const initState = {
  isFetching: false,
  fetched: false,
  data: null
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'submitPreloan':
      return Object.assign({ isFetching: true, fetched: false, data: null });
    case 'receivePreloan':
      return Object.assign({ isFetching: false, fetched: true, data: action.data });
    default: 
      return state;
  }
}
