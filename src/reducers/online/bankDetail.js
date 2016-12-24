const initState = {
  isFetching: false,
  fetched: false,
  err: null,
  details: {}
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineBankDetail':
      return Object.assign({}, state, { [action.id]: {isFetching: true, fetched: false} })
    case 'receiveOnlineBankDetail':
      return Object.assign({}, state, { [action.id]: {isFetching: false, fetched: true, detail: action.detail} })
    case 'requestOnlineBankDetailError':
      return Object.assign({}, state, { [action.id]: {isFetching: false, fetched: false, err: action.err} })
    default: 
      return state;
  }
}
