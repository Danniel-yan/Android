import { connect } from 'react-redux';

import { majorPush, majorPop, externalPush, externalPop, majorTab } from 'actions/navigation';
import { setAmount } from 'actions/scene/fast/filterList';
import HomeScene from 'components/scene/HomeScene';
import { trackingScene } from 'high-order/trackingPointGenerator';

function mapStateToProps(state) {
  return {
    isIOSVerifying: state.iosConfig.isIOSVerifying,
    iosFetched: state.iosConfig.fetched
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

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(HomeScene));
