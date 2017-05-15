import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    AsyncStorage,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

import {ExternalPushLink} from 'containers/shared/Link';
import {externalPush, majorTab} from 'actions/navigation';
import pboc from 'actions/pboc';
import {colors, centering, fontSize} from 'styles';

import TrackingPoint  from 'components/shared/TrackingPoint';
import RecommendList from 'components/shared/RecommendList';
import navToBlackList from 'actions/blackList/navToBlackList';
import alert from 'utils/alert';

const {height, width} = Dimensions.get('window');

const AsyncRecommendList = AsynCpGenerator(Loading, RecommendList);

function Item({icon, title, confirm, tips, navProps = {}, textStyle, externalTxt}) {
    return (
        <TrackingPoint {...navProps}>
            <View style={[styles.item, styles.bdTop]}>
                <Image source={icon} style={styles.icon}/>
                <View style={{flex: 1}}>
                    <View style={styles.top}>
                        <Text style={styles.topL}>{title} <Text
                            style={{fontSize: fontSize.small, color: "#87C14D"}}>{ externalTxt}</Text></Text>
                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "flex-end"}}>
                            <Text style={textStyle}>{confirm}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TrackingPoint>
    );
}

class CertifPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouXinFlag: true,
            fetching: true
        }
    }

    componentDidMount() {
        this.props.fetching && this.props.fetching();
        this.setState({fetching: false});
    }

    closeModal() {
        var closeFunc = this.props.closeModal ? this.props.closeModal : null;
        closeFunc && closeFunc();
    }

    render() {
        var bankResult = this.props.bankResult, yysResult = this.props.yysResult;
        var def = '#f2f2f2';
        var color_a = def, color_b = def, color_c = def;
        var img_level = require("assets/credit-icons/icon_level_def.png");
        var loanlist = this.props.loanlist.credit_level_loanlist;
        switch (this.props.creditlevel) {
            case 'A':
                color_c = '#FF7049';
                color_b = '#FED25D';
                color_a = '#66D444';
                img_level = require("assets/credit-icons/icon_level_a.png");
                loanlist = this.props.loanlist.credit_level_loanlist_a;
                break;
            case 'B':
                color_c = '#FF7049';
                color_b = '#FED25D';
                img_level = require("assets/credit-icons/icon_level_b.png");
                loanlist = this.props.loanlist.credit_level_loanlist_b;
                break;
            case 'C':
                color_c = '#FF7049';
                img_level = require("assets/credit-icons/icon_level_c.png");
                loanlist = this.props.loanlist.credit_level_loanlist_c;
                break;
        }
        return this.state.fetching || this.props.isFetching ? <Loading /> : (
            <ScrollView>
                <View>
                    <View style={{backgroundColor: 'white', alignItems: 'center'}}>
                        <Image source={img_level}
                               style={styles.icon_level}/>
                        <Text style={{color: '#666'}}>信用等级</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 40, marginRight: 40}}>
                            <View style={{flex: 1, marginRight: 10}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{
                                        color: this.props.creditlevel == 'C' ? '#666' : def,
                                        marginBottom: 5
                                    }}>C</Text>
                                </View>
                                <View style={{backgroundColor: color_c, height: 10}}/>
                            </View>
                            <View style={{flex: 2, marginRight: 10}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{
                                        color: this.props.creditlevel == 'B' ? '#666' : def,
                                        marginBottom: 5
                                    }}>B</Text>
                                </View>
                                <View style={{backgroundColor: color_b, height: 10}}/>
                            </View>
                            <View style={{flex: 3}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{
                                        color: this.props.creditlevel == 'A' ? '#666' : def,
                                        marginBottom: 5
                                    }}>A</Text>
                                </View>
                                <View style={{backgroundColor: color_a, height: 10}}/>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                            <Image source={require("assets/credit-icons/yanghanzhenxinbaogao.png")}
                                   style={{width: 15, height: 15, marginRight: 2}}/>
                            <Text>您的信息完整度</Text>
                            <Text style={{color: '#333', fontSize: 26}}>{this.props.score + "%"}</Text>
                        </View>
                        <Text style={{marginBottom: 16}}>认证以下材料可提升信用完整度</Text>
                    </View>
                    <View style={{backgroundColor: '#f2f2f2', height: 10}}/>
                    <View style={{backgroundColor: 'white'}}>
                        {this.state.shouXinFlag ? this.renderTiE() : this.renderShouXin()}
                    </View>
                    <View style={{backgroundColor: '#f2f2f2', height: 10}}/>
                    <View style={{flexDirection: 'row', padding: 14, alignItems: 'center'}}>
                        <View style={{width: 3, height: 14, backgroundColor: '#FF5D4B', marginRight: 5}}/>
                        <Text style={{color: '#999'}}>精选{loanlist.length}家放款快，额度高的贷款产品，快去申请吧！</Text>
                    </View>
                    <View style={{backgroundColor: '#f2f2f2', height: 1, flex: 1}}/>
                    <RecommendList recommends={loanlist}/>
                </View>
            </ScrollView>
        );
    }

    toggleSceneShouXin() {
        this.setState({
            shouXinFlag: false
        })
    }

    toggleSceneTiE() {
        this.setState({
            shouXinFlag: true
        })
    }

    _navToPBOC() {
        this.props.pboc && this.props.pboc();
        this.closeModal();
        // return false;
    }

    statusTxt(status) {
        var statusDir = {"success": "已认证", "failure": "认证失败", "none": "去认证"};
        return statusDir[status] || "去认证";
    }

    renderTiE() {
        var bankResult = this.props.bankResult, bankSuccess = bankResult && bankResult.status == "success",
            yysResult = this.props.yysResult, yysSuccess = yysResult && yysResult.status == "success";
        gjjResult = this.props.gjjResult, gjjSuccess = gjjResult && gjjResult.status == "success";
        creditResult = this.props.credit, creditSuccess = creditResult && creditResult.status == "success";
        blacklistResult = this.props.blacklist, blacklistSuccess = blacklistResult && blacklistResult.status == "success";
        user_infoResult = this.props.user_info, user_infoSuccess = user_infoResult && user_infoResult.status == "success";

        return (
            <View>
                {false ? <Item
                    icon={require("assets/credit-icons/shenfenrenzheng.png")}
                    title="身份证"
                    confirm="未授权"
                    tips="认证完毕，可获500-1000额度"/> : null}
                {false ? <Item
                    icon={require("assets/credit-icons/tongxunlushouquan.png")}
                    title="通讯录授权"
                    confirm="未授权"
                    tips="认证完毕，可获500-1000额度"/> : null}
                <Item
                    icon={require("assets/credit-icons/icon_user.png")}
                    title="身份认证"
                    confirm={this.statusTxt(user_infoResult.status)}
                    tips="最高可提高到10万额度"
                    textStyle={user_infoSuccess ? styles.topR : styles.topR2}
                    navProps={{
                        onPress: () => {
                            this.props.externalPush({key: 'UserInfo', title: '身份认证'});
                            this.closeModal();
                        },
                        disabled: user_infoSuccess
                    }}
                    externalTxt={"+" + gjjResult.weight + "%"}/>
                <Item
                    icon={require("assets/credit-icons/icon_blacklist.png")}
                    title="查网贷信用"
                    confirm={this.statusTxt(blacklistResult.status)}
                    tips="最高可提高到10万额度"
                    textStyle={blacklistSuccess ? styles.topR : styles.topR2}
                    navProps={{
                        onPress: () => {
                            if (user_infoSuccess) {
                                this.__navToBlackListClicked__();
                                this.closeModal();
                            } else {
                                alert('请先进行身份认证')
                            }
                        },
                        disabled: blacklistSuccess
                    }}
                    externalTxt={"+" + blacklistResult.weight + "%"}/>
                <Item
                    icon={require("assets/credit-icons/icon_credit.png")}
                    title="查央行征信"
                    confirm={this.statusTxt(creditResult.status)}
                    tips="最高可提高到10万额度"
                    textStyle={creditSuccess ? styles.topR : styles.topR2}
                    navProps={{
                        onPress: () => {
                            if (user_infoSuccess) {
                                this._navToPBOC();
                                this.closeModal();
                            } else {
                                alert('请先进行身份认证')
                            }
                        },
                        tracking: {
                            key: 'credit_loan',
                            topic: 'verification',
                            entity: 'credit_report',
                            event: 'clk',
                            exten_info: creditResult.status
                        },
                        disabled: creditSuccess
                    }}
                    externalTxt={"+" + blacklistResult.weight + "%"}/>
                <Item
                    icon={require("assets/credit-icons/icon_bank.png")}
                    title="查信用卡账单"
                    confirm={this.statusTxt(bankResult.status)}
                    tips="最高可提升到10万额度"
                    textStyle={bankSuccess ? styles.topR : styles.topR2}
                    navProps={{
                        onPress: () => {
                            if (user_infoSuccess) {
                                this.props.externalPush({key: 'OnlineCreditCards', title: '信用卡认证'});
                                this.closeModal();
                            } else {
                                alert('请先进行身份认证')
                            }
                        },
                        tracking: {
                            key: 'credit_loan',
                            topic: 'verification',
                            entity: 'bill',
                            exten_info: bankResult.status
                        },
                        disabled: bankSuccess
                    }}
                    externalTxt={"+" + bankResult.weight + "%"}/>
                <Item
                    icon={require("assets/credit-icons/icon_gjj.png")}
                    title="查公积金"
                    confirm={this.statusTxt(gjjResult.status)}
                    tips="最高可提高到10万额度"
                    textStyle={gjjSuccess ? styles.topR : styles.topR2}
                    navProps={{
                        onPress: () => {
                            if (user_infoSuccess) {
                                this.props.externalPush({key: 'FundLogin', title: '公积金查询'});
                                this.closeModal();
                            } else {
                                alert('请先进行身份认证')
                            }
                        },
                        tracking: {
                            key: 'credit_loan',
                            topic: 'verification',
                            entity: 'PAF',
                            exten_info: gjjResult.status
                        },
                        disabled: gjjSuccess
                    }}
                    externalTxt={"+" + gjjResult.weight + "%"}/>
                {false ? <Item
                    icon={require("assets/credit-icons/shebaobaogao.png")}
                    title="社保报告"
                    confirm="去认证"
                    tips="认证完毕，可获500-1000额度"/> : null}
                <Item
                    icon={require("assets/credit-icons/icon_yys.png")}
                    title="查通话详单"
                    confirm={this.statusTxt(yysResult.status)}
                    tips="认证完毕，可获1000-3000额度"
                    textStyle={yysSuccess ? styles.topR : styles.topR2}
                    navProps={{
                        onPress: () => {
                            if (user_infoSuccess) {
                                this.props.externalPush({key: 'OnlineYysForm', title: '运营商认证'});
                                this.closeModal();
                            } else {
                                alert('请先进行身份认证')
                            }
                        },
                        tracking: {
                            key: 'credit_loan',
                            topic: 'verification',
                            entity: 'telecom',
                            exten_info: yysResult.status
                        },
                        disabled: yysSuccess
                    }}
                    externalTxt={"+" + yysResult.weight + "%"}/>
            </View>
        );
    }

    renderShouXin() {
        var gjjResult = this.props.gjjResult, gjjSuccess = gjjResult && gjjResult.status == "success";
        return (
            <View>
                <Item
                    icon={require("assets/credit-icons/gongjijinbaogao.png")}
                    title="公积金报告"
                    confirm={this.statusTxt(gjjResult.status)}
                    tips="最高可提高到10万额度"
                    textStyle={gjjSuccess ? {color: colors.success} : {color: colors.error}}
                    navProps={{
                        toKey: "FundLogin", title: "公积金查询", prePress: () => {
                            this.closeModal();
                        }
                    }}/>
                <Item
                    icon={require("assets/credit-icons/shebaobaogao.png")}
                    title="社保报告"
                    confirm="去认证"
                    tips="认证完毕，可获500-1000额度"/>
            </View>
        );
    }

    __navToBlackListClicked__() {
        this.props.navToBackList && this.props.navToBackList();
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,.5)',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    title: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    titleL: {
        color: '#333',
        fontSize: 14,
        flex: 1,
        paddingLeft: 10,
    },
    titleR: {
        textAlign: 'right',
        paddingRight: 40,
        fontSize: 14,
        flex: 1,
        color: '#999'
    },
    bdTop: {borderTopWidth: 1, borderTopColor: "#E6E6E6"},
    item: {

        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 10,
        paddingRight: 5
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'

    },
    icon_level: {
        width: 50,
        height: 70,
        marginTop: 20,
        marginBottom: 10,
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        paddingRight: 10
    },
    top: {
        flexDirection: 'row'
    },
    topL: {
        flex: 1,
        paddingLeft: 20,
        color: '#333',
        fontSize: 16,
        justifyContent: "center"
    },
    topR: {
        width: 65,
        color: '#FE271E',
        fontSize: 14,
        // flex : 1,
        textAlign: 'center',
        borderColor: '#FF5D4B',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 10
    },
    topR2: {
        width: 65,
        color: '#fff',
        backgroundColor: '#FF5D4B',
        fontSize: 14,
        // flex : 1,
        textAlign: 'center',
        borderRadius: 20,
        marginRight: 10
    }
})

function mapStateToProps(state) {
    let detail = state.online.userCreditDetail;

    return {
        isFetching: state.online.userCreditDetail.isFetching || state.online.userCreditLevel.isFetching || state.online.userCreditConfig.isFetching,
        creditlevel: state.online.userCreditLevel.credit_level,
        bankResult: detail.bank_wap,
        yysResult: detail.yys,
        gjjResult: detail.gjj,
        credit: detail.credit,
        blacklist: detail.black_list,
        user_info: detail.user_info,
        score: detail.score,
        loanlist: state.online.userCreditConfig,
        userInfo: state.online.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitPreloan: () => dispatch(actions.preloan()),
        fetching: () => {
            dispatch(actions.userCreditDetail());
            dispatch(actions.userCreditLevel());
            dispatch(actions.userCreditConfig());
            // dispatch(actions.bankBillList());
            // dispatch(actions.yysBillList());
            // dispatch(actions.gjjResult());
            // dispatch(actions.pboc.getStatus());
        },
        externalPush: (route) => dispatch(externalPush(route)),
        pboc: params => dispatch(pboc(params)),
        navToBackList: () => dispatch(navToBlackList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    CertifPanel
);
