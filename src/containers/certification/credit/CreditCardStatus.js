import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';

import { get, responseStatus } from 'utils/fetch';
import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import onlineStyles from './../styles';
import SceneHeader from 'components/shared/SceneHeader';
import { ExternalPopLink } from 'containers/shared/Link';
import { parseStatus } from './../status';

import getBillList from 'actions/online/billList';

import successImage from 'assets/online/import-success.png';
import failureImage from 'assets/online/import-failure.png';
import ingImage from 'assets/online/importing.gif';

class CreditCardStatus extends Component {

  constructor(props) {
    super(props);

    this.state = { checked: false, status: "processing" };
  }

  componentDidMount() {
    this._getBillStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.timeFlag)
  }

  render() {
    return (
      <View style={[container]}>
        {this._content()}
      </View>
    );
  }

  _content() {
    let status = this.state.status;


    let image = ingImage;
    let button = '';
    let statusText = '正在导入...';

    if(this.state.checked && status == 'success') {
      image = successImage;
      button = '完成'
      statusText = '导入完成，请返回首页查看！';
    } else if(this.state.checked && status == 'failure') {
      image = failureImage;
      button = '重新导入账单';
      statusText = '信用卡认证失败，请重新认证！';
    }
    // console.log("checked: " + this.state.checked);
    // console.log("status: " + status);

    return (
      <ScrollView contentContainerStyle={[container, onlineStyles.container ]}>
        <View style={centering}>
          <Image style={styles.image} source={image}/>
          <Text style={styles.text}>{statusText}</Text>
        </View>

        { !button ? null : <ExternalPopLink
          prePress={this.props.onHide}
          style={[onlineStyles.btn, centering, styles.btn]}
          textStyle={onlineStyles.btnText}
          text={button}
          toKey="CertificationHome"/>
        }
      </ScrollView>
    );
  }

  _getBillStatus() {
    this.setState({checked: true});

    getBillList({login_target: this.props.bank_id}).then(response=>{
      var lastBill = response && response.data && response.data.length > 0 ? response.data[0] : null;
      lastBill && (this.state.status = parseStatus(parseInt(lastBill.status)));

      if(this.state.status == 'success' || this.state.status == 'failure') {
        clearTimeout(this.timeFlag);
        this.setState({status: this.state.status});
      } else {
        this.timeFlag = setTimeout(() => this._getBillStatus(), 5000);
      }
    })
  }
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 30,
    fontSize: fontSize.normal,
    color: colors.grayDark
  },
  image: {
    marginTop: responsive.height(170),
    width: responsive.width(414),
    height: responsive.height(200)
  },
  btn: {
    marginTop: responsive.height(220),
    marginHorizontal: responsive.height(65)
  }
});

import { trackingScene } from 'high-order/trackingPointGenerator';

export default (trackingScene(CreditCardStatus));
