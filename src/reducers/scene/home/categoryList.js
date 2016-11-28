const initState = { isFetching: false, fetched: false, category: [] };

export default function categoryList(state = initState, action) {
  switch(action.type) {
    case 'requestCategory':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveCategory':
      return Object.assign({}, state, { isFetching: false, fetched: true, category: action.category } )
    default:
      return state
  }
}
