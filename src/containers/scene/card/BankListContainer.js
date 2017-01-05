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
import Bank from 'components/Bank';

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

    let banks = this.state.bankList.map((bank,index) =>{

      let props = bank.link ?
        this._bankWebProps(bank, index) : this._bankListProps(bank, index);

      return (
        <ExternalPushLink key={"bank"+index} {...props}>
          <Bank info={bank.info} name={bank.name} image={bank.pic_card}/>
        </ExternalPushLink>
      )
    });

    return(
      <View style={[styles.bgColorWhite, {flexDirection:'row',flexWrap: 'wrap', alignItems: 'flex-start'}]}>

        {banks}

        {this.moreBankList(this.props.bankList)}
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

  _bankListProps(bank, index) {
    return {
      toKey: 'CardListScene',
      title: bank.name,
      tracking:{key: 'card', topic: 'bank_list', entity: index, bank_name: bank.name},
      componentProps:{fetchingParams: { bankid: bank.id , categoryid: 0, offset: 0}}
    };

  }

  _bankWebProps(bank, index) {
    return {
      web: bank.link,
      title: bank.name,
      tracking:{ key: 'card', topic: 'bank_list', entity: index, bank_name: bank.name },
      componentProps: { tracking: {key: 'card', topic: 'card_application', bank_name: bank.name, card_name: bank.name} }
    };
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
