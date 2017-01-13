import React, { Component } from 'react';
import { View, Text, ScrollView , TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default class FundLoginScene extends Component{

  constructor(props){
    super(props);

  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>验证码</Text>
          <TextInput value={code}
                     style={styles.input}
                     placeholder='请输入右侧验证码'
                     underlineColorAndroid="transparent"
                     onChangeText={(code) => { this.setState({code}) }}
            />
        </View>

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
  _submit(){

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

import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import fetchGjjSecondLogin from 'actions/fillUserInfo';


function mapStateToProps(state) {
  return {
    gjjSecondLogin: state.gjjSecondLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submit: () => dispatch(fetchGjjSecondLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(FundLoginScene));
