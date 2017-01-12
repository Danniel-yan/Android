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
    let status = this.state.status, loanType = this.props.loanType;


    let image = ingImage;
    let button = '';
    let statusText = (<Text style={styles.text}>正在导入...</Text>);
    let popKey = "CertificationHome";

    if(loanType == 0) popKey = "CreditLoan";
    if(loanType == 9999) popKey = "ZoneScene";

    if(this.state.checked && status == 'success') {
      image = successImage;
      button = '完成'
      statusText = loanType == 0 ? (
        <View style={{flexDirection: "row", marginVertical: 30, alignItems: "center"}}>
          <Text style={{fontSize: fontSize.normal, color: colors.grayDark}}>导入完成，请至</Text>
          <ExternalPushLink toKey={"BillList"} title={"我的账单"}><View><Text style={{fontSize: fontSize.normal, color: colors.primary}}>我的账单</Text></View></ExternalPushLink>
          <Text style={{fontSize: fontSize.normal, color: colors.grayDark}}>查看！.</Text>
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
    this.setState({checked: true});

    getBillList({login_target: this.props.bank_id, loan_type: this.props.loanType || 0}).then(response=>{
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

function mapStateToProps(state, ownProps) {
  // return { loanType: 0 }
  return { loanType: state.online.loanType.type }
}

export default connect(mapStateToProps, null)(trackingScene(CreditCardStatus));
