import React, { Component } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { fontSize, border, centering } from 'styles';
import { ExternalPushLink } from 'containers/shared/Link';

import onlineStyles from 'containers/online/styles';
import { connect } from "react-redux";

function StatusItemComponent({isFetching, icon, title, style, routeParams, vertical, statusKey, statuses}) {
  verified = (statusKey && statuses ? statuses[statusKey] == 2 : null);
  return vertical ? (
      <ExternalPushLink style={style} disabled={verified} {...routeParams} >
        <Image source={icon} style={{width: 49, height: 49, marginBottom:5}}></Image>
        <Text style={{fontSize: fontSize.xsmall, marginBottom: 14}}>{title}</Text>
        {isFetching ? 
          <ActivityIndicator animating={true} style={centering} color={"#FF7429"} size="small" /> : 
          <View style={[styles.statusTag, verified ? { backgroundColor: "#fff" } : null]}><Text style={[styles.statusTxt, verified ? { color: "#FF5D4B" } : null]}>{verified ? "已认证" : "去认证"}</Text></View>
        }
      </ExternalPushLink>
    ) : (
      <ExternalPushLink style={style} disabled={verified} {...routeParams} >
        <Image source={icon} style={styles.img}></Image>
        <Text style={styles.txt}>{title}</Text>
        {
          isFetching ? 
          <ActivityIndicator animating={true} style={centering} color={"#FF7429"} size="small" /> : 
          <View style={[styles.statusTag, verified ? { backgroundColor: "#fff" } : null]}><Text style={[styles.statusTxt, verified ? { color: "#FF5D4B" } : null]}>{verified ? "已认证" : "去认证"}</Text></View>
        }
      </ExternalPushLink>
    );
}

const StatusItem = connect(state => { return { 
  "statuses": state.online.chaoHaoDai.applyStatus.data,
  "isFetching": state.online.chaoHaoDai.applyStatus.isFetching || state.online.chaoHaoDai.activeResult.isFetching
}}, null)(StatusItemComponent);

function PreLoanPanel({isFetching, sug_loan_amount, sug_term, interest_down, interest_up,  ...props}) {
  return (
    <View>
      <View style={[{padding: 15}, styles.bg, styles.borderBtm]}>
            <View><Text style={{fontSize: fontSize.xlarge}}>预授信额度(元)：</Text></View>
            <View style={{padding: 15}}>
              {isFetching ? 
                <ActivityIndicator animating={true} style={centering} color={"#FF7429"} size="small" /> : 
                <Text style={{textAlign: "center", fontSize: 30, color: "#FF7429"}}>{sug_loan_amount}</Text>}
            </View>
          </View>
          <View style={[{paddingHorizontal: 10, paddingVertical: 20}, styles.bg]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{fontSize: fontSize.large}}>借款期限：</Text>
              <Text style={{fontSize: fontSize.large, flex: 1, textAlign: "right"}}>{sug_term}期</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{fontSize: fontSize.large}}>月费率：</Text>
              <Text style={{fontSize: fontSize.large, flex: 1, textAlign: "right"}}>{interest_down}%-{interest_up}%</Text>
            </View>
      </View>
    </View>
  );
}

class CertificationChaohaoDaiCard extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      submitting: false, err: null
    }
  }

  componentDidMount() {
    this.props.fetching && this.props.fetching();
  }

  render() {
    var { preloanStatus, applyStatus, activeResult } = this.props;
    var preloanData = preloanStatus.data;
    var enable = false;

    return (
      <ScrollView>
        <View style={{backgroundColor: "#F2F2F2"}}>
          <PreLoanPanel isFetching={preloanStatus.isFetching} {...preloanData} />
          
          <View style={[{marginTop: 8, paddingHorizontal: 10}, styles.bg, styles.borderBtm]}>
            <StatusItem style={[styles.itemWrap, styles.borderBtm]} icon={require("assets/online/chd/card.png")} title="信用卡认证" statusKey="bank_wap" routeParams={{
              tracking: {key: "inhouse_loan", topic: "certification", entity: "bill", exten_info: JSON.stringify({title: this.props.title})},
              title:"信用卡认证", toKey:"OnlineCreditCards"
            }}/>
            <StatusItem style={[styles.itemWrap, styles.borderBtm]} icon={require("assets/online/chd/alipay.png")} title="支付宝认证" statusKey="alipay" />
            <StatusItem style={[styles.itemWrap, styles.borderBtm]} icon={require("assets/online/chd/yys.png")} title="运营商认证" statusKey="yys" routeParams={{
              tracking: {key: "inhouse_loan", topic: "certification", entity: "telecom", exten_info: JSON.stringify({title: this.props.title})},
              title:"运营商认证", toKey:"OnlineYysForm"
            }}/>
            <StatusItem style={[styles.itemWrap]} icon={require("assets/online/chd/idscore.png")} title="身份证认证" statusKey="idscore" routeParams={{
              title:"借款申请", toKey:"OnlineLoanForm", componentProps: { amount: preloanData ? preloanData.sug_loan_amount : null, refetchingStatus: this.props.fetching.bind(this) }
            }}/>
          </View>
          <View style={[{paddingHorizontal: 20, paddingVertical: 10}, styles.bg, styles.borderBtm]}>
            <View><Text style={{fontSize: fontSize.normal}}>注：</Text></View>
            <View><Text numberOfLines={2} style={{fontSize: fontSize.normal}}>1.以上信息用于评估您的贷款额度， 钞市不会向任何个人或不相关机构透露您的个人信息；</Text></View>
            <View><Text numberOfLines={2} style={{fontSize: fontSize.normal}}>2.请使用超过6个月的信用卡认证；</Text></View>
            <View><Text numberOfLines={2} style={{fontSize: fontSize.normal}}>3.请使用本人6个月的手机号进行认证； 如果认证失败， 可以更换本人手机号码再次认证；</Text></View>
          </View>
          <View style={[{marginTop: 8, paddingHorizontal: 20, paddingVertical: 10}, styles.bg, styles.borderBtm]}>
            <View><Text numberOfLines={2} style={{color: "#FF7429", fontSize: fontSize.normal}}>提供更多材料，能提高30%的贷款成功率，还可以享受更高额度更低利率！</Text></View>
          </View>
          <View style={[{paddingVertical: 15, flexDirection: "row"}, styles.bg]}>
            <StatusItem style={{flex: 1, alignItems: "center", ...border("right")}} icon={require("assets/online/chd/jd.png")} title="京东账单" statusKey="jd" vertical={true}/>
            <StatusItem style={{flex: 1, alignItems: "center"}} icon={require("assets/online/chd/gjj.png")} title="公积金账单" statusKey="gjj" vertical={true} routeParams={{
              tracking: {key: "inhouse_loan", topic: "certification", entity: "PAF", exten_info: JSON.stringify({title: this.props.title})},
              title:"公积金认证", toKey:"FundLogin"
            }}/>
          </View>
          <View>
            <ExternalPushLink
              title="审批状态"
              backKey="LoanDetailScene"
              toKey="OnlineApproveStatus"
              text="立即申请借款"
              processing={this.state.submitting}
              prePress={this._submit.bind(this)}
              disabled={!enable || this.state.submitting}
              style={[onlineStyles.btn, onlineStyles.btnOffset, !enable && onlineStyles.btnDisable]}
              textStyle={onlineStyles.btnText}
            >
            </ExternalPushLink>
          </View>
        </View>
      </ScrollView>
    );
  }

  _submit() {
    post('/loanctcf/apply', { loan_type: this.props.loanType, apply_mount: this.props.preloanStatus.data.sug_loan_amount }).then(response => {

      if(response.res == responseStatus.success) {
        // this.props.fetchStatus();
        this.setState({ submitting: false })
        return true;
      }

      throw response.msg;
    })
    .catch((msg) => {
      this.setState({ submitting: false, error: msg })
      throw msg;
    })
  }
}

const styles = {
  bg: { backgroundColor: "#fff" },
  borderBtm: { ...border('bottom') },

  itemWrap: { paddingVertical: 15, flexDirection: "row", alignItems: "center" },
  img: { width:30,height:30 }, txt: { flex: 1, fontSize: fontSize.large, paddingLeft: 10 },
  statusTag: { paddingVertical: 1, paddingHorizontal: 5, borderColor: "#FF5D4B", borderWidth: 1, borderRadius: 10, backgroundColor: "#FF5D4B" },
  statusTxt: { fontSize: fontSize.xsmall, color: "#fff" }
}

function mapStateToProps(state) {
  let { online, loanDetail } = state, preloanStatus = online.preloanStatus, chaoHaoDai = online.chaoHaoDai;
  let { applyStatus, activeResult } = chaoHaoDai;
  let detail = loanDetail.detail
  return {
    isFetching: preloanStatus.isFetching || applyStatus.isFetching || activeResult.isFetching,
    fetched: preloanStatus.fetched && applyStatus.fetched && activeResult.fetched,
    
    loanType: online.loanType.type,
    loanDetail: state.loanDetail.detail,

    bankResult: online.bankResult,
    yysResult: online.yysResult,
    gjjResult: online.gjjResult,

    applyStatus: applyStatus.data, 
    activeResult: activeResult.data, 
    preloanStatus: preloanStatus,

    title: detail.title
  };
}

import onlineActions from 'actions/online';
import chaoHaoDai from "actions/online/chaoHaoDai";

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(onlineActions.preloanStatus());
      dispatch(chaoHaoDai.applyStatus());
      dispatch(chaoHaoDai.checkActiveResult());
    },
    fetchApplyStatus: () => dispatch(chaoHaoDai.applyStatus()),
    fetchCheckActiveResult: () => dispatch(chaoHaoDai.checkActiveResult())
  };
}

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

export default connect(mapStateToProps, mapDispatchToProps)(CertificationChaohaoDaiCard);