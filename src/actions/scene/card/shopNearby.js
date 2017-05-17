
import { get, post, responseStatus } from 'utils/fetch'
import GetGeoLocation from 'utils/geoLocation.js'


export default function( offset = 0) {

  return function (dispatch) {

    GetGeoLocation({timeout: 5000}).then(position => {

      dispatch(offset == 0 ? fetchShopNearby(offset) : paginationShopNearby(offset));

      return post(`/card/shop-nearby`, {
        lati: position.coords.latitude,
        long: Math.abs(position.coords.longitude),
        num: 10,
        offset: offset
      })
      .then(response => {
        if(response.res == responseStatus.success) {
          dispatch(receiveShopNearby(response.data, offset));
        } else {
          dispatch(geoError());
        }
      })
      .catch(err => dispatch(geoError()))
    }, err => dispatch(geoError()))

  }
}

function geoError() {
  return { type: 'geoError' }
}

function fetchShopNearby(offset) {
  return {
    type : 'fetchShopNearby',
    offset
  }
}

function paginationShopNearby(offset) {
  return {
    type : 'paginationShopNearby',
    offset
  }
}

function receiveShopNearby(shopNearby,offset){
  return {
    type : 'receiveShopNearby',
    shopNearby,
    offset: offset + shopNearby.length,
    nomore: shopNearby.length === 0
  }
}
