import { get } from 'utils/fetch'

export function requestActDetailBanner(){
  return {
    type : 'requestActDetailBanner'
  }
}

export function receiveActDetailBanner(bannerImg){
  return {
    type : 'receiveActDetailBanner',
    bannerImg: bannerImg.banner
  }
}

export function fetchActDetailBanner(){

  return function(dispatch){

    dispatch(requestActDetailBanner())

    return get(`/card/act-detail-banner`)
      .then(response => dispatch(receiveActDetailBanner(response.data)))
      .catch( err => console.log(err))
  }

}