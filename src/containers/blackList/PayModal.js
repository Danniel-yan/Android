import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Modal
} from 'react-native';

import ResponsiveImage from 'components/shared/ResponsiveImage';
import { ExternalPushLink } from 'containers/shared/Link';
import Password from 'components/shared/Password';
import Loading from 'components/shared/Loading';
import ProcessingButton from 'components/shared/ProcessingButton';
import { trackingScene } from 'high-order/trackingPointGenerator';
import tracker from 'utils/tracker.js';

import { centering, fontSize, colors, headerHeight } from 'styles';

const PayStatuses = ["", "", "", ""]

class PayModal extends Component {
  tracking = { key: 'blacklist', topic: 'charge', event: 'pop' }
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      navToCardList: false,
      isPaying: false,
      codeSended: false
    };

    this.payState = null;
  }

  render() {
    this.payState = this.switchPayState();

    return (
      <View style={[styles.overlay, centering, {backgroundColor: 'rgba(0,0,0,.3)'}]}>
        <TouchableOpacity style={[styles.overlay, {}]} activeOpacity={1} onPress={() => { }} />

        {false ? (
          <View style={[{width: 200, backgroundColor: "white"}, centering]}>
            {this.renderSuccess()}
          </View>
        ) : (
          <View style={[styles.dialog]}>
            {this.payState == "PAYMENT_SUCCESS" ? null : this.renderTitle()}
            {this.renderContent()}
          </View>
        )}
      </View>
    );
  }

  switchPayState() {
    var state = this.state;

    // return "PAYMENT_SUCCESS"; // 支付成功

    if(this.props.paymentSuccess) {
      return "PAYMENT_SUCCESS";
    } else {
      if(this.props.isFetchingCardList || this.props.isFetchingFree) {
        return "FETCHING"; // 正在获取银行卡列表 以及 是否免费
      } else {
        if(state.navToCardList) {
          return "SELECT_EXIST_CARD"; // 选择银行卡
        }
        if(this.props.free) {
          return "APPLY_FREE";
        } else {
          if(!this.props.selectedCard) {
            return "WITHOUT_CARD_BIND"; // 没有绑定卡片
          } else {
            return "READY_FOR_PAYING"; // 已绑定卡片
          }
        }
      }
    }


  }

  renderContent() {
  //   return this.renderLoading();
    var payState = this.payState;
    console.log("PM-Status: " + payState);

    switch(payState) {
      case "FETCHING":
        return this.renderLoading();
      case "APPLY_FREE":
        return (
          <View>
            {this.renderPrice()}
            {this.renderPayment()}
          </View>
        );
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
        <TouchableOpacity style={{position: "absolute", top: 0, right: 0, padding: 14}} onPress={() => { this.__closePayModal__() }}>
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
    return this.props.selectedCard ? this.renderCard(this.props.selectedCard, () => {
      this.setState({navToCardList: true});
      tracker.trackAction({key: "blacklist", topic: "select_card", event: "pop"})
    }) : null;
  }

  renderCardList() {
    var list = this.props.cardList;
    //if(!list || list.length < 1) return null;

    return (
      <View style={{flexDirection: "column"}}>
      {
        list && list.length > 0 && list.map((card, idx) => {
          return (
            <View key={idx}>
              { this.renderCard(card, () => this.__selectCard__(card)) }
            </View>
          );
        })
      }
      </View>
    );
  }

  renderCard(card, onPressFunc) {
    return (
      <TouchableOpacity key={card.bankname + card.bankAccount} onPress={onPressFunc}>
        <View style={[{flexDirection: "row", padding: 10, paddingVertical: 12}, styles.bBorder, centering]}>
          <ResponsiveImage uri={card.logo.px80} style={{width: 24, height: 24, marginRight: 12, borderRadius: 12}}></ResponsiveImage>
          <Text style={{flex: 1, color: "#333", fontSize: fontSize.normal}}>{card.bankname + "  " + card.name + "  (" + card.bankAccount + ")"}</Text>
          <Image source={require("assets/icons/arrow-left.png")} style={{width: 6, height: 10, marginLeft: 10}}></Image>
        </View>
      </TouchableOpacity>
    );
  }

  renderSendCode() {
    console.log('已选中的卡的电话号码' + this.props.selectedCard.mobileNo);
    var mobileNo = this.props.selectedCard.mobileNo;
      mobileNo = mobileNo.split('');
      mobileNo.splice(3,4,'****');
      mobileNo = mobileNo.join('');
    return (
      <View style={[{flexDirection: "row", padding: 10, paddingVertical: 12}, styles.bBorder, centering]}>
        <Image source={require("assets/discovery/shoujihao.png")} style={{width: 24, height: 24, marginRight: 12, borderRadius: 12}}></Image>
        <Text style={{flex: 1, color: "#333", fontSize: fontSize.normal}}>{mobileNo}</Text>
        <TouchableOpacity onPress={() => this.__reSendPayCode__()}>
          <View style={[{height: 24, width: 70, borderWidth:0.5, borderColor: "#ff6d17", borderRadius: 4}, centering]}>
            <Text style={{color: "#ff6d17", fontSize: fontSize.xsmall}}>获取验证码</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderPayment() {
    var isPaymentSubmiting = this.props.paymentCodeSubmiting && !this.props.error;
    // return this.props.paymentSended ? (
    return this.props.paymentSended ? (
      <View>
        {this.renderSendCode()}
        <View style={{paddingHorizontal: 10, paddingTop: 10, paddingBottom: 2}}>
          <Password num={6} onComplete={code => this.__submitPayCode__(code)} disabled={isPaymentSubmiting} tracking={{key: "blacklist", topic: "vef", event: "pop"}}></Password>
          <Text style={{fontSize: fontSize.xsmall, marginTop: 6, textAlign: "center", color: isPaymentSubmiting ? colors.success : colors.error}}>
            {isPaymentSubmiting ? "正在支付..." : (this.props.error || " ")}
          </Text>
        </View>
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
          text={"确认支付"}
          tracking={{key: "blacklist", topic: "charge", entity: "confirm", event: "clk"}}>
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
          textStyle={styles.addCardTxt}
          tracking={{key: "blacklist", topic: this.props.selectedCard ? "select_card" : "charge", entity: "add", event: "clk"}}>
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
        <Text style={{textAlign: "center", paddingTop: 6, fontSize: fontSize.normal}}>
          支付成功
          {this.props.isFetchingResult ? <Text>, 正在生成结果...</Text> : null}
          {this.props.paymentSuccess && !this.props.isFetchingResult && this.props.result !== null ? <Text>, 正在跳转...</Text> : null}
        </Text>
      </View>
    );
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

  __closePayModal__() {
    if(this.props.paymentStart) return; // 当前支付中途原则上不该退出。

    this.props.close && this.props.close();
    this.props.clearPaymentInfo && this.props.clearPaymentInfo();
    this.props.freeStatus && this.props.freeStatus(); // 每次关闭窗口重新检查一下免费状态
  }

  __externalToReport__() {
    this.__closePayModal__();
    this.props.externalPush && this.props.externalPush({
      key: "CreditReport", title: "网贷信用查询",
      componentProps: { result: this.props.result }
    });
  }

  __reSendPayCode__() {

  }

  componentWillReceiveProps(newProps) {
    clearTimeout(this.navTimeFlag);

    if(newProps.paymentSuccess && !newProps.isFetchingResult && newProps.result !== null) {
      tracker.trackAction({key: "blacklist", topic: "payment", entity: "success", event: "pop"});
      this.navTimeFlag = setTimeout(() => {
        console.log("M-NavToResult");
        this.__externalToReport__()
      }, 1000);
    }
  }

  componentWillUnmount() {
    // this.__closePayModal__();
    clearTimeout(this.navTimeFlag);
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
    paddingBottom: 10,
    marginBottom: headerHeight
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
import { FreeStatus, AddCard, SelectCard, SubmitPayment, SubmitPayCode, ClearPaymentInfo } from 'actions/blackList';
import { externalPush } from 'actions/navigation';

function mapStateToProps(state) {
  return state.blackListData;
}

function mapDispatchToProps(dispatch) {
  return {
    selectPaymentCard: card => dispatch(SelectCard(card)),
    submitPayment: () => dispatch(SubmitPayment()),
    submitPayCode: code => dispatch(SubmitPayCode(code)),
    clearPaymentInfo: () => dispatch(ClearPaymentInfo()),
    freeStatus: () => dispatch(FreeStatus()),

    externalPush: route => dispatch(externalPush(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(PayModal))
