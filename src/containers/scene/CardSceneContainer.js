import { connect } from 'react-redux';

import { majorPush, majorPop } from 'actions/navigation';
import CardScene from 'components/scene/CardScene';
import externalScene from 'components/high-order/externalScene';

import paginationShopNearby from 'actions/scene/card/shopNearby'

function mapStateToProps(state) {
  return state.shopNearby
}

function mapDispatchToProps(dispatch) {
  return {
    fetching : offset => dispatch(paginationShopNearby(offset)),
    pagination: offset => dispatch(paginationShopNearby(offset))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardScene);
