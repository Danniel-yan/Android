import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  AsyncStorage
} from 'react-native';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import Button from 'components/shared/ButtonBase';
import ProcessingButton from 'components/shared/ProcessingButton';
import actions from 'actions/online';
import { InputGroup } from 'components/form';
import { post, responseStatus } from 'utils/fetch';
import { ExternalPushLink } from 'containers/shared/Link';

import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import onlineStyles from './../styles';

const needSecondLogin = 1;

class CreditCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      form: { },
      valids: { },
      errors: { }
    };

    this.formRegs = {};
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  _validation() {
    const valids = this.state.valids;

    let curTab = this.props.detail[this.state.tabIndex]

    return !curTab.description.find(field => {
      return !valids[field.name];
    })
  }

  render() {
    let disabled = !this._validation() || !this.formChanged;

    return (
      <View style={container}>
        {this._tabs()}
        <View style={[container]}>
          <ScrollView contentContainerStyle={onlineStyles.container}>
            {this._form()}

            <ExternalPushLink
              processing={this.state.submitting}
              title="导入账单"
              toKey="OnlineCreditCardStatus"
              prePress={this._submit.bind(this)}
              disabled={disabled}
              style={[onlineStyles.btn, disabled && onlineStyles.btnDisable]}
              textStyle={onlineStyles.btnText}
              text="开通网银导入"/>
          </ScrollView>
        </View>

      </View>
    );
  }

  _submit() {
    this.setState({ submitting: true});

    let curTab = this.props.detail[this.state.tabIndex]

    let body = {
      ...this.state.form,
      login_type: curTab.login_type,
      login_target: curTab.login_target
    };

    var loanType = this.props.loanType || 0;
    body.loan_type = loanType;
    return post('/bill/bank-login', body).then(response => {
     if(this.unmount) { return }

     this.setState({submitting: false});

     if(response.res == responseStatus.success) {
       if(response.data.second_login == needSecondLogin) return {key: 'OnlineCreditCardVerify', title: '输入验证码', componentProps: {...response.data, bank_id: this.props.bank_id}};
       // return {componentProps: {...response.data}};
       return {componentProps: {...response.data, bank_id: this.props.bank_id}};
     }

     throw response.msg;
   }).catch(err => {
     this.setState({submitting: false});
     throw err;
   })

  }

  _onFormChange(name, value) {
    if(typeof value == 'string') {
      value = value.trim();
    }

    this.formChanged = true;
    let curTab = this.props.detail[this.state.tabIndex]
    let field = curTab.description.find(item => item.name == name)

    let errmsg = '';

    if(!(new RegExp(field.regex).test(value))) {
      errmsg = `${field.show_name}有误`;
    }

    this.setState({
      form: {...this.state.form, [name]: value},
      errors: { ...this.state.errors, [name]: errmsg },
      valids: { ...this.state.valids, [name]: !errmsg },
    });
  }

  _form() {
    if(!this.props.detail) { return null }
    let curTab = this.props.detail[this.state.tabIndex]

    let forms = curTab.description.map((field, index) => {
      this.formRegs[field.name] = field.regex;
      let ispwd = field.name == 'password';

      return (
        <View style={styles.formGroup} key={"field"+index}>
          <Text style={styles.errorTip}>{this.state.errors[field.name]}</Text>
          <InputGroup
            icon={ispwd ? require('assets/online/lock.png') : require('assets/online/user.png')}
            style={{wrap: styles.formWrap,input: styles.formField }}
            value={this.state.form[field.name]}
            placeholder={field.show_name}
            secureTextEntry={ispwd}
            maxLength={30}
            valueChanged={this._onFormChange.bind(this, field.name)}
            />
        </View>
      )
    });

    return forms;
  }


  _tabs() {
    if(!this.props.detail) { return null }

    let tabs = this.props.detail.map((tab, index) => {
      let curTab = this.state.tabIndex == index;

      return (
        <View
          style={container}
          key={"tab"+index}>
          <Button
            onPress={() => this.setState({tabIndex: index})}
            textStyle={[styles.tabText, curTab && styles.tabSelectedText]}
            text={tab.login_type_name}
            style={[styles.tab, curTab && styles.tabSelected]}>
          </Button>
        </View>
      )
    });

    return (
      <View style={[flexRow, centering, styles.tabs]}>
        {tabs}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    paddingHorizontal: 5,
    height: 45,
  },
  tab: {
    height: 45
  },
  tabSelected: {
    ...border('bottom', 1, colors.primary),
    height: 45
  },
  tabSelectedText: {
    color: colors.primary
  },
  formGroup: {
    position: 'relative',
  },
  formField: {
    fontSize: fontSize.normal,
    textAlign: 'left'
  },
  formWrap: {
    paddingTop: 15,
    paddingHorizontal: 0,
  },
  errorTip: {
    position: 'absolute',
    top: 2,
    left: 0,
    zIndex: 2,
    fontSize: fontSize.xsmall,
    color: colors.error
  }
});


function mapStateToProps(state, ownProps) {
  const detail = state.online.bankDetail[ownProps.fetchingParams] || {
    isFetching: true,
    feched: false
  };

  return { ...detail, loanType: state.online.loanType.type }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: (id) => dispatch(actions.bankDetail(id))
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(
    AsynCpGenerator(Loading, CreditCardForm));
