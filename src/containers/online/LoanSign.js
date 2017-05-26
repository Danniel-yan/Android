import React, {Component} from 'react';

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Button from 'components/shared/ButtonBase';
import Checkbox from 'components/shared/Checkbox';
import L2RItem from './L2RItem';
import NextIcon from 'components/shared/NextIcon';
import alert from 'utils/alert';
import {post, responseStatus} from 'utils/fetch';
import {ExternalPushLink} from 'containers/shared/Link';
import {flexRow, container, colors, fontSize, border} from 'styles'
import {l2rStyles} from './styles';
import ChangeCardDialog from 'utils/changeCardDialog.js';
import {externalPush} from 'actions/navigation';
import SubmitButton from './SubmitButton';

class LoanSign extends Component {
    state = {
        card: '',
        checkedAgreement: true,
        cg_amount: '',
        resultData: this.props.resultdata
    }

    // 创建合同获取借款手续费和到手金额
    componentWillMount() {

        let loan_type = this.props.loanType
        let amount = this.props.tempAmount

        if (amount && (parseInt(amount) != parseInt(this.state.resultData.approve_amount))) {
            post('/loanctcf/contract-trail', {loan_type, amount})
                .then(res => {
                    if (res.res == responseStatus.failure) {
                        //this.refs.btn.reset();
                        alert(res.msg)
                    } else {
                        //console.log('LoanSign  requestdata success---------->' + res)
                        console.log(res)
                        this.setState({
                            resultData: res.data
                        })

                    }
                })
                .catch(console.log)

        }

    }

    render() {
        let userInfo = this.props.userInfo;
        let loan = this.props.resultdata;
        let service = loan.repayPlanResults[0];
        let plan = loan.repayPlanResults.slice(1);
        let depositoryResult = this.props.depositoryResult;
        this.state.cg_amount = loan.approve_amount;

        return (
            <ScrollView>
                <View style={styles.content}>
                    <L2RItem left="姓名" right={userInfo.person_name}/>
                    <L2RItem left="身份证号" right={userInfo.id_no}/>

                    <L2RItem style={styles.amount} left="合同金额" right={loan.contractAmount}>
                        <Text style={styles.amountTip}>
                            本次借款手续费为{service.repayAmount}元，到手金额为{(loan.contractAmount - service.repayAmount).toFixed(2)}元
                        </Text>
                    </L2RItem>

                    <L2RItem left="借款期限" right={loan.sug_term}/>
                    <L2RItem left="月服务费率" right={`${loan.month_fee}%`}/>

                    <ExternalPushLink
                        toKey="OnlineTrialRefundPlan"
                        title="还款计划"
                        componentProps={{plans: plan}}
                    >
                        <L2RItem left="还款计划" right="">
                            <NextIcon/>
                        </L2RItem>
                    </ExternalPushLink>

                    <TouchableOpacity onPress={this.bindCard.bind(this)}>
                        <L2RItem left="收款银行卡"
                                 right={depositoryResult.status == 1 ? depositoryResult.content.bank_name + "(****" + depositoryResult.content.bank_card_no.slice(-4) + ")" : ''}>
                            <NextIcon/>
                        </L2RItem>
                    </TouchableOpacity>
                </View>

                <ChangeCardDialog ref='carddialog' modalVisible={false}></ChangeCardDialog>

                <View style={styles.textRow}>
                    <Button
                        style={styles.agreement}
                        onPress={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}>
                        <Checkbox
                            onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}
                            checked={this.state.checkedAgreement}
                            style={{marginRight: 5}}
                        />
                        <Text style={styles.checkboxTxt}>我已阅读并同意</Text>
                        <ExternalPushLink
                            web="https://sys-python.oss-cn-shanghai.aliyuncs.com/pt_ctcf_loan_contract/contrace_template.html"
                            text="《借款咨询服务协议》"
                            title="借款咨询服务协议"
                            textStyle={[styles.checkboxTxt, {color: colors.secondary}]}
                        />
                        <Text style={styles.checkboxTxt}>相关条款</Text>
                    </Button>
                </View>

                {
                    this.state.error && (<Text style={styles.error}>{this.state.error}</Text>)
                }

                <SubmitButton
                    processing={this.state.submitting}
                    disabled={!(depositoryResult.status == 1 && this.state.checkedAgreement)}
                    prePress={this._submit.bind(this)}
                    toKey="OnlineSignSuccess"
                    componentProps={{loan_type: this.props.loanType}}
                    backRoute={{key: (this.props.loanType == 1 || this.props.loanType == 2) ? "SuiXinJieList" : "LoanDetailScene"}}
                    title="签约"
                    text="提交"/>
            </ScrollView>
        );
    }

    bindCard() {
        if (this.props.depositoryResult.status == 1) {
            this.refs.carddialog._setModalVisible(true)
        } else {
            this.props.externalPush({
                key: "OnlineReceiptCard",
                title: "添加银行卡"
            })
        }
    }

    _submit() {
        this.setState({submitting: true})


        //return post('/loanctcf/create-contract', {loan_type: parseInt(this.props.loanType) || 0}).then(response => {
        return post('/loanctcf/create-contract-cg', {
            loan_type: parseInt(this.props.loanType) || 0,
            amount: this.state.cg_amount
        }).then(response => {

            // if(response.res == responseStatus.failure) {
            //   throw response.msg
            // }
            this.props.fetchStatus();
            return true;
            // }).catch(err => {
            //   this.setState({ submitting: false, error: err });
            //   throw err;
        })
    }
}

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: fontSize.normal,
        color: colors.error
    },
    agreement: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxTxt: {
        color: colors.grayLight,
        fontSize: fontSize.xsmall,
    },
    textRow: {
        padding: 10,
    },
    amount: {
        height: 80,
        paddingBottom: 30,
    },
    amountTip: {
        position: 'absolute',
        top: 40,
        left: 10,
        right: 10,
        color: colors.grayLight,
        fontSize: fontSize.normal
    },
});


import {connect} from 'react-redux';
import {trackingScene} from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
    let userInfo = state.online.userInfo;
    let applyResult = state.online.applyResult;
    let depositoryResult = state.online.depositoryResult;

    return Object.assign({}, {
        ...state.online.applyResult,
        userInfo: userInfo.data,
        depositoryResult: state.online.depositoryResult,
        loanType: state.online.loanType.type
    }, {
        isFetching: userInfo.isFetching || applyResult.isFetching || depositoryResult.isFetching,
        fetched: userInfo.fetched && applyResult.fetched && depositoryResult.fetched
    });

    return;
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStatus: () => dispatch(actions.status()),
        fetching: () => {
            // dispatch(actions.applyResult())
            dispatch(actions.userInfo())
            dispatch(actions.depositoryResult())
        },
        externalPush: route => dispatch(externalPush(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    AsynCpGenerator(Loading, trackingScene(LoanSign), true));
