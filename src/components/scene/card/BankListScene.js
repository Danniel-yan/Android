import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet,  TouchableHighlight } from 'react-native';

import {colors} from 'styles/varibles';

import Text from 'components/shared/Text';
import Dimensions from 'Dimensions';

import iconNext from 'assets/index-icons/icon_next.png';

import { ExternalPushLink } from 'containers/shared/Link';

export default class BankListScene extends Component{

  render(){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.bankList)

    return(
      <View style={[styles.bgColorWhite]}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={this.renderBankList}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          />

        {this.moreBankList(this.props.bankList)}

      </View>
    )
  }

  renderBankList(data){
    return(
      <View style={styles.itemViewStyle}>
        <ExternalPushLink title="极速办卡" toKey="CardListScene" componentProps={{fetchingParams: { bankid: data.id}}}>
          <View style={[styles.itemViewStyle,styles.row]}>
            <Image style={styles.thumb} source={{uri: data.pic_card}} />
            <View>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.info}>{data.info}</Text>
            </View>
          </View>
        </ExternalPushLink>
      </View>
    )
  }

  moreBankList(props){

    if(props.length == 8 || props.length < 8 )  return null;

    return(
      <View style={styles.moreBank}>
        <ExternalPushLink title="极速办卡" toKey="CardListScene" componentProps={{fetchingParams: { categoryid: null , bankid: null}}}>
          <Text style={{fontSize:17,color:colors.fontColorPrimary}}>
            查看更多
            <Image style={styles.titleRightImg} source={iconNext} />
          </Text>
        </ExternalPushLink>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bgColorWhite:{
    backgroundColor:colors.white
  },
  list: {
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  itemViewStyle:{
    width: Dimensions.get('window').width / 2,
    height:90
  },
  row:{
    paddingTop:20,
    paddingBottom:20,
    borderRightWidth:1,
    borderRightColor: colors.line,
    borderStyle : 'solid',
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor: colors.line
  },
  thumb: {
    width: 45,
    height: 45,
    marginLeft:15,
    marginRight:15
  },
  name:{
    color:colors.fontColorSecondary,
    fontSize:17,
    marginBottom:6
  },
  info:{
    fontSize:12,
    width:Dimensions.get('window').width/2 - 80
  },
  moreBank:{
    width: Dimensions.get('window').width / 2,
    height:90,
    borderRightWidth:1,
    borderRightColor: colors.line,
    borderStyle : 'solid',
    justifyContent: 'center',
    alignItems:'center'
  }
})