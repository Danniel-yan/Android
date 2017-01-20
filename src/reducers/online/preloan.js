const initState = {
  isFetching: false,
  fetched: false,
  preloan: null
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'submitPreloan':
      return Object.assign({ isFetching: true, fetched: false, preloan: null });
    case 'receiveReloan':
      return Object.assign({ isFetching: false, fetched: true, preloan: action.preloan });
    default: 
      return state;
  }
}
