import { get } from 'utils/fetch'

export function requestCardList() {
  return {
    type : 'requestCardList'
  }
}

export function receiveCardList(cardList){
  return {
    type : 'receiveCardList',
    cardList: cardList
  }
}

export function fetchCardList(categoryid){

  return function (dispatch) {

    dispatch(requestCardList())

    return get('/card/card-list?categoryid=${categoryid}')
      .then(response => dispatch(receiveCardList(response.data)))
      .catch(err => console.log(err))
  }
}