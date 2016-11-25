import { connect } from 'react-redux';

import { majorPush, majorPop } from 'actions/navigation';
import CardScene from 'components/scene/CardScene';
import externalScene from 'components/high-order/externalScene';

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardScene);
