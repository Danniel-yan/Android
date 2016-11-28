
const initState = {
  isPaging: false,
  paginationParams: 0,
  messages: [],
  isFetching: false,
  fetched: false,
  nomore: false
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'fetchingMessages':
      return Object.assign({}, state, { isFetching: true });
    case 'paginationMessages':
      return Object.assign({}, state, { isPaging: true });
    case 'receiveMessages':
      return Object.assign({}, state, {
        isFetching: false,
        isPaging: false,
        fetched: true,
        messages: [ ...state.messages, ...action.messages],
        paginationParams: action.pos,
        nomore: action.nomore
      });
    default: 
      return state;
  }
}
