import React, { Component } from 'React';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import L2RText from 'components/shared/L2RText';
import GroupTitle from 'components/GroupTitle';
import SubmitButton from './SubmitButton';
import { InputGroup, PickerGroup } from 'components/form';
import { post, responseStatus } from 'utils/fetch';
import { colors, responsive, fontSize, border } from 'styles';

class ReceiptCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      mobile: props.userInfo.mobile,
      bank_card_no: '',
      bank_name: '',
      error: ''
    };
  }

  validation() {
    if(!this.changed) { return ''; }

    let { mobile, bank_card_no, bank_name } = this.state;

    if(mobile.length != 11) {
      return '请输入11位手机号码';
    }

    if(bank_card_no.length == 0) {
      return '请输入银行卡号';
    }

    if(bank_name.length == 0) {
      return '请选择开户银行';
    }

    return '';
  }
  
  render() {
    let banksText = this.props.banks.join('、');
    let userInfo = this.props.userInfo;
    let formError = this.validation();
    let error = this.state.error || formError;

    return (
      <ScrollView>
        <L2RText left="姓名" right={userInfo.person_name} style={styles.item} rightStyle={styles.input}/>
        <GroupTitle offset={false} textStyle={styles.groupTitleText} style={styles.groupTitle} title="注：由于是收款及扣款银行卡，请认真填写"/>
        <InputGroup
          label="预留手机号"
          keyboardType="numeric"
          value={this.state.mobile}
          valueChanged={this._formChange.bind(this, 'mobile')}
          style={{wrap: styles.item, input: styles.input}}
        />
        <InputGroup
          label="银行卡号"
          keyboardType="numeric"
          value={this.state.bank_card_no}
          valueChanged={this._formChange.bind(this, 'bank_card_no')}
          style={{wrap: styles.item, input: styles.input}}
        />
        <PickerGroup
          label="开户银行"
          value={this.state.bank_name}
          valueChanged={this._formChange.bind(this, 'bank_name')}
          style={{wrap: styles.item}}
          items={this.props.banks}
          textStyle={styles.input}
        />

        <Text style={styles.bankTip}>限支持银行：{banksText}</Text>

        <Text style={styles.error}>{error}</Text>

        <SubmitButton
          backCount={1}
          disabled={!!formError || !this.changed}
          onPress={this.submit.bind(this)}
          text="提交"
        />
      </ScrollView>
    );
  }

  _formChange(name, value) {
    if(typeof value == 'string') {
      value = value.trim();
    }

    this.changed = true;

    this.setState({ [name]: value });
  }

  submit() {
    this.setState({ submitting: true });

    let { mobile, bank_card_no, bank_name } = this.state;

    post('/loanctcf/contract-bind-bank', {
      mobile, bank_card_no, bank_name
    }).then(response => {

      // TODO remove
      response.res = responseStatus.success;

      if(response.res == responseStatus.success) {
        this.setState({ submitting: false });
        this.props.onSuccess(bank_card_no);
        return;
      }
      this.setState({ error: response.msg, submitting: false });
    })
    .catch(err => {
      this.setState({ error: '网络出错', submitting: false });
    })
  }
}


const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: fontSize.normal,
    color: colors.error
  },
  item: {
    height: 55
  },
  input: {
    color: colors.grayLight,
  },
  bankTip: {
    textAlign: 'justify',
    marginVertical: 10,
    paddingHorizontal: 10,
    lineHeight: 18,
    fontSize: fontSize.normal,
    color: colors.gray
  },
  groupTitle: {
    backgroundColor: colors.bg
  },
  groupTitleText: {
    fontSize: fontSize.normal
  },
});


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';
import { externalPop } from 'actions/navigation';

function mapStateToProps(state) {
  return {
    userInfo: state.online.userInfo.data,
    banks: state.online.contractBanks.banks
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetching: () => dispatch(actions.contractBanks()),
    onSuccess: (value) => {
      ownProps.onSuccess(value);
      dispatch(externalPop());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(ReceiptCard)));
