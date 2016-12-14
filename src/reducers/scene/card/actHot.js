const initState = { isFetching: true, fetched: false, actHot: [] };

export default function actHot(state = initState, action) {
  switch(action.type) {
    case 'requestActHot':
      return Object.assign({}, state, { isFetching: true , fetched: false, });
    case 'receiveActHot':
      return Object.assign({}, state, { isFetching: false, fetched: true, actHot: action.actHot } )
    default:
      return state
  }
}
