import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  NativeModules,
  Image, TouchableOpacity
} from 'react-native';

import { border, container, rowContainer, colors, fontSize } from 'styles';
import GroupTitle from 'components/GroupTitle';
import CameraInput, { FaceMegInput } from './CameraInput';
import { post, responseStatus } from 'utils/fetch';
import { InputGroup } from 'components/form';
import { ExternalPushLink, ExternalPopLink } from 'containers/shared/Link';
import onlineStyles from './styles';
import ErrorInfo from './ErrorInfo';
import { loanType } from 'constants';

const inputStatus = {
  checking: 1,
  success: 2,
  failure: 3
};

class LoanForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      form: {
        credit_card_mobile: props.userInfo && props.userInfo.mobile || '',
        credit_card_no: '',
        credit_card_no_auto: '',
        apply_amount: props.amount
      },
      idFront: '',
      idBack: '',
      faceMeg: '',
      submitting: false
    }
  }

  renderIDForms() {
    return (
      <View>
        <GroupTitle style={styles.groupTitle} title="身份信息认证"/>

        <View style={[styles.container, {paddingBottom: 30}]}>
          <CameraInput
            type="idFront"
            onChange={this._idChange.bind(this, 'idFront')}
            label="身份证正面"
            example={require('assets/online/id-front.png')}
          />

          <CameraInput
            type="idBack"
            onChange={this._idChange.bind(this, 'idBack')}
            label="身份证反面"
            example={require('assets/online/id-back.png')}/>
        </View>
      </View>
    );
  }

  renderBankCardForms() {
    return this.props.loanType == loanType.chaoshidai ? (
      <View>
        <GroupTitle style={styles.groupTitle} title="信用卡片认证"/>

        <View style={styles.container}>
          <CameraInput
            type="bankCard"
            onChange={this._cardChange.bind(this)}
            label="信用卡正面"
            example={require('assets/online/card-front.png')}/>
          {this._cardTip()}
        </View>

        <View style={styles.container}>
          <InputGroup
            style={{wrap: styles.input}}
            label="信用卡号码"
            value={this.state.form.credit_card_no}
            valueChanged={this._onInputChange.bind(this, 'credit_card_no')}
          />
          <InputGroup
            style={{wrap: styles.input}}
            label="预留手机号码"
            placeholder="信用卡预留手机号码"
            maxLength={11}
            value={this.state.form.credit_card_mobile}
            valueChanged={this._onInputChange.bind(this, 'credit_card_mobile')}
          />
        </View>
      </View>
    ) : null;
  }

  renderFaceVerifyForms() {
    return (this.props.loanType == loanType.gjj || this.props.loanType == loanType.chaohaodai || this.props.loanType == loanType.chaohaodaicard)? (
      <View>
        <GroupTitle style={[styles.groupTitle, {borderBottomWidth: 0}]} title="人脸识别"/>
        <FaceMegInput onChange={(status) => this.setState({faceMeg: status == 'success'})} />
      </View>
    ) : null;
  }

  render() {
    let { idFront, idBack, faceMeg } = this.state;
    let { credit_card_no, credit_card_mobile } = this.state.form;
    let backKey = "LoanDetailScene";

    let enable = idFront && idBack;
    if(this.props.loanType == 1) enable = enable && credit_card_no && credit_card_mobile;
    if(this.props.loanType == 2 || this.props.loanType == loanType.chaohaodaicard) enable = enable && faceMeg;
    if(this.props.loanType == 1 || this.props.loanType == 2 ) backKey = "SuiXinJieList";

    return (
      <ScrollView>
        { this.renderIDForms() }
        { this.renderBankCardForms() }
        { this.renderFaceVerifyForms() }

        <ErrorInfo msg={this.state.error}/>
        
        {
          this.props.loanType == loanType.chaohaodaicard ? (
            <ExternalPopLink
              prePress={this._submitLoanForm.bind(this)}
              disabled={!true}
              style={[onlineStyles.btn, onlineStyles.btnOffset, !enable && onlineStyles.btnDisable]}
              textStyle={onlineStyles.btnText}
              text="完成提交"
            />
          ) : (
            <ExternalPushLink
              title="审批状态"
              backKey={backKey}
              backRoute={{ key: backKey }}
              toKey="OnlineApproveStatus"
              processing={this.state.submitting}
              prePress={this._submit.bind(this)}
              disabled={!enable}
              style={[onlineStyles.btn, onlineStyles.btnOffset, !enable && onlineStyles.btnDisable]}
              textStyle={onlineStyles.btnText}
              text="完成提交"
            />
          )
        }
      </ScrollView>
    );
  }

  _cardTip() {
    let cards = this.props.data.card_no_last_four_list;

    return (
      <Text style={styles.tipText}>
        请上传尾号为
        { cards.map(this._cardNos.bind(this)) }
        信用卡正面照片
      </Text>
    );
  }

  _cardNos(card, index) {
    return (
      <Text key={'card'+index}>
        {index ? '或' : ''}
        <Text style={styles.cardNum}>{card}</Text>
      </Text>
    );
  }

  _idChange(name, value) {
    this.setState({ [name]: value });
  }

  _cardChange(value) {
    let form = this.state.form;

    form.credit_card_no_auto = value;
    form.credit_card_no = value;

    this.setState({ form });
  }

  _onInputChange(name, value) {
    value = typeof value == 'string' ? value.trim() : value;
    let form = this.state.form;

    form[name] = value;

    this.setState({ form });
  }

  _submit() {
    this.setState({ error: '', submitting: true})

    return post('/loanctcf/apply', Object.assign({}, this.state.form, { loan_type: parseInt(this.props.loanType) })).then(response => {

      if(response.res == responseStatus.success) {
        // this.props.fetchStatus();
        this.setState({ submitting: false })
        return true;
      }

      throw response.msg
    })
    .catch((msg) => {
      this.setState({ submitting: false, error: msg })
      throw msg;
    })
  }

  _submitLoanForm() {
    console.log("LoanForm: ");
    console.log(this.state.form);
  }

  componentWillUnmount() {
    this.props.refetchingStatus && this.props.refetchingStatus();
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
    paddingHorizontal: 0,
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
  return {
    // ...state.online.preloanStatus,
    // isFetching: state.online.userInfo.isFetching,
    // fetched: state.online.userInfo.fetched,
    userInfo: state.online.userInfo.data,
    loanType: state.online.loanType.type
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStatus: () => dispatch(actions.status()),
    fetching: () => {
      // dispatch(actions.preloanStatus())
      // dispatch(actions.userInfo())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(LoanForm));
