import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';

import onlineActions from 'actions/online';

import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import onlineStyles from './../styles';
import SceneHeader from 'components/shared/SceneHeader';
import { ExternalPopLink, ExternalPushLink } from 'containers/shared/Link';

import successImage from 'assets/online/import-success.png';
import failureImage from 'assets/online/import-failure.png';
import ingImage from 'assets/online/importing.gif';
import { trackingScene } from 'high-order/trackingPointGenerator';

class GjjStatus extends Component {

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
    let popKey = "CertificationHome", pushKey = null, backRoute = null;
    let tracking = { key: 'PAF_report', topic: 'fail', entity: "try_again", event: 'clk' };

    if(loanType == 0) popKey = "CreditLoan";
    // if(loanType == 9999) popKey = "ZoneScene";

    if(this.state.checked && status == 'success') {
      image = successImage;
      button = '完成'
      statusText = (<Text style={styles.text}>导入完成</Text>);
      if(loanType == 0) {
        button = '立即查看';
        pushKey = "GjjReport";
        backRoute = this.props.certificationEntryKey ? { key: this.props.certificationEntryKey } : {key: "CreditLoan", title: "信用贷"}
      }
      tracking = { key: 'PAF_report', topic: 'success', entity: "complete", event: 'clk' };
    } else if(this.state.checked && status == 'failure') {
      image = failureImage;
      button = '重新导入';
      statusText = (<Text style={styles.text}>公积金认证失败，请重新认证！.</Text>);
      popKey = 'CertificationHome';
      if(loanType == 0) {
        popKey = "FundLogin";
      }
    }

    return (
      <ScrollView contentContainerStyle={[container, onlineStyles.container ]}>
        <View style={centering}>
          <Image style={styles.image} source={image}/>
          {statusText}
        </View>

        { !button ? null : (pushKey ? (
            <ExternalPushLink
              style={[onlineStyles.btn, centering, styles.btn]}
              textStyle={onlineStyles.btnText}
              text={button}
              title={"公积金报告"}
              toKey={pushKey}
              backRoute={backRoute}
              tracking={tracking}
              />
          ) : (
            <ExternalPopLink
              style={[onlineStyles.btn, centering, styles.btn]}
              textStyle={onlineStyles.btnText}
              text={button}
              toKey={popKey}
              tracking={tracking}
              />
          ))
        }
      </ScrollView>
    );
  }

  _getBillStatus() {
    this.props.fetchGjjResult();

    this.timeFlag = setInterval(() => this.props.fetchGjjResult(), 5000);
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

function mapStateToProps(state) {
  // return {
  //   isFetching: state.onlinne.gjjResult.isFetching,
  //   gjjResult: state.online.gjjResult
  // }
  return {
    isFetching: state.online.gjjResult.isFetching,
    loanType: state.online.loanType.type,
    status: state.online.gjjResult.status }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGjjResult: () => dispatch(onlineActions.gjjResult())
  };
}

import { CertificationOutput } from 'high-order/Certification';

export default CertificationOutput(connect(mapStateToProps, mapDispatchToProps)(trackingScene(GjjStatus)));
