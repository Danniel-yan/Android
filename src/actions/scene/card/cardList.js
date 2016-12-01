import { get } from 'utils/fetch'

export default function(params) {

  return function (dispatch) {

    dispatch(params.offset == 0 ? fetchCardList(params) : paginationCardList(params));

    return get(`/card/card-list?bankid=${params.bankid}&categoryid=${params.categoryid}&num=10&offset=${params.offset}`)

      .then(response => dispatch(receiveCardList(response.data, params)))

      .catch(err => console.log(err))
  }
}

function fetchCardList(params) {
  return {
    type : 'fetchCardList',
    params
  }
}

function paginationCardList(params) {
  return {
    type : 'paginationCardList',
    params
  }
}

function receiveCardList(cardList,params){
  return {
    type : 'receiveCardList',
    cardList,
    nomore: cardList.length === 0,
    fetchedParams: {
      categoryid: params.categoryid,
      bankid: params.bankid,
      offset: params.offset
    },
    params: {
      categoryid: params.categoryid,
      bankid: params.bankid,
      offset: params.offset + cardList.length
    }
  }
}
