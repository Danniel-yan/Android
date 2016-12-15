import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet,  TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchBankList } from 'actions/scene/card/bankList';

import {colors, fontSize} from 'styles/varibles';

import Text from 'components/shared/Text';
import Dimensions from 'Dimensions';

import iconNext from 'assets/index-icons/icon_next.png';

import { ExternalPushLink } from 'containers/shared/Link';

import styles from './cardStyles';

class BankListScene extends Component{

  constructor(props) {
    super(props);
    this.state = {
      length:this.props.bankList.length,
      bankList: []
    }
  }

  componentDidMount() {
    if(this.state.length > 8){
      this.setState({bankList: this.props.bankList.slice(0,7)})
    }else{
      this.setState({bankList: this.props.bankList})
    }
  }

  render(){

    return(
      <View style={[styles.bgColorWhite]}>
        <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
          {
            this.state.bankList.map((data,index) =>{
                return (data.link) ? (
                  <View key={'key'+index} style={styles.itemViewStyle}>
                    <ExternalPushLink
                      tracking={{key: 'card', topic: 'bank_list', entity: index, bank_name: data.name}}
                      title={data.name} web={data.link}>
                      <View style={[styles.itemViewStyle,styles.row]}>
                        <Image style={styles.thumb} source={{uri: data.pic_card}} />
                        <View>
                          <Text style={{color:colors.fontColorSecondary,fontSize:fontSize.seventeen}}>{data.name}</Text>
                          <Text style={styles.info}>{data.info}</Text>
                        </View>
                      </View>
                    </ExternalPushLink>
                  </View>
                ):(
                  <View key={'key'+index} style={styles.itemViewStyle}>
                    <ExternalPushLink
                      tracking={{key: 'card', topic: 'bank_list', entity: index, bank_name: data.name}}
                      title={data.name} toKey="CardListScene" componentProps={{fetchingParams: { bankid: data.id , categoryid: 0, offset: 0}}}>
                      <View style={[styles.itemViewStyle,styles.row]}>
                        <Image style={styles.thumb} source={{uri: data.pic_card}} />
                        <View>
                          <Text style={{color:colors.fontColorSecondary,fontSize:fontSize.seventeen}}>{data.name}</Text>
                          <Text style={styles.info}>{data.info}</Text>
                        </View>
                      </View>
                    </ExternalPushLink>
                  </View>
                )
              }
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
          <Text style={{fontSize:fontSize.seventeen,color:colors.fontColorPrimary}}>
            查看更多
            <Image source={iconNext} />
          </Text>
        </ExternalPushLink>
      </View>
    )
  }
}

function mapStateToProps(state){
  return state.bankList
}

function mapDispatchToProps(dispatch){
  return {
    fetching: () => dispatch(fetchBankList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading,BankListScene))
