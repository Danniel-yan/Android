import React, { Component } from 'react';

import {
  View,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import Text from 'components/shared/Text';
import zoneStyles from './styles';
import NextIcon from 'components/shared/NextIcon';
import Button from 'components/shared/Button';
import OverlayLoading from 'components/shared/OverlayLoading';
import { ExternalPushLink } from 'containers/shared/Link';
import Confirm from 'components/shared/Confirm';
import About from './About';

import * as defaultStyles from 'styles';

export default class ContactScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirm: false,
      showLoading: false
    };
  }

  componentWillReceiveProps() {
  }

  render() {
    return (
      <View style={[defaultStyles.container, defaultStyles.bg]}>
        <ScrollView>
          <ExternalPushLink toComponent={About} title="关于我们">
            <View style={[zoneStyles.item, zoneStyles.group]}>
              <Text style={zoneStyles.txt}>关于我们</Text>
              <NextIcon/>
            </View>
          </ExternalPushLink>

          {/*
          <View style={zoneStyles.item}>
            <Text style={zoneStyles.txt}>清除缓存</Text>
            <Text style={styles.txt}>3.30MB</Text>
            <NextIcon/>
          </View>

          <View style={[zoneStyles.item, zoneStyles.group]}>
            <Text style={zoneStyles.txt}>前往应用市场评价</Text>
            <NextIcon/>
          </View>
          */}

          {this._renderBtn()}

          <OverlayLoading
            onRequestClose={() => this.setState({ showLoading: false })}
            visible={this.state.showLoading}/>

        </ScrollView>

        <Confirm visible={this.state.showConfirm}
          onOK={this.logout.bind(this)}
          onCancel={() => this.setState({ showConfirm: false })}>
          <Text>确认退出当前账号？</Text>
        </Confirm>
      </View>
    );
  }

  logout() {
    this.setState({ showConfirm: false });
    this.props.logout();
  }

  _renderBtn() {
    if(this.props.loginUser.info) {
      return (<Button onPress={() => this.setState({ showConfirm: true })} text="安全退出" style={zoneStyles.btn}/>)
    } else {
      return (<Button onPress={this.props.login} text="登录" style={zoneStyles.btn}/>)
    }
  }
}

const styles = StyleSheet.create({
  txt: {
    color: '#333',
    fontSize: 16,
    marginRight: 5
  }
});
