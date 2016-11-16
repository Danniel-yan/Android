import { connect } from 'react-redux';

import MajorNavigation from 'components/MajorNavigation';
import { majorTab } from 'actions/navigation';

function mapStateToProps(state) {
  return { navigation: state.navigation.routes[0] };
}

function mapDispatchToProps(dispatch) {
  return {
    majorTab: tabName => dispatch(majorTab(tabName))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MajorNavigation);
