import { connect } from 'react-redux';

import { majorPush, majorPop, externalPush, externalPop, majorTab } from 'actions/navigation';
import { setAmount } from 'actions/scene/fast/filterList';
import HomeScene from 'components/scene/HomeScene';

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAmount: amount => dispatch(setAmount(amount)),
    majorTab: route => dispatch(majorTab(route)),
    majorPush: route => dispatch(majorPush(route)),
    majorPop: route => dispatch(majorPop(route)),
    externalPush: route => dispatch(externalPush(route)),
    externalPop: () => dispatch(externalPop()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
