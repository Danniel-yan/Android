import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, NativeModules} from 'react-native';
import {fontSize, border, centering} from 'styles';
import {ExternalPushLink} from 'containers/shared/Link';

import onlineStyles from 'containers/online/styles';
import {connect} from "react-redux";
import {post} from 'utils/fetch';
import tracker from 'utils/tracker.js';

import {hbFlag, hbFetchingStatus, clearHbFetching} from 'actions/online/hBFetchingCHDStatus';

const statusDir = {
    0: "去认证", 1: "认证中", 2: "已认证", 3: "认证失败", 4: "已过期"
};

const JumpFuncDir = {
    "jd": NativeModules.ImportBillModule ? NativeModules.ImportBillModule.importJingdongBill : null,
    "alipay": NativeModules.ImportBillModule ? NativeModules.ImportBillModule.importAlipayBill : null
}

const statusItemConfigs = {
    "bank_wap": {icon: require("assets/online/chd/card.png"), title: "信用卡认证", vertical: false},
    "alipay": {icon: require("assets/online/chd/alipay.png"), title: "支付宝认证", vertical: false},
    "yys": {icon: require("assets/online/chd/yys.png"), title: "运营商认证", vertical: false},
    "idscore": {icon: require("assets/online/chd/idscore.png"), title: "身份证认证", vertical: false},
    "jd": {icon: require("assets/online/chd/jd.png"), title: "京东账单", vertical: true},
    "gjj": {icon: require("assets/online/chd/gjj.png"), title: "公积金账单", vertical: true},
}

function StatusItemComponent({statusKey, ...props}) {
    var {icon, title, vertical} = statusItemConfigs[statusKey];
    var {isFetching} = props;
    var {style} = props;
    var verified = (statusKey && props.statuses ? props.statuses[statusKey] == 2 : null);
    var disabled = verified || (statusKey && props.statuses && props.statuses[statusKey] == 1);

    let JumpComponent = props.routeParams && props.routeParams.toKey ? ExternalPushLink : TouchableOpacity;
    let onPress = props.onPress;

    return vertical ? (
        <JumpComponent style={style} disabled={disabled} onPress={() => {
            onPress && onPress()
        }} {...props.routeParams} >
            <Image source={icon} style={{width: 49, height: 49, marginBottom: 5}}></Image>
            <Text style={{fontSize: fontSize.xsmall, marginBottom: 14}}>{title}</Text>
            {isFetching ?
                <ActivityIndicator animating={true} style={centering} color={"#FF7429"} size="small"/> :
                <View style={[styles.statusTag, verified ? {backgroundColor: "#fff"} : null]}><Text
                    style={[styles.statusTxt, verified ? {color: "#FF5D4B"} : null]}>{statusDir[props.statuses[statusKey]]}</Text></View>
            }
        </JumpComponent>
    ) : (
        <JumpComponent style={style} disabled={disabled} onPress={() => {
            onPress && onPress()
        }} {...props.routeParams} >
            <Image source={icon} style={styles.img}></Image>
            <Text style={styles.txt}>{title}</Text>
            {
                isFetching ?
                    <ActivityIndicator animating={true} style={centering} color={"#FF7429"} size="small"/> :
                    <View style={[styles.statusTag, verified ? {backgroundColor: "#fff"} : null]}><Text
                        style={[styles.statusTxt, verified ? {color: "#FF5D4B"} : null]}>{statusDir[props.statuses[statusKey]]}</Text></View>
            }
        </JumpComponent>
    );
}

const StatusItem = connect(state => {
    return {
        "statuses": state.online.chaoHaoDai.applyStatus.data,
        "isFetching": state.online.chaoHaoDai.applyStatus.isFetching
    }
}, dispatch => {
    return {clearHbFetching: () => clearHbFetching()}
})(StatusItemComponent);

function PreLoanPanel({isFetching, sug_loan_amount, sug_term, interest_down, interest_up, ...props}) {
    return (
        <View>
            <View style={[{padding: 15}, styles.bg, styles.borderBtm]}>
                <View><Text style={{fontSize: fontSize.xlarge}}>预授信额度(元)：</Text></View>
                <View style={{padding: 15, height: 60}}>
                    {isFetching ?
                        <ActivityIndicator animating={true} style={centering} color={"#FF7429"} size="small"/> :
                        <Text style={{
                            textAlign: "center",
                            fontSize: 30,
                            color: "#FF7429"
                        }}>{sug_loan_amount || "10000"}</Text>}
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
            submitting: false, err: null,
            isHeartBeat: false
        };

        this.hbFlag = null;
    }

    componentDidMount() {
        this.props.fetching && this.props.fetching();

        this.setHBFetching();
    }

    componentWillUnmount() {
        this.props.clearHbFetching && this.props.clearHbFetching();
    }

    setHBFetching() {
        this.props.hbFetchingStatus && this.props.hbFetchingStatus()
    }

    render() {
        var {preloanStatus, applyStatus, activeResult} = this.props;
        var preloanData = preloanStatus.data;
        var enable = applyStatus && applyStatus.bank_wap == 2 && applyStatus.yys == 2 && applyStatus.alipay == 2 && applyStatus.idscore == 2;

        return (
            <ScrollView>
                <View style={{backgroundColor: "#F2F2F2"}}>
                    <PreLoanPanel isFetching={preloanStatus.isFetching} {...preloanData}  />

                    <View style={[{marginTop: 8, paddingHorizontal: 10}, styles.bg, styles.borderBtm]}>
                        <StatusItem statusKey="bank_wap" style={[styles.itemWrap, styles.borderBtm]} routeParams={{
                            tracking: {
                                key: "inhouse_loan",
                                topic: "certification",
                                entity: "bill",
                                event: "clk",
                                exten_info: JSON.stringify({title: this.props.title, loantype: this.props.loanType})
                            },
                            title: "信用卡认证", toKey: "OnlineCreditCards"
                        }}/>
                        <StatusItem statusKey="alipay" style={[styles.itemWrap, styles.borderBtm]} onPress={() => {
                            this.props.alipayJump && this.props.alipayJump();
                            tracker.trackAction({
                                key: "inhouse_loan",
                                topic: "certification",
                                entity: "ZFB",
                                event: "clk",
                                exten_info: JSON.stringify({title: this.props.title, loantype: this.props.loanType})
                            })
                        }}/>
                        <StatusItem statusKey="yys" style={[styles.itemWrap, styles.borderBtm]} routeParams={{
                            tracking: {
                                key: "inhouse_loan",
                                topic: "certification",
                                entity: "telecom",
                                event: "clk",
                                exten_info: JSON.stringify({title: this.props.title, loantype: this.props.loanType})
                            },
                            title: "运营商认证", toKey: "OnlineYysForm"
                        }}/>
                        <StatusItem statusKey="idscore" style={[styles.itemWrap]} routeParams={{
                            tracking: {
                                key: "inhouse_loan",
                                topic: "certification",
                                entity: "ID",
                                event: "clk",
                                exten_info: JSON.stringify({title: this.props.title, loantype: this.props.loanType})
                            },
                            title: "借款申请",
                            toKey: "OnlineLoanForm",
                            componentProps: {
                                amount: preloanData ? preloanData.sug_loan_amount : null,
                                refetchingStatus: this.props.fetching.bind(this)
                            }
                        }}/>
                    </View>
                    <View style={[{paddingHorizontal: 20, paddingVertical: 10}, styles.bg, styles.borderBtm]}>
                        <View><Text style={{fontSize: fontSize.normal}}>注：</Text></View>
                        <View><Text numberOfLines={2} style={{fontSize: fontSize.normal}}>1.以上信息用于评估您的贷款额度，
                            钞市不会向任何个人或不相关机构透露您的个人信息；</Text></View>
                        <View><Text numberOfLines={2}
                                    style={{fontSize: fontSize.normal}}>2.请使用超过6个月的信用卡认证；</Text></View>
                        <View><Text numberOfLines={2} style={{fontSize: fontSize.normal}}>3.请使用本人6个月的手机号进行认证； 如果认证失败，
                            可以更换本人手机号码再次认证；</Text></View>
                    </View>
                    <View style={[{
                        marginTop: 8,
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }, styles.bg, styles.borderBtm]}>
                        <View><Text numberOfLines={2} style={{color: "#FF7429", fontSize: fontSize.normal}}>提供更多材料，能提高30%的贷款成功率，还可以享受更高额度更低利率！</Text></View>
                    </View>
                    <View style={[{paddingVertical: 15, flexDirection: "row"}, styles.bg]}>
                        <StatusItem statusKey="jd" style={{flex: 1, alignItems: "center", ...border("right", 1)}}
                                    onPress={() => {
                                        this.props.jdJump && this.props.jdJump();
                                        tracker.trackAction({
                                            key: "inhouse_loan",
                                            topic: "certification",
                                            entity: "JD",
                                            event: "clk",
                                            exten_info: JSON.stringify({
                                                title: this.props.title,
                                                loantype: this.props.loanType
                                            })
                                        })
                                    }}/>
                        <StatusItem statusKey="gjj" style={{flex: 1, alignItems: "center"}} routeParams={{
                            tracking: {
                                key: "inhouse_loan",
                                topic: "certification",
                                entity: "PAF",
                                exten_info: JSON.stringify({title: this.props.title})
                            },
                            title: "公积金认证", toKey: "FundLogin"
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
        post('/loanctcf/apply', {
            loan_type: this.props.loanType,
            apply_mount: this.props.preloanStatus.data.sug_loan_amount
        }).then(response => {

            if (response.res == responseStatus.success) {
                // this.props.fetchStatus();
                this.setState({submitting: false})
                return true;
            }

            throw response.msg;
        })
            .catch((msg) => {
                this.setState({submitting: false, error: msg})
                throw msg;
            })
    }
}

const styles = {
    bg: {backgroundColor: "#fff"},
    borderBtm: {...border('bottom', 1)},

    itemWrap: {paddingVertical: 15, flexDirection: "row", alignItems: "center"},
    img: {width: 30, height: 30}, txt: {flex: 1, fontSize: fontSize.large, paddingLeft: 10},
    statusTag: {
        paddingVertical: 1,
        paddingHorizontal: 5,
        borderColor: "#FF5D4B",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#FF5D4B"
    },
    statusTxt: {fontSize: fontSize.xsmall, color: "#fff"}
}

function mapStateToProps(state) {
    let {online, loanDetail} = state, preloanStatus = online.preloanStatus, chaoHaoDai = online.chaoHaoDai;
    let {applyStatus, activeResult} = chaoHaoDai;
    let detail = loanDetail.detail
    return {
        isFetching: preloanStatus.isFetching || applyStatus.isFetching,
        fetched: preloanStatus.fetched && applyStatus.fetched,

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
        },
        hbFetchingStatus: ()=> dispatch(hbFetchingStatus()),
        clearHbFetching: () => clearHbFetching(),
        fetchApplyStatus: () => dispatch(chaoHaoDai.applyStatus()),
        jdJump: () => {
            dispatch(chaoHaoDai.jumpJdNativeScene());
        },
        alipayJump: () => {
            dispatch(chaoHaoDai.jumpAlipyNativeScene());
        }
    };
}

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

export default connect(mapStateToProps, mapDispatchToProps)(CertificationChaohaoDaiCard);