import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';

import { post } from 'utils/fetch';
import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import onlineStyles from './styles';
import SceneHeader from 'components/shared/SceneHeader';
import { ExternalPopLink } from 'containers/shared/Link';

import successImage from 'assets/online/import-success.png';
import failureImage from 'assets/online/import-failure.png';
import ingImage from 'assets/online/importing.gif';

const statusImages = {
  1: successImage ,
  0: failureImage,
  2: ingImage
}

const checkStatus = {
  success: 1,
  failure: 0,
  processing: 2
}

export default class CreditCardStatus extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: checkStatus.processing,
    };
  }

  render() {
    return (
      <View style={[container]}>
        {this._content()}
      </View>
    );
  }

  _content() {
    let image = statusImages[this.state.status]
    let button = '';
    let statusText = '正在导入...';

    if(this.state.status == checkStatus.success) {
      button = '完成'
      statusText = '导入完成，请返回首页查看！';
    } else if(this.state.status == checkStatus.failure) {
      button = '重新导入账单';
      statusText = '信用卡认证失败，请重新认证！';
    }

    return (
      <ScrollView contentContainerStyle={[container, onlineStyles.container ]}>
        <View style={centering}>
          <Image style={styles.image} source={image}/>
          <Text style={styles.text}>{statusText}</Text>
        </View>

        <ExternalPopLink
          prePress={this.props.onHide}
          style={[onlineStyles.btn, centering, styles.btn]}
          textStyle={onlineStyles.btnText}
          text="重新导入"
          backCount={2}/>
      </ScrollView>
    );
  }

  _checkStatus() {
  }
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontSize: fontSize.normal,
    color: colors.grayDark
  },
  image: {
    marginTop: responsive.height(100),
    width: responsive.width(414),
    height: responsive.height(200)
  },
  btn: {
    marginTop: 40
  }
});
