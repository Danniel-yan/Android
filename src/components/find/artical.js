import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';

const data = [{title : '分期购物VS全款购物，你习惯那种购物方式', subTitle : '信用卡攻略', num : '3284', image : require('assets/online/import-success.png')},
  {title : '分期购物VS全款购物，你习惯那种购物方式', subTitle : '信用卡攻略', num : '3284', image : require('assets/online/import-success.png')}
]

export default class artical extends Component {
  render (){
    return (
      <View>
        <Text style = {{paddingLeft : 10, marginBottom : 10}}>精选</Text>
        {this.renderItem()}
      </View>

    )
  }

  renderItem(){
    return(
    data.map( (item, index) =>{
      return(
      <View key = {index} style = {styles.containers}>
       <ExternalPushLink
        toKey = 'CreditLoan'
        title = '信用贷'
        style = {{flexDirection: 'row'}}
       >
        <View style = {{flex : 1, paddingHorizontal : 10}}>
          <Text style = {{marginBottom : 15}}>{item.title}</Text>
          <View style = {{flexDirection : 'row'}}>
            <Text style = {{marginRight : 10, color : 'blue', fontSize : 12}}>{item.subTitle}</Text>
            <Text style = {{color : '#999',fontSize : 12}}>阅读数量{item.num}</Text>
          </View>
        </View>
        <Image source = {item.image} style = {{width : 120,height : 80}}/>
        </ExternalPushLink>
      </View>
      )
    })
    )
  }

}

const styles = StyleSheet.create({
  containers : {
    paddingHorizontal: 10,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  }
})