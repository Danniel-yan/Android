import { connect } from 'react-redux';

import creditReport from 'components/find/creditReport'


function mapStateToProps(state) {
  return {
    creditScore: state.online.userInfo.creditScore
  }
}

export default connect(mapStateToProps,null)(creditReport)