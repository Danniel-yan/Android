const initState = { isFetching: true, imgList: [] };

export function bannerImgList(state = initState, action) {
  switch(action.type) {
    case 'fetching':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveImgList':
      return Object.assign({}, state, { isFetching: false, imgList: action.imgList } )
    default:
      return state
  }
}

export function broadcastList(state = initState, action) {
  switch(action.type) {
    case 'fetching':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveMsgList':
      return Object.assign({}, state, { isFetching: false, msgList: action.msgList } )
    default:
      return state
  }
}
