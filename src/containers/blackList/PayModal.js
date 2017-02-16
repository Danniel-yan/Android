import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Modal
} from 'react-native';

import ResponsiveImage from 'components/shared/ResponsiveImage';
import { ExternalPushLink } from 'containers/shared/Link';
import Password from 'components/shared/Password';
import Loading from 'components/shared/Loading';
import ProcessingButton from 'components/shared/ProcessingButton';

import { centering, fontSize, colors } from 'styles';

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
      // selectedBank: null,
      navToCardList: false,
      isPaying: false,
      codeSended: false
    };

    this.payState = null;
  }

  closeModal() {
    this.props.close && this.props.close();
  }

  //componentWillReceiveProps(nextProps) {
    //!this.state.selectedBank && (this.state.selectedBank = nextProps.cardList && nextProps.cardList.length > 0 ? nextProps.cardList[0] : null);
  //}

  componentDidMount() {
    this.props.fetchCardList && this.props.fetchCardList();
  }

  // <View style={[{width: 100, height: 100, backgroundColor: "#fff"}, centering]}>
  //   <Image source={require("assets/icons/zhifuchenggong.png")}></Image>
  // </View>

  render() {
    this.payState = this.switchPayState();
    console.log(this.payState)

    return (
      <View style={[styles.overlay, centering, {backgroundColor: 'rgba(0,0,0,.3)'}]}>
        <TouchableOpacity style={[styles.overlay, {}]} activeOpacity={1} onPress={() => { }} />

        <View style={[styles.dialog]}>
          {this.renderTitle()}
          {this.renderContent()}
        </View>
      </View>
    );
  }

  switchPayState() {
    var state = this.state;


    if(this.props.isFetchingCardList) {
      return "FETCHING_BANKLIST"; // 正在获取银行卡列表
    } else {
      if(this.props.paymentSuccess) {
        return "PAYMENT_SUCCESS"; // 支付成功
      } else {
        if(state.navToCardList) {
          return "SELECT_EXIST_CARD"; // 选择银行卡
        }
        if(!this.props.selectedCard) {
          return "WITHOUT_CARD_BIND"; // 没有绑定卡片
        } else {
          return "READY_FOR_PAYING"; // 已绑定卡片
        }
      }
    }
  }

  renderContent() {
  //   return this.renderLoading();
    var payState = this.payState;

    switch(payState) {
      case "FETCHING_BANKLIST":
        return this.renderLoading();
      case "READY_FOR_PAYING":
        return (
          <View>
            {this.renderPrice()}
            {this.renderSelectedBank()}
            {this.renderPayment()}
          </View>
        );
      case "WITHOUT_CARD_BIND":
        return (
          <View>
            {this.renderPrice()}
            {this.renderAddCardNavBtn()}
          </View>
        );
      case "SELECT_EXIST_CARD":
        return (
          <View>
            {this.renderCardList()}
            {this.renderAddCardNavBtn()}
          </View>
        );
      case "PAYMENT_SUCCESS":
        return this.renderSuccess();
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
  //           {this.renderCardList([{logo: "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/6.png", name: "招商银行"},
  //             {logo: "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/7.png", name: "邮政储蓄"}])}
  //           {this.renderAddCardNavBtn()}
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // }

  renderTitle() {
    return this.props.paymentSuccess ? null : (
      <View style={[styles.title, styles.bBorder]}>
        <Text style={{flex: 1, fontWeight: "700", textAlign: "center", fontSize: fontSize.xxxlarge}}>{this.state.navToCardList ? "选择支付方式" : "查询支付"}</Text>
        <TouchableOpacity style={{position: "absolute", top: 0, right: 0, padding: 14}} onPress={() => { this.closeModal() }}>
          <Image style={{height: 20, width: 20}} source={require("assets/online/close.png")}></Image>
        </TouchableOpacity>
        {this.state.navToCardList ? (
          <TouchableOpacity style={{position: "absolute", top: 0, left: 0, padding: 19}} onPress={() => { this.setState({navToCardList: false}); }}>
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
    return this.props.selectedCard ? this.renderCard(this.props.selectedCard, () => this.setState({navToCardList: true})) : null;
  }

  renderCardList() {
    var list = this.props.cardList;
    //if(!list || list.length < 1) return null;

    return (
      <View style={{flexDirection: "column"}}>
      {
        list && list.length > 0 && list.map((card, idx) => {
          return this.renderCard(card, () => this.__selectCard__(card))
        })
      }
      </View>
    );
  }

  renderCard(card, onPressFunc) {
    return (
      <TouchableOpacity key={card.bankname + card.name} onPress={onPressFunc}>
        <View style={[{flexDirection: "row", padding: 10, paddingVertical: 12}, styles.bBorder, centering]}>
          <ResponsiveImage uri={card.logo.px80} style={{width: 24, height: 24, marginRight: 12, borderRadius: 12}}></ResponsiveImage>
          <Text style={{flex: 1, color: "#333", fontSize: fontSize.normal}}>{card.bankname + "  " + card.name + "  (" + card.bankAccount + ")"}</Text>
          <Image source={require("assets/icons/arrow-left.png")} style={{width: 6, height: 10, marginLeft: 10}}></Image>
        </View>
      </TouchableOpacity>
    );
  }

  renderSendCodeBtn() {
    return null;
  }

  renderPayment() {
    return this.props.paymentSended ? (
      <View style={{paddingHorizontal: 10, paddingTop: 10, paddingBottom: 2}}>
        <Password num={6} onComplete={code => this.__submitPayCode__(code)} disabled={this.props.paymentCodeSubmiting}></Password>
        <Text style={{fontSize: fontSize.xsmall, marginTop: 6, textAlign: "center", color: this.props.paymentCodeSubmiting ? colors.success : colors.error}}>
          {this.props.paymentCodeSubmiting ? "正在支付..." : (this.props.error || " ")}
        </Text>
      </View>
    ) : (
      <View style={{paddingHorizontal: 10, paddingVertical: 14}}>
        {true ? null : (
          <TouchableOpacity onPress={() => this.__submitPayment__()}>
            <View style={[styles.addCardBtn, centering]}><Text style={styles.addCardTxt}>{this.props.paymentStart ? this.props.stateMsg : "确认支付"}</Text></View>
          </TouchableOpacity>
        )}

        <ProcessingButton
          style={[styles.addCardBtn, centering]}
          textStyle={styles.addCardTxt}
          processing={this.props.paymentStart}
          onPress={() => this.__submitPayment__()}
          text={"确认支付"}>
        </ProcessingButton>
        {this.props.error ? (<Text style={{fontSize: fontSize.xsmall, marginTop: 6, textAlign: "center", color: colors.error}}>{this.props.error}</Text>) : null}
      </View>
    );
  }

  renderAddCardNavBtn() {
    return (
      <View style={{padding: 14, paddingBottom: 20}}>
        <ExternalPushLink
          title="添加银行卡"
          toKey="AddBankCard"
          text="添加银行卡"
          style={styles.addCardBtn}
          textStyle={styles.addCardTxt}>
        </ExternalPushLink>
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={{height: 40, paddingBottom: 10}}><Loading /></View>
    );
  }

  renderSuccess() {
    return (
      <View style={[{paddingTop: 20}, centering]}>
        <Image style={{width: 100, height: 100}} source={require("assets/icons/zhifuchenggong.png")}></Image>
        <Text style={{textAlign: "center"}}>支付成功</Text>
      </View>
    );
  }

  __navToCardList__() {
    this.setState({navToCardList: true});
  }

  __selectCard__(card) {
    this.setState({
      navToCardList: false,
      // selectedBank: bank
    });
    this.props.selectPaymentCard && this.props.selectPaymentCard(card)
  }

  __submitPayment__() {
    // this.setState({isPaying: true})
    this.props.submitPayment && this.props.submitPayment();
  }

  __submitPayCode__(code) {
    this.props.submitPayCode && this.props.submitPayCode(code);
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
  addCardBtn: {
    borderRadius: 5,
    backgroundColor: "#FD6E2C",
    padding: 10,
    height: 40,
  },
  addCardTxt: {
    color: "white",
    textAlign: "center"
  }
});

import { connect } from 'react-redux';
import { CardList, AddCard, SelectCard, SubmitPayment, SubmitPayCode } from 'actions/blackList';

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
    selectPaymentCard: card => dispatch(SelectCard(card)),
    submitPayment: () => dispatch(SubmitPayment()),
    submitPayCode: code => dispatch(SubmitPayCode(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayModal)
