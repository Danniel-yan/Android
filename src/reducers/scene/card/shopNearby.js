
const initState = {
  isPaging: false,
  paginationParams: 0,
  isFetching : false ,
  fetched: false,
  nomore: false,
  shopNearby :[],
  geoError: false
};

export default function shopNearby(state = initState , action){
  switch (action.type){
    case 'geoError':
      return Object.assign({}, state, { fetched: true, geoError: true });
    case 'fetchShopNearby':
      return Object.assign({}, state, { isFetching: true });
    case 'paginationShopNearby':
      return Object.assign({}, state, { isPaging: true });
    case 'receiveShopNearby':
      return Object.assign({}, state, {
        isPaging: false,
        paginationParams: action.offset,
        isFetching: false,
        fetched: true,
        nomore: action.nomore,
        shopNearby: [...state.shopNearby, ...action.shopNearby]
      });
    default :
      return state;
  }
}
