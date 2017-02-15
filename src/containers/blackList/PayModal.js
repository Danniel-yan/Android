import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Modal
} from 'react-native';

import ResponsiveImage from 'components/shared/ResponsiveImage';
import { ExternalPushLink } from 'containers/shared/Link';
import Password from 'components/shared/Password';
import Loading from 'components/shared/Loading';

import { centering, fontSize } from 'styles';

const PayStatuses = ["", "", "", ""]

class PayModal extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // title: "查询支付",
      // free: false,
      // bankList: this.props.cardList, // 从接口配置
      // selectedBank: this.props.cardList && this.props.cardList.length > 0 ? this.props.cardList[0] : null, // 从接口配置
      selectedBank: null,
      navToBankList: false
    }
  }

  closeModal() {
    this.props.close && this.props.close();
  }

  componentWillReceiveProps(nextProps) {
    !this.state.selectedBank && (this.state.selectedBank = nextProps.cardList && nextProps.cardList.length > 0 ? nextProps.cardList[0] : null);
  }

  componentDidMount() {
    this.props.fetchCardList && this.props.fetchCardList();
  }

  render() {
    return (
      <View style={[styles.overlay, centering, {backgroundColor: 'rgba(0,0,0,.3)'}]}>
        <TouchableOpacity style={[styles.overlay, {}]} activeOpacity={1} onPress={() => { this.closeModal() }} />
        <View style={[styles.dialog]}>
          {this.renderTitle()}
          {this.renderContent()}
        </View>

      </View>
    );
  }

  switchPayState() {
    var state = this.state;

    if(state.navToBankList) {
      return "SELECT_EXIST_BANK";
    }
    if(!state.selectedBank) {
      return "WITHOUT_BANK_BIND";
    } else {
      return "READY_FOR_PAYING";
    }
  }

  renderContent() {
  //   return this.renderLoading();
    if(this.props.isFetchingCardList) return this.renderLoading();
    var payState = this.switchPayState();

    switch(payState) {
      case "READY_FOR_PAYING":
        return (
          <View>
            {this.renderPrice()}
            {this.renderSelectedBank()}
            {this.renderPaymentPassword()}
          </View>
        );
      case "WITHOUT_BANK_BIND":
        return (
          <View>
            {this.renderPrice()}
            {this.renderAddBankNavBtn()}
          </View>
        );
      case "SELECT_EXIST_BANK":
        return (
          <View>
            {this.renderBankList()}
            {this.renderAddBankNavBtn()}
          </View>
        );
    }
  }

  // // Modal层处于Navigation层之上， 不会随Navigation跳转， 故而在这种情况下不推荐使用。
  // render() {
  //   console.log(this.state);
  //   return (
  //     <Modal
  //       animationType={"fade"}
  //       visible={this.state.visible}
  //       onRequestClose={() => {console.log("dialog closed")}}
  //       style={[{flexDirection: "column", paddingHorizontal: 10}, centering]}>
  //
  //       <View style={[styles.overlay, centering]} activeOpacity={1}>
  //         <TouchableOpacity style={[styles.overlay, {backgroundColor: 'rgba(0,0,0,.3)'}]} activeOpacity={1} onPress={() => { this.setState({visible: false}) }} />
  //         <View style={[styles.dialog]}>
  //           {this.renderTitle()}
  //           {this.renderPrice()}
  //           {this.renderBankList([{logo: "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/6.png", name: "招商银行"},
  //             {logo: "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/7.png", name: "邮政储蓄"}])}
  //           {this.renderAddBankNavBtn()}
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // }

  renderTitle() {
    return (
      <View style={[styles.title, styles.bBorder]}>
        <Text style={{flex: 1, fontWeight: "700", textAlign: "center", fontSize: fontSize.xxxlarge}}>{this.state.navToBankList ? "选择支付方式" : "查询支付"}</Text>
        <TouchableOpacity style={{position: "absolute", top: 0, right: 0, padding: 14}} onPress={() => { this.closeModal() }}>
          <Image style={{height: 20, width: 20}} source={require("assets/online/close.png")}></Image>
        </TouchableOpacity>
        {this.state.navToBankList ? (
          <TouchableOpacity style={{position: "absolute", top: 0, left: 0, padding: 19}} onPress={() => { this.setState({navToBankList: false}); }}>
            <Image style={{width: 8, height: 12}} source={require("assets/icons/back.png")}></Image>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  renderPrice() {
    return (
      <View style={[styles.price, styles.bBorder, centering]}>
        <Text style={{fontSize: fontSize.xlarge, color: "#333"}}>金额：</Text>
        <Text style={{fontSize: 30}}>{this.props.free ? "¥0" : "¥3"}</Text>
      </View>
    );
  }

  renderSelectedBank() {
    return this.state.selectedBank ? this.renderBank(this.state.selectedBank, () => this.setState({navToBankList: true})) : null;
  }

  renderBankList() {
    var list = this.props.cardList;
    //if(!list || list.length < 1) return null;

    return (
      <View style={{flexDirection: "column"}}>
      {
        list && list.length > 0 && list.map((bank, idx) => {
          return this.renderBank(bank, () => this.__selectBank__(bank))
        })
      }
      </View>
    );
  }

  renderBank(bank, onPressFunc) {
    return (
      <TouchableOpacity key={bank.bankname + bank.name} onPress={onPressFunc}>
        <View style={[{flexDirection: "row", padding: 10, paddingVertical: 12}, styles.bBorder, centering]}>
          <ResponsiveImage uri={bank.logo.px80} style={{width: 24, height: 24, marginRight: 12, borderRadius: 12}}></ResponsiveImage>
          <Text style={{flex: 1, color: "#333", fontSize: fontSize.normal}}>{bank.bankname + "  " + bank.name + "  (" + bank.bankAccount + ")"}</Text>
          <Image source={require("assets/icons/arrow-left.png")} style={{width: 6, height: 10, marginLeft: 10}}></Image>
        </View>
      </TouchableOpacity>
    );
  }

  renderSendCodeBtn() {
    return null;
  }

  renderPaymentPassword() {
    return (
      <View style={{paddingHorizontal: 10, paddingVertical: 14}}>
        <Password num={6}></Password>
      </View>
    );
  }

  renderAddBankNavBtn() {
    return (
      <View style={{padding: 14, paddingBottom: 20}}>
        <ExternalPushLink
          title="添加银行卡"
          toKey="AddBankCard"
          text="添加银行卡"
          style={styles.addBankBtn}
          textStyle={styles.addBankTxt}>
        </ExternalPushLink>
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={{height: 40, paddingBottom: 10}}><Loading /></View>
    );
  }

  __navToBankList__() {
    this.setState({navToBankList: true});
  }

  __selectBank__(bank) {
    this.setState({
      navToBankList: false,
      selectedBank: bank
    })
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 60
  },
  dialog: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 10
  },
  title: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    position: "relative"
  },
  price: {
    padding: 14,
    flexDirection: "row"
  },
  bBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2"
  },
  addBankBtn: {
    borderRadius: 5,
    backgroundColor: "#FD6E2C",
    padding: 10,
    height: 40,
  },
  addBankTxt: {
    color: "white",
    textAlign: "center"
  }
});

import { connect } from 'react-redux';
import { CardList, AddCard } from 'actions/blackList';

function mapStateToProps(state) {
  // console.log(state.blackListData)
  return state.blackListData;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCardList: () => dispatch(CardList()),
    // addBankCard: () => dispatch(AddCard({
    //
    //         "id": 3, //bindcard_id,/payctcf/create接口中需要
    //         "name": "李尧" + Math.random(), //姓名
    //         "bankAccount": "1681", //卡号后4位
    //         "bank_id": 6,
    //         "bankname": "招商银行", //银行名称
    //         "logo": {
    //             "small": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/small/6.png",
    //             "index": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/index/6.png",
    //             "white": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/white/6.png",
    //             "px80": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/6.png"
    //         }
    //
    // }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayModal)
