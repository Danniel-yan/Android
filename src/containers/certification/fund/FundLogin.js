import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView , TextInput, StyleSheet, Image, TouchableOpacity , AsyncStorage} from 'react-native';

import * as defaultStyles from 'styles';

import ProcessingButton from 'components/shared/ProcessingButton'
import { colors } from 'styles/varibles'
import LocationPicker from 'components/modal/LocationPicker';
import Dialog from './Dialog'
import { post, responseStatus } from 'utils/fetch';

import FundSecondLogin from './FundSecondLogin';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import ErrorInfo from 'containers/online/ErrorInfo';

import onlineActions from 'actions/online'

import { ExternalPushLink } from 'containers/shared/Link';

import NextIcon from 'components/shared/NextIcon';

const GjjLocationPicker = connect(state => { return { gjjLoginElements: state.online.gjjLoginElements.elements } })(LocationPicker);

class FundLoginScene extends Component{

  constructor(props){
    super(props);

    this.state = {
      visibleVerify: false, submitting: false,
      showPicker: false, showDialog: false
    };

  }

  render(){

    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({showPicker: true}) } style={styles.inputGroup}>
          <Text style={styles.text}>请选择城市</Text>
          <TextInput value={this.state.location}
                     style={styles.input}
                     placeholder='请选择您所在的城市'
                     underlineColorAndroid="transparent"
                     editable={false}
                     onChangeText={(location) => { this.setState({location}) }}
            />
          <NextIcon/>

          <GjjLocationPicker mark='fundCity' visible={this.state.showPicker} onChange={this._onChange.bind(this)} onHide={() => this.setState({showPicker: false})}/>
        </TouchableOpacity>

        {
          this.state.location ? (
            <TouchableOpacity onPress={() => this.setState({showDialog: true}) } style={styles.inputGroup}>
              <Text style={styles.text}>登陆类型</Text>
              <TextInput value={this.state.typeName}
                         style={styles.input}
                         placeholder='请选择你的登陆类型'
                         underlineColorAndroid="transparent"
                         editable={false}
                         onChangeText={(typeName) => { this.setState({typeName}) }}
                />
              <NextIcon/>

              <Dialog visible={this.state.showDialog} location={this.state.location} onChange={this._onChangeDialog.bind(this)} onHide={() => this.setState({showDialog: false})}/>
            </TouchableOpacity>
          ): null
        }

        {
          this.state.description ? (
          this.state.description.map( (config,idx) =>
              <View key={'key' + idx } style={styles.inputGroup}>
                <Text style={styles.text}>{config.show_name}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={'请输入'+ config.show_name}
                  secureTextEntry={config.name == 'password'}
                  onChangeText={this._onFormChange.bind(this, config.name)}
                  />
              </View>
          )
          ):null
        }

        <ErrorInfo msg={this.state.error}/>

        <View style={{justifyContent: 'center',alignItems: 'center',}}>
          <ProcessingButton
            processing={this.state.submitting}
            onPress={this._submit.bind(this)}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            text="提交"/>
        </View>

        <FundSecondLogin
          {...this.state.submitResult}
          onHide={() => this.setState({visibleVerify: false})}
          visible={this.state.visibleVerify}
          />
      </View>

    )
  }

  _onChangeDialog(config){
    this.setState({
      config,
      description: config.description,
      typeName: config.login_type_name,
      showDialog: false
    });
  }

  _onChange(location) {
    this.setState({
      location,
      showPicker: false,
      config:{},
      typeName:''
    });

  }

  _onFormChange(field, value) {
    this.setState({
      [field]: value
    });
  }

  _submit() {

    this.setState({ submitting: true, error: ''}, () => {
      let { login_target, login_type, description } = this.state.config;

      if(this.submitting) { return; }

      this.submitting = true;

      let body = {}
      description.map(obj => {
        body[obj.name] = this.state[obj.name];
      })
      post('/bill/gjj-login', Object.assign({loan_type: 0, login_target, login_type}, body))
      .then(response => {
          if(response.res == responseStatus.success && response.data.second_login == 1) {
            this.setState({submitting: false, visibleVerify: true, submitResult: response.data});
          }else if(response.res == responseStatus.success){
            this.setState({submitting: false });

          }else {
            this.setState({submitting: false, error: response.msg });
          }
        })
        .catch(err => {
          this.setState({submitting: false});
        })

    })
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1
  },
  inputGroup: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingHorizontal:10
  },
  input: {
    flex: 1,
    marginLeft: 18,
    marginRight: 10,
    fontSize: 12,
    color: '#A5A5A5',
    backgroundColor: '#fff'
  },
  text:{
    fontSize:12,
    color:'#727272',
    width:70,
  },
  submitBtn: {
    marginTop: 50,
    height: 40,
    backgroundColor: '#FF003C',
    borderRadius: 4,
    width:250
  },
  submitBtnText: {
    fontSize: 20,
    color: '#fff',
  },
})

function mapStateToProps(state) {
  return {
    isFetching: state.online.gjjLoginElements.isFetching,
    fetched: state.online.gjjLoginElements.fetched
  }
}

function mapDispatchToProps(dispatch) {
  return {
    gjjLoginElements: () => dispatch(onlineActions.gjjLoginElements()),
    fetching: () => dispatch(onlineActions.gjjLoginElements())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, FundLoginScene));
