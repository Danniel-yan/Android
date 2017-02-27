const initState = { isFetching: false, fetched: false, recommends: [], isFetchingDetail: false };

export default function articalList(state = initState, action) {
  switch(action.type) {
    case 'requestArticalList':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveArticalList':
      return Object.assign({}, state, { isFetching: false, fetched: true, offset : action.offset, recommends: action.recommends } )
    case 'RequestArticalDetail':
      return Object.assign({}, state, { isFetchingDetail: true } );
    case 'ReceiveArticalDetail':
      return Object.assign({}, state, { isFetchingDetail: false, detail: action.detail } )
    default:
      return state
  }
}
