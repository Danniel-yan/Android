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

import successImage from 'assets/online/yys-success.png';
import failureImage from 'assets/online/yys-failure.png';

class YysFormStatus extends Component {

  constructor(props) {
    super(props);

    this.state = { checked: false, status: "processing" };
  }

  componentDidMount() {
    this._getYysBillStatus();
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

    let image = successImage;
    let button = '';
    let statusText = '正在导入...';
    let popKey = "CertificationHome";

    if(loanType == 0) popKey = "CreditLoan";
    if(loanType == 9999) popKey = "ZoneScene";

    if(this.state.checked && status == 'success') {
      image = successImage;
      button = '完成'
      statusText = '导入成功！';
    } else if(this.state.checked && status == 'failure') {
      image = failureImage;
      button = '重新导入';
      statusText = '导入失败！';
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
          toKey={popKey}/>
        }
      </ScrollView>
    );
  }

  _getYysBillStatus() {
    this.props.fetchingYysBillStatus();

    this.timeFlag = setInterval(() => this.props.fetchingYysBillStatus(), 5000);
    this.setState({checked: true});
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.normal,
    color: colors.grayDark
  },
  image: {
    marginTop: responsive.height(170),
    marginBottom: responsive.height(70),
    width: responsive.width(171),
    height: responsive.height(206)
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

function mapStateToProps(state) {
  return {
    status: state.online.yysResult.status,
    isFetching: state.online.yysResult.isFetching,
    loanType: state.online.loanType.type
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchingYysBillStatus: () => dispatch(actions.yysResult()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(YysFormStatus));
