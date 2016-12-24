import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView
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
import onlineStyles from './styles';

class CreditCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      form: { },
      errors: { }
    };

    this.formRegs = {};
  }

  _validation() {
    let errors = this.state.errors;
    // TODO remove
    return true;

    for(let field in errors) {
      if(errors[field]) {
        return false;
      }
    }

    return true;
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
              processing={this.props.submitting}
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
    let curTab = this.props.detail[this.state.tabIndex]

    let body = {
      ...this.state.form,
      login_type: curTab.login_type,
      login_target: curTab.login_target
    };
    let result = {
        "ticket_id": "ea8029b2-c81c-11e6-b5e3-00163e00ed7a_1482393720.03", //ticket_id 供二次登录时使用
        "second_login": 1, //是否需要二次登陆，0=不需要，1=需要
        "val_code": { 
            "type": "sms", //验证码类型，sms=手机验证码，img=图片验证码
            "value": "null" //图片验证码的base64数据
        }
    }

    return {key: 'OnlineCreditCardVerify', form: result};
    post('/bill/bank-login', body).then(response => {
      if(response.res == responseStatus.success) {
      }
    }).catch(console.log)
  }

  _onFormChange(name, value) {
    this.formChanged = true;
    let curTab = this.props.detail[this.state.tabIndex]
    let field = curTab.description.find(item => item.name == name)

    let errmsg = '';

    if(!(new RegExp(field.regex).test(value))) {
      errmsg = `${field.show_name}有误`;
    }

    this.setState({
      form: {...this.state.form, [name]: value},
      errors: { ...this.state.errors, [name]: errmsg }
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
  const detail = state.online.bankDetail[ownProps.fetchingParams] || { };

  return { ...detail }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: (id) => dispatch(actions.bankDetail(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, CreditCardForm));
