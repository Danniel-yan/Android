
import { get, post } from 'utils/fetch'

export function requestShopNearby(){
  return {
    type : 'requestShopNearby'
  }
}

export function receiveShopNearby(shopNearby){
  return {
    type : 'receiveShopNearby',
    shopNearby: shopNearby,
  }
}

export function fetchShopNearby(){

  return function (dispatch) {

    dispatch(requestShopNearby())

    navigator.geolocation.getCurrentPosition(
      (position) => {
        return post('/card/shop-nearby',{ lati: position.coords.latitude , long : position.coords.longitude, num: 10, offset:0 })
          .then(shopNearby => dispatch(receiveShopNearby(shopNearby.data)))
          .catch(err => console.log(err))
      }
    )

  }
}