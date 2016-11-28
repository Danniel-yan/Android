import { get } from 'utils/fetch'

export default function(params, offset = 0) {

  return function (dispatch) {

    dispatch(offset == 0 ? fetchCardList(offset) : paginationCardList(offset));

    return get('/card/card-list?bankid=${params.bankid}&categoryid=${params.categoryid}&num=10&offset=${offset}')

      .then(response => dispatch(receiveCardList(response.data, offset)))

      .catch(err => console.log(err))
  }
}

function fetchCardList(offset) {
  return {
    type : 'fetchCardList',
    offset
  }
}

function paginationCardList(offset) {
  return {
    type : 'paginationCardList',
    offset
  }
}

function receiveCardList(cardList,offset){
  return {
    type : 'receiveCardList',
    cardList,
    offset: offset + cardList.length,
    nomore: cardList.length === 0
  }
}
