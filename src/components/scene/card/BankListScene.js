import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet,  TouchableHighlight } from 'react-native';

import {colors} from 'styles/varibles';

import Text from 'components/shared/Text';
import Dimensions from 'Dimensions';

import iconNext from 'assets/index-icons/icon_next.png';

import { ExternalPushLink } from 'containers/shared/Link';

export default class BankListScene extends Component{

  constructor(props) {
    super(props);
    this.state = {
      length:this.props.bankList.length,
      bankList: []
    };
  }

  componentDidMount() {
    if(this.state.length > 8){
      this.setState({bankList: this.props.bankList.slice(0,7)})
    }
    this.setState({bankList: this.props.bankList})
  }

  render(){

    return(
      <View style={[styles.bgColorWhite]}>

        <View style={styles.list}>
          {
            this.state.bankList.map((data,index) =>
              <View key={'key'+index} style={styles.itemViewStyle}>
                <ExternalPushLink title={data.name} toKey="CardListScene" componentProps={{fetchingParams: { bankid: data.id , categoryid: 0}}}>
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

          {this.moreBankList(this.props.bankList)}
        </View>



      </View>
    )
  }



  moreBankList(props){

    if(props.length <= 8 )  return null;

    return(
      <View style={styles.moreBank}>
        <ExternalPushLink title="极速办卡" toKey="BankCardListScene" componentProps={{fetchingParams: { categoryid: 0 , bankid: 0}}}>
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
    width: Dimensions.get('window').width / 2 - 1,
    height:100
  },
  row:{
    borderRightWidth:1,
    borderRightColor: colors.line,
    borderStyle : 'solid',
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor: colors.line,
    justifyContent: 'center',
    alignItems:'center'
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
    fontSize:14,
    width:Dimensions.get('window').width/2 - 80
  },
  moreBank:{
    width: Dimensions.get('window').width / 2 -1,
    height:100,
    borderRightWidth:1,
    borderRightColor: colors.line,
    borderStyle : 'solid',
    justifyContent: 'center',
    alignItems:'center'
  }
})