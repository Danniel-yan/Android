const initState = { isFetching: false, fetched: false, recommends: [] };

export default function articalList(state = initState, action) {
  switch(action.type) {
    case 'requestArticalList':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveArticalList':
      return Object.assign({}, state, { isFetching: false, fetched: true, offset : action.offset, recommends: action.recommends } )
    default:
      return state
  }
}
