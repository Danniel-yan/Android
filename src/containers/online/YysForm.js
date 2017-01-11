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

import ProcessingButton from 'components/shared/ProcessingButton';
import YysBanner from './YysBanner';
import YysSecondForm from './YysSecondForm';
import ErrorInfo from './ErrorInfo';

import actions from 'actions/online';

import { InputGroup } from 'components/form';
import { post, responseStatus } from 'utils/fetch';
import { ExternalPushLink } from 'containers/shared/Link';
import { externalPush} from 'actions/navigation';

import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import onlineStyles from './styles';

const needSecondLogin = 1;

class YysForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleVerify: false,
      submitting: false,
      form: { },
      valids: { },
      errors: { }
    };

  }

  // 返回提交过程中用户返回
  componentWillUnmount() {
    this.unmount = true;
  }

  _validation() {
    const valids = this.state.valids;

    return !this.props.description.find(field => {
      return !valids[field.name];
    })

  }

  render() {
    let disabled = !this._validation() || !this.formChanged;

    return (
      <View style={container}>
        <ScrollView>
          <YysBanner/>
          {this._form()}
          <ErrorInfo msg={this.state.error}/>
          <ProcessingButton
            processing={this.state.submitting}
            onPress={this._submit.bind(this)}
            disabled={disabled}
            style={[onlineStyles.btn, disabled && onlineStyles.btnDisable, {marginHorizontal: 10}]}
            textStyle={onlineStyles.btnText}
            disabled={disabled}
            text="提交"
          />
          <YysSecondForm
            {...this.state.submitResult}
            onHide={this._onVerifyModalHide.bind(this)}
            visible={this.state.visibleVerify}
            verifySuccess={this._onVerifySuccess.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }

  _onVerifyModalHide() {
    this.setState({visibleVerify: false});
  }

  _onVerifySuccess() {
    this.setState({visibleVerify: false});
    this.props.loginSuccess();
  }

  _submit() {
    this.setState({ submitting: true, error: ''}, () => {

      let body = {
        ...this.state.form,
        login_type: this.props.login_type,
        login_target: this.props.login_target
      };

      // TODO remove
      //let response = {
      //  res: 1,
      //  data:  {
      //    "ticket_id": "ea8029b2-c81c-11e6-b5e3-00163e00ed7a_1482393720.03", //ticket_id 供二次登录时使用
      //    "second_login": 1, //是否需要二次登陆，0=不需要，1=需要
      //    "val_code": { 
      //        "type": "sms", //验证码类型，sms=手机验证码，img=图片验证码
      //        "value": "null" //图片验证码的base64数据
      //    }
      //  }
      //}

      // TODO remove
      //if(response.res == responseStatus.success && response.data.second_login == needSecondLogin) {
      //  this.setState({submitting: false, visibleVerify: true, submitResult: response.data});
      //} else if(response.res == responseStatus.success) {
      //  this.setState({submitting: false});
      //  this.props.loginSuccess();
      //} else {
      //  this.setState({submitting: false });
      //}
      //return;
      post('/bill/yys-login', body).then(response => {
        if(this.unmount) {
          return;
        }

        if(response.res == responseStatus.success && response.data.second_login == needSecondLogin) {
          this.setState({submitting: false, visibleVerify: true, submitResult: response.data});
        } else if(response.res == responseStatus.success) {
          this.setState({submitting: false });
          this.props.loginSuccess();
        } else {
          this.setState({submitting: false, error: response.msg });
        }

      }).catch(err => {
        this.setState({submitting: false});
      })
    });
  }

  _onFormChange(name, value) {
    if(typeof value == 'string') {
      value = value.trim();
    }

    this.formChanged = true;
    let field = this.props.description.find(item => item.name == name)

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
    if(!this.props.description) { return null }
    let description = this.props.description;

    let forms = description.map((field, index) => {
      let ispwd = field.name == 'password';

      return (
        <View style={[styles.formGroup]} key={"field"+index}>
          <Text style={styles.errorTip}>{this.state.errors[field.name]}</Text>
          <InputGroup
            label={field.show_name}
            style={{wrap: styles.formWrap,input: styles.formField }}
            value={this.state.form[field.name]}
            placeholder={'请输入'+field.show_name}
            secureTextEntry={ispwd}
            maxLength={30}
            valueChanged={this._onFormChange.bind(this, field.name)}
            />
        </View>
      )
    });

    return forms;
  }

}

const styles = StyleSheet.create({
  formGroup: {
    marginTop: 20,
    position: 'relative',
  },
  formField: {
    fontSize: fontSize.normal,
  },
  formWrap: {
    paddingTop: 15,
  },
  errorTip: {
    position: 'absolute',
    top: 2,
    left: 10,
    zIndex: 2,
    fontSize: fontSize.xsmall,
    color: colors.error,
    backgroundColor: '#fff'
  },
  submitError: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: fontSize.xsmall,
    color: colors.error,
  }
});


function mapStateToProps(state, ownProps) {
  return state.online.yysForms;
}

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: (props) => dispatch(externalPush({title: '手机运营商认证', key: 'OnlineYysFormStatus', ...props, backButton: false, backRoute: {key: 'CertificationHome' }})),
    fetching: () => dispatch(actions.yysForms())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, YysForm));
