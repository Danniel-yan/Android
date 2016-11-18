const initState = { isFetching: true, imgList: [] };

export default function bannerImgList(state = initState, action) {
  switch(action.type) {
    case 'requestImgList':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveImgList':
      return Object.assign({}, state, { isFetching: false, imgList: action.imgList } )
    default:
      return state
  }
}
