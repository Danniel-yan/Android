import React, { Component } from 'react';

import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

import Button from 'components/shared/ButtonBase';
import Checkbox from 'components/shared/Checkbox';
import L2RItem from './L2RItem';
import NextIcon from 'components/shared/NextIcon';
import { post, responseStatus } from 'utils/fetch';
import { ExternalPushLink } from 'containers/shared/Link';
import { flexRow, container, colors, fontSize, border } from 'styles'
import { l2rStyles } from './styles';
import alert from 'utils/alert';


import SubmitButton from './SubmitButton';

class LoanSign extends Component {
    state = {
        card: '',
        checkedAgreement: true,
        resultData: this.props.resultdata
    }

    // 创建合同获取借款手续费和到手金额
    componentWillMount() {

        let loan_type = this.props.loanType
        let amount = this.props.tempAmount

        if (amount && (parseInt(amount) != parseInt(this.state.resultData.approve_amount))) {
            post('/loanctcf/contract-trail', {loan_type, amount})
                .then(res => {
                    //console.log('LoanSign  post请求发送了------------->')
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
        let loan = this.state.resultData;
        console.log("loans")
        console.log(loan)
        let service = loan.repayPlanResults[0];
        let plan = loan.repayPlanResults.slice(1);

        return (
            <ScrollView>
                <View style={styles.content}>
                    <L2RItem left="姓名" right={userInfo.person_name}/>
                    <L2RItem left="身份证号" right={userInfo.id_no}/>

                    <L2RItem style={styles.amount} left="合同金额" right={loan.contractAmount }>
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

                    <ExternalPushLink
                        toKey="OnlineReceiptCard"
                        title="添加银行卡"
                        componentProps={{ onSuccess: value => this.setState({ card: value }) }}
                    >
                        <L2RItem left="收款银行卡" right={this.state.card}>
                            <NextIcon/>
                        </L2RItem>
                    </ExternalPushLink>
                </View>

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
                            textStyle={[styles.checkboxTxt, { color: colors.secondary }]}
                        />
                        <Text style={styles.checkboxTxt}>相关条款</Text>
                    </Button>
                </View>

                {
                    this.state.error && (<Text style={styles.error}>{this.state.error}</Text>)
                }

                <SubmitButton
                    processing={this.state.submitting}
                    disabled={!(this.state.card && this.state.checkedAgreement)}
                    prePress={this._submit.bind(this)}
                    toKey="OnlineSignSuccess"
                    componentProps={{loan_type: this.props.loanType}}
                    backRoute={{key: 'LoanDetailScene'}}
                    title="签约"
                    text="提交"/>
            </ScrollView>
        );
    }

    _submit() {
        this.setState({submitting: true})

        return post('/loanctcf/create-contract', {
            loan_type: parseInt(this.props.loanType) || 0,
            amount: this.state.resultData.approve_amount
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
        fontSize: fontSize.small,
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


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
    let userInfo = state.online.userInfo;
    let applyResult = state.online.applyResult;

    //console.log("applyResult")
    //console.log(applyResult)

    return Object.assign({}, {
        ...state.online.applyResult,
        userInfo: userInfo.data,
        loanType: state.online.loanType.type
    }, {
        isFetching: userInfo.isFetching || applyResult.isFetching,
        fetched: userInfo.fetched && applyResult.fetched
    });
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStatus: () => dispatch(actions.status()),
        fetching: () => {
            dispatch(actions.applyResult())
            dispatch(actions.userInfo())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    AsynCpGenerator(Loading, trackingScene(LoanSign), true));
