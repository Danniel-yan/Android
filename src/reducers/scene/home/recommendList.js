

export default function listView(state = {isFetching: false,items: []}, action) {
  switch(action.type) {
    case 'request_recommend':
    case 'receive_recommend':
      return {
        isFetching: false,
        items: action.items
      }
    default:
      return state
  }
}