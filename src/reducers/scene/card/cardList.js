
const initState = {
  isPaging: false,
  paginationParams: 0,
  isFetching : false ,
  cardList :[],
  fetched: false,
  fetchedParams: null,
  nomore: false
};

export default function cardList(state = initState, action ) {
  switch (action.type){
    case 'fetchCardList':
      return Object.assign({}, state, { isFetching:true });
    case 'paginationCardList':
      return Object.assign({}, state, { isPaging:true })
    case 'receiveCardList':
      return Object.assign({}, state, {
        isFetching:false,
        isPaging: false,
        fetched: true,
        fetchedParams: action.fetchedParams,
        cardList: action.cardList,
        paginationParams: action.offset,
        nomore: action.nomore
      })
    default :
      return state;
  }
}
