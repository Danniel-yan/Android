import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Modal, TouchableOpacity} from 'react-native';

import Button from 'components/shared/ButtonBase';


export default class addBankCard extends Component {
  render(){
    return(
      <View style = {styles.container}>
        <View style = {{marginTop : 10, backgroundColor : '#fff', flex : 1, paddingHorizontal : 20}}>
          <View style = {styles.item}>
            <Text style = {styles.itemTitle}>真实姓名</Text>
            <TextInput
              placeholder = '请输入您的真实姓名'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={name => this.setState({name})}
            />
          </View>
          <View style = {styles.item}>
            <Text style = {styles.itemTitle}>银行卡号</Text>
            <TextInput
              placeholder = '请填写本人银行卡号'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={name => this.setState({name})}
            />
          </View >
          <View style = {styles.item}>
            <Text style = {styles.itemTitle}>手机号码</Text>
            <TextInput
              placeholder = '请填写银行预留手机号码'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={name => this.setState({name})}
            />
          </View>
          <View style = {styles.btn}>
            <Button
              style={styles.submitBtn}
              onPress={() => { }}>
              <Text style={styles.submitBtnText}>确定</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  item : {
    paddingLeft : 20,
    marginBottom : 10,
    flexDirection : 'row',
    paddingVertical : 10,
    borderBottomWidth : 1,
    borderBottomColor : '#cecece',
    height : 50,
    alignItems : 'center'
  },
  itemTitle : {
    marginBottom : 10,
    width : 80
  },
  itemInput : {
    fontSize : 16,
    height : 25,
    flex : 1,
    textAlign : 'left',
    paddingRight : 20
  },
  btn : {
    paddingHorizontal : 10,
    paddingBottom : 5,
    marginBottom : 80,
    marginTop : 40
  },
  submitBtn: {
    marginTop: 10,
    height: 46,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  submitBtnText: {
    fontSize: 18,
    color: '#fff'
  },
})
