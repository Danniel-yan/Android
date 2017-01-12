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
import { ExternalPopLink, ExternalPushLink } from 'containers/shared/Link';
import { parseStatus } from './../status';

import successImage from 'assets/online/import-success.png';
import failureImage from 'assets/online/import-failure.png';
import ingImage from 'assets/online/importing.gif';

import getBillList from 'actions/online/billList';

class CreditCardStatus extends Component {

  constructor(props) {
    super(props);
    console.log(props)

    this.state = { checked: false }
    this.fetching();
  }

  componentDidMount() {
    // this._checkStatus();
    this.fetching();
  }

  componentDidUpdate() {
    // let status = parseStatus(this.props.bankResult.status);
    // if(status == 'success' || status == 'failure') {
    //   clearInterval(this.timer)
    // }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <View style={[container]}>
        {this._content()}
      </View>
    );
  }

  _content() {
    let status = parseStatus(this.props.bankResult.status);

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

  _checkStatus() {
    //this.props.fetching();
    this.setState({checked: true})
    this.timer = setInterval(() => {
      //this.props.fetching();
      console.log("FETCHING****")
    }, 5000);
  }

  fetching() {
    var { bank_id } = this.props || {};

    this.setState({checked: true})
    console.log(this.props);
    getBillList({ login_target: bank_id }).then(response => {
      var data = response.data, bill = data && data[0];

      console.log("data");
      console.log(data);
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


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

// function mapStateToProps(state) {
//   return { bankResult: state.online.bankResult};
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     fetching: (params) => dispatch(actions.bankResult(params)),
//   }
// }

export default (trackingScene(CreditCardStatus));
