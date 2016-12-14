import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  AsyncStorage
} from 'react-native';

import { applicationSetup, getAppSettings } from 'settings'
import ExternalNavigationContainer from 'containers/ExternalNavigationContainer';
import BigLoading from 'components/shared/BigLoading';
import tracker from 'utils/tracker';
import fetchingUser from 'actions/loginUser';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { initialing: true};
  }

  componentDidMount() {
    applicationSetup().then(() => {

      AsyncStorage.getItem('userToken').then(token => {
        if(token == null) {
          this.setState({ initialing: false });
        } else {
          this.props.fetchingUser();
        }
      });

      this.trackingOpenApp();
    });
  }

  trackingOpenApp() {
    getAppSettings().then(settings => {
      tracker.trackAction({
        key: 'user',
        topic: 'open_app',
        entity: 'open_app',
        event: 'open_app',
        device_id: settings.deviceId,
        id_user: settings.uuid
      });
    });
  }

  componentWillReceiveProps(props) {
    if(this.state.initialing && props.loginUser.fetched) {
      this.setState({ initialing: false });
    }
  }

  render() {
    return this.state.initialing ? <BigLoading/> : <ExternalNavigationContainer/>;
  }

}

function mapState(store) {
  return {
    loginUser: store.loginUser
  };
}

function mapDispatch(dispatch) {
  return {
    fetchingUser: () => dispatch(fetchingUser())
  };
}

export default connect(mapState, mapDispatch)(Main);
