import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';
import { connect } from "react-redux";

import { get, responseStatus } from 'utils/fetch';
import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import onlineStyles from './../styles';
import SceneHeader from 'components/shared/SceneHeader';
import { ExternalPopLink, ExternalPushLink } from 'containers/shared/Link';

import successImage from 'assets/online/import-success.png';
import failureImage from 'assets/online/import-failure.png';
import ingImage from 'assets/online/importing.gif';

class CreditCardStatus extends Component {
  tracking = { key: "bill", topic: "progress" }

  constructor(props) {
    super(props);

    this.state = { checked: false, status: "processing" };
  }

  componentDidMount() {
    this._getBillStatus();
  }

  componentDidUpdate() {
    if(this.state.checked && (!this.props.isFetching) && (this.props.status == 'success' || this.props.status == 'failure')) {
      clearInterval(this.timeFlag)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeFlag)
  }

  render() {
    return (
      <View style={[container]}>
        {this._content()}
      </View>
    );
  }

  _content() {
    let status = this.props.status, loanType = this.props.loanType;


    let image = ingImage;
    let button = '';
    let statusText = (<Text style={styles.text}>正在导入...</Text>);
    let popKey = "CertificationHome";

    if(loanType == 0) popKey = "CreditLoan";
    // if(loanType == 9999) popKey = "ZoneScene"; // "我的"页面不需要认证流程

    if(this.state.checked && status == 'success') {
      image = successImage;
      button = '完成'
      statusText = loanType == 0 ? (
        <View style={{flexDirection: "row", marginVertical: 30, alignItems: "center"}}>
          <Text style={{fontSize: fontSize.normal, color: colors.grayDark}}>导入完成，请至</Text>
          <ExternalPushLink toKey={"BillList"} title={"我的账单"}><View><Text style={{fontSize: fontSize.large, color: colors.primary}}>我的账单</Text></View></ExternalPushLink>
          <Text style={{fontSize: fontSize.normal, color: colors.grayDark}}>查看！</Text>
        </View>
      ) : (<Text style={styles.text}>导入完成，请返回首页查看！.</Text>);
    } else if(this.state.checked && status == 'failure') {
      image = failureImage;
      button = '重新导入账单';
      statusText = (<Text style={styles.text}>信用卡认证失败，请重新认证！.</Text>);
    }

    return (
      <ScrollView contentContainerStyle={[container, onlineStyles.container ]}>
        <View style={centering}>
          <Image style={styles.image} source={image}/>
          {statusText}
        </View>

        { !button ? null : <ExternalPopLink
          prePress={this.props.onHide}
          style={[onlineStyles.btn, centering, styles.btn]}
          textStyle={onlineStyles.btnText}
          text={button}
          toKey={popKey}/>
        }
      </ScrollView>
    );
  }

  _getBillStatus() {
    this.props.fetchingBillStatus();

    this.timeFlag = setInterval(() => this.props.fetchingBillStatus(), 5000);
    this.setState({checked: true});
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
import actions from 'actions/online';
import chaoHaoDai from "actions/online/chaoHaoDai";
import { CertificationOutput } from 'high-order/Certification';

function mapStateToProps(state, ownProps) {
  // return { loanType: 0 }
  return {
    isFetching: state.online.bankResult.isFetching,
    loanType: state.online.loanType.type,
    status: state.online.bankResult.status }
}

function mapDispatch(dispatch) {
  return {
    fetchingBillStatus: () => dispatch(actions.bankResult()),
    unMountFetching: () => {
      dispatch(actions.preloanStatus());
      dispatch(chaoHaoDai.applyStatus());
      dispatch(chaoHaoDai.checkActiveResult());
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(CertificationOutput(trackingScene(CreditCardStatus)));
