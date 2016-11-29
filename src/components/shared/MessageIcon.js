import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';

export default class MessageIcon extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      logined: false
    };
  }

  componentDidMount() {
    if(!this.state.checked) {
      AsyncStorage.getItem('userToken').then(token => {
        this.setState({
          checked: true,
          logined: !!token
        });
      });
    }
  }

  render() {
    if(!this.state.checked) { return null }

    let toKey = this.state.logined ? 'MessagesScene' : 'Login';
    let title = this.state.logined ? '消息' : '登录';

    return (
      <ExternalPushLink toKey={toKey} title={title}>
        <Image source={require('assets/icons/message.png')}/>
      </ExternalPushLink>
    );
  }
}
