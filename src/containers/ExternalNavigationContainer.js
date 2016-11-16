import { connect } from 'react-redux';

import ExternalNavigation from 'components/ExternalNavigation';

function mapStateToProps(state) {
  return { navigation: state.navigation };
}

export default connect(mapStateToProps)(ExternalNavigation);
