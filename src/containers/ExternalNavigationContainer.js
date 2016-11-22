import { connect } from 'react-redux';

import ExternalNavigation from 'components/ExternalNavigation';
import { externalPop, majorPop } from 'actions/navigation'

function mapStateToProps(state) {
  return { navigation: state.navigation };
}

function mapDispatchToProps(dispatch) {
  return {
    externalPop: () => dispatch(externalPop()),
    majorPop: () => dispatch(majorPop())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalNavigation);
