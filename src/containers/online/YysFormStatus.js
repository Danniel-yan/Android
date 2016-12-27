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
import onlineStyles from './styles';
import SceneHeader from 'components/shared/SceneHeader';
import { ExternalPopLink } from 'containers/shared/Link';
import { parseStatus } from './status';

import successImage from 'assets/online/yys-success.png';
import failureImage from 'assets/online/yys-failure.png';

class YysFormStatus extends Component {

  constructor(props) {
    super(props);

    this.state = { checked: false}
  }

  componentDidMount() {
    this._checkStatus();
  }

  componentDidUpdate() {
    let status = parseStatus(this.props.status);
    if(status == 'success' || status == 'failure') {
      clearInterval(this.timer)
    }
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
    let status = parseStatus(this.props.status);

    let image = successImage;
    let button = '';
    let statusText = '正在导入...';

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
          toKey="CertificationHome"/>
        }
      </ScrollView>
    );
  }

  _checkStatus() {
    this.props.fetching();
    this.setState({checked: true})
    this.timer = setInterval(() => {
      this.props.fetching();
    }, 5000);
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
  return state.online.yysResult;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.yysResult()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(YysFormStatus));
