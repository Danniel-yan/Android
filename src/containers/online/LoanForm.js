import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import { border, container, rowContainer, colors, fontSize } from 'styles';
import GroupTitle from 'components/GroupTitle';
import CameraInput from './CameraInput';
import { InputGroup } from 'components/form';
import { ExternalPushLink } from 'containers/shared/Link';
import onlineStyles from './styles';

const inputStatus = {
  checking: 1,
  success: 2,
  failure: 3
};

class LoanForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: props.amount,
      idFront: '',
      idBack: '',
      cardFront: '',
      submitting: false
    }
  }

  render() {
    let { idFront, idBack, cardFront, } = this.state;
    const disabled = !(idFront && idBack && cardFront);

    return (
      <ScrollView>
        <GroupTitle style={styles.groupTitle} title="身份信息认证"/>

        <View style={[styles.container, {paddingBottom: 30}]}>
          <CameraInput
            type="idFront"
            onChange={this._onInputChange.bind(this, 'idFront')}
            label="身份证正面"
            example={require('assets/online/id-front.png')}
          />

          <CameraInput
            type="idBack"
            onChange={this._onInputChange.bind(this, 'idBack')}
            label="身份证反面"
            example={require('assets/online/id-back.png')}/>
        </View>

        <GroupTitle style={styles.groupTitle} title="信用卡片认证"/>

        <View style={styles.container}>
          <CameraInput
            type="bankCard"
            onChange={this._onInputChange.bind(this, 'cardFront')}
            label="信用卡正面"
            example={require('assets/online/card-front.png')}/>
          {this._cardTip()}
        </View>

        <View style={styles.container}>
          <InputGroup
            style={{wrap: styles.input}}
            label="信用卡号码"
            value={this.state.cardFront}
            valueChanged={this._onInputChange.bind(this, 'cardFront')}
          />
          <InputGroup
            style={{wrap: styles.input}}
            label="信用卡预留手机号码"
            placeholder="信用卡预留手机号码"
            maxLength={11}
            value={this.state.mobile}
            valueChanged={this._onInputChange.bind(this, 'mobile')}
          />
        </View>

        <ExternalPushLink 
          title="审批状态"
          backKey="LoanDetailScene"
          backCount={2}
          toKey="OnlineApproveStatus"
          processing={this.state.submitting}
          prePress={this._submit.bind(this)}
          disabled={disabled}
          style={[onlineStyles.btn, onlineStyles.btnOffset, disabled && onlineStyles.btnDisable]}
          textStyle={onlineStyles.btnText}
          text="完成提交"
        />
      </ScrollView>
    );
  }

  _cardTip() {
    let cards = this.props.data.card_no_last_four_list;

    return (
      <Text style={styles.tipText}>
        请上传尾号为
        {
        cards.map((card, index) => {
          return <Text key={'card'+index}><Text style={styles.cardNum}>{card}</Text>{index ? '或' : ''}</Text>
        })
        }
        信用卡正面照片
      </Text>
    );
  }

  _onInputChange(name, value) {
    value = typeof value == 'string' ? value.trim() : value;

    this.setState({ [name]: value })
  }

  _submit() {
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  cardNum: {
    color: colors.primary
  },
  groupTitle: {
    backgroundColor: colors.bg
  },
  tipText: {
    marginTop: 10,
    marginBottom: 24,
    fontSize: fontSize.normal,
    color: colors.gray
  },
  input: {
    borderBottomWidth: 0,
    ...border('top')
  }
});



import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return { ...state.online.preloanStatus, mobile: state.loginUser.info.mobile};
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.preloanStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(LoanForm)));
