import React, { Component } from 'react';
import { View, Text, ScrollView , TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as defaultStyles from 'styles';

import ProcessingButton from 'components/shared/ProcessingButton'
import { colors } from 'styles/varibles'
import LocationPicker from 'components/modal/LocationPicker';
import Dialog from './Dialog'

import { post, responseStatus } from 'utils/fetch';

import requestGjjSecondLogin from 'actions/scene/fund/gjjSecondLogin';

export default class FundLoginScene extends Component{

  constructor(props){
    super(props);

    this.state = {
      submitting: false,
      showPicker: false,
      showDialog: false,
    };

  }

  render(){

    return(
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>请选择城市</Text>
          <TextInput value={this.state.location}
                     style={styles.input}
                     placeholder='请选择您所在的城市'
                     underlineColorAndroid="transparent"
                     onChangeText={(location) => { this.setState({location}) }}
            />
          <TouchableOpacity onPress={() => this.setState({showPicker: true}) }>
            <Image source={require('assets/icons/arrow-left.png')}/>
          </TouchableOpacity>

          <LocationPicker mark='fundCity' visible={this.state.showPicker} onChange={this._onChange.bind(this)} onHide={() => this.setState({showPicker: false})}/>
        </View>

        {
          this.state.location ? (
            <View style={styles.inputGroup}>
              <Text style={styles.text}>登陆类型</Text>
              <TextInput value={this.state.typeName}
                         style={styles.input}
                         placeholder='请选择你的登陆类型'
                         underlineColorAndroid="transparent"
                         onChangeText={(typeName) => { this.setState({typeName}) }}
                />
              <TouchableOpacity onPress={() => this.setState({showDialog: true}) }>
                <Image source={require('assets/icons/arrow-left.png')}/>
              </TouchableOpacity>

              <Dialog visible={this.state.showDialog} location={this.state.location} onChange={this._onChangeDialog.bind(this)} onHide={() => this.setState({showDialog: false})}/>
            </View>
          ): null
        }

        {
          this.state.loginType ? (
          this.state.loginType.map( (config,idx) =>
              <View key={'key' + idx } style={styles.inputGroup}>
                <Text style={styles.text}>{config.show_name}</Text>
                <TextInput
                           style={styles.input}
                           underlineColorAndroid="transparent"
                           onChangeText={this._inputChange.bind(this, config.name)}
                  />
              </View>
          )
          ):null
        }

        <View style={{justifyContent: 'center',alignItems: 'center',}}>
          <ProcessingButton
            processing={this.state.submitting}
            onPress={this._submit.bind(this)}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            text="提交"/>
        </View>
      </View>

    )
  }

  _onChangeDialog(config){
    this.setState({
      config,
      loginType:config.description,
      typeName: config.login_type_name,
      showDialog: false
    });
  }

  _onChange(location) {
    this.setState({
      location,
      showPicker: false,
      loginType:[],
      typeName:''
    });

  }

  _inputChange(field, value) {
    this.setState({[field]: value });
  }

  _submit() {

    let { login_target, login_type, description } = this.state.config;

    if(this.submitting) { return; }

    this.submitting = true;

    let body = {}
    description.map(obj => {
      body[obj.name] = this.state[obj.name];
    })

    this.setState({
      submitting: true
    }, () => {

      post('/bill/gjj-login', Object.assign({loan_type: 0, login_target, login_type}, body))
        .then(response => {
          if(response.res == responseStatus.success){
            if(response.data.second_login == 0 ){

            }
          }
        })
        .catch(err => { console.log(err); })
        .finally(() => {
          this.submitting = false;
          this.setState({submitting: false})
        })
    });
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