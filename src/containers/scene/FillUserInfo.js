import { connect } from 'react-redux';

import FillUserInfo from 'components/scene/FillUserInfo';
import { externalPush } from 'actions/navigation';

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: () => dispatch(externalPush({
      key: 'https://m.madailicai.com',
      web: 'https://m.madailicai.com'
    }))
  };
}

export default connect(null, mapDispatchToProps)(FillUserInfo)
