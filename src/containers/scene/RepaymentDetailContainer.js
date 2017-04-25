/**
 * Created by yshr on 17/3/13.
 */
import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage} from 'react-native';
import Button from 'components/shared/ButtonBase';
import {connect} from 'react-redux';
import * as defaultStyles from 'styles';
import repaymentStyle from './repayment/repaymentStyle';
import {ExternalPushLink} from 'containers/shared/Link';
import PopView from './repayment/repaymentVerifyCode';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import {post, responseStatus} from 'utils/fetch';
import {alert} from 'utils/alert';
import {loanType} from 'constants';
import {externalPush} from 'actions/navigation';
import ProcessingButton from 'components/shared/ProcessingButton';
import validators from 'utils/validators';
import actions from 'actions/online';

class RepaymentDetailContainer extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        let bankInfo = this.props.bankInfo
        if (this.props.depositoryResult.status == 1){
            bankInfo = this.props.depositoryResult
        }
        this.state = {
            mobile: bankInfo.mobile,
            idnum: bankInfo.id_no,
            logo: bankInfo.logo.px80,
            realname: bankInfo.realname,
            bank_card_no: bankInfo.bank_card_no,
            bank_name: bankInfo.bank_name,
            loan_type: this.props.loanType,
            repayAmount: this.props.repayAmount,
            submitting: false,
            amount_int: this.props.repayAmount.amount,
            amount_max: this.props.repayAmount.amount // 临时最大值 保持不变用于判断
        };

    }

    _payctcFloanCreate = (callback) => {
        let mobile = this.state.mobile
        let realname = this.state.realname
        let idnum = this.state.idnum
        let cardnum = this.state.bank_card_no
        let loan_type = this.state.loan_type
        let amount = this.state.repayAmount.amount
        if (this.submitting) {
            return;
        }

        this.submitting = true;
        this.setState({
            submitting: true
        })

        this.props.recharge(amount).then(response => {
            this.setState({submitting: false});
        })
        // post('/payctcfcg/quick-recharge', {loan_type, amount})
        //     .then(res => {
        //
        //         if (res.res == responseStatus.failure) {
        //             console.log('创建支付请求失败')
        //             alert(res.msg)
        //             return
        //         } else {
        //             AsyncStorage.setItem('ticket_id', res.data.ticket_id)
        //             this.refs.confirm.open();
        //         }
        //     })
        //     .catch(()=>console.log)
        //     .finally(()=> {
        //         this.submitting = false;
        //         this.setState({submitting: false})
        //     })
        // post('/payctcfloan/create', {mobile, realname, idnum, cardnum, loan_type, repay_amount})
        //     .then(res => {
        //
        //         if (res.res == responseStatus.failure) {
        //             console.log('创建支付请求失败')
        //             alert(res.msg)
        //             return
        //         } else {
        //             AsyncStorage.setItem('ticket_id', res.data.ticket_id)
        //             this.refs.confirm.open();
        //         }
        //     })
        //     .catch(()=>console.log)
        //     .finally(()=> {
        //         this.submitting = false;
        //         this.setState({submitting: false})
        //     })

        //callback();

    }

    confirmAction(value) {
        console.log("确定" + value)
    }

    hintAction() {
        console.log("发送验证码")

    }

    render() {
        return (
            <View style={[defaultStyles.container, defaultStyles.bg, repaymentStyle.wrap_content]}>
                <PopView ref='confirm' confirmAction={this.confirmAction} hintAction={this.hintAction} mobile='123455'
                         externalPush={() => this.props.externalPush({
                             key: 'RepaymentResult',
                             title: '还款结果',
                             backRoute: {key: 'OnlineLoanDetail'}
                         })}></PopView>
                <View>
                    <View style={repaymentStyle.item}>
                        <Text style={repaymentStyle.textColor}>还款金额(元)</Text>

                        {this.showTextInput(this.state.amount_int)}

                    </View>
                    <View style={repaymentStyle.item}>
                        <Image
                            style={repaymentStyle.icon_bank}
                            source={{uri: this.state.logo}}/>
                        <Text
                            style={repaymentStyle.textColor}>{this.state.bank_name + "(****" + this.state.bank_card_no.slice(-4) + ")" }</Text>
                    </View>
                    <View style={repaymentStyle.item}>
                        <Text style={repaymentStyle.textColor}>银行预留手机号</Text>
                        <Text style={repaymentStyle.textColor}>{this.state.mobile}</Text>
                    </View>

                    <View style={repaymentStyle.text_bottom_view}>
                        <View style={repaymentStyle.text_bottom_item}>
                            <Image style={repaymentStyle.text_bottom_icon}
                                   source={require('assets/icons/repayment_bottom_text.png')}
                            />
                            <Text>{this.state.repayAmount.tips[0]}</Text>
                        </View>
                        <View style={repaymentStyle.text_bottom_item}>
                            <Image style={repaymentStyle.text_bottom_icon}
                                   source={require('assets/icons/repayment_bottom_text.png')}
                            />
                            <Text>{this.state.repayAmount.tips[1]}</Text>
                        </View>
                        <View style={repaymentStyle.text_bottom_item}>
                            <Image style={repaymentStyle.text_bottom_icon}
                                   source={require('assets/icons/repayment_bottom_text.png')}
                            />
                            <Text>{this.state.repayAmount.tips[2]}</Text>
                        </View>

                    </View>
                </View>
                <View>
                    <ProcessingButton
                        processing={this.state.submitting} onPress={() => this._payctcFloanCreate()}
                        text="确认还款"
                        type="line"
                        textStyle={repaymentStyle.btnText}
                        disabled={this.state.amount_int <= 0}
                        style={[this.state.amount_int > 0 ? repaymentStyle.btn : repaymentStyle.btn_dis, defaultStyles.centering]}/>
                </View>
            </View>

        );
    }

    showTextInput(amount_int) {
        //let amount = amount_int.toString();
        let formaterAdjust = validators.adjustNumFormater(this.state.amount_max);
        //amount_int = 3000
        if (amount_int >= 500) {
            return (
                <TextInput
                    style={[repaymentStyle.textinput, repaymentStyle.textColor]}
                    underlineColorAndroid="transparent"
                    onChangeText={(amount_int)=> {
                        this.setState({amount_int: formaterAdjust(amount_int)})
                    }}
                    value={amount_int.toString()}
                />
            )
        } else {
            return (
                <Text
                    style={[repaymentStyle.textinput, repaymentStyle.textColor]}> {amount_int}</Text>
            )
        }
    }


}

function mapStateToProps(state) {
    return {
        bankInfo: state.online.bankInfo,
        depositoryResult: state.online.depositoryResult,
        repayAmount: state.online.repayAmount,
        loanType: state.online.loanType.type
    }
}

function mapDispatchToProps(dispatch) {
    return {
        recharge: amount => dispatch(actions.repayRecharge(amount)),
        externalPush: route => dispatch(externalPush(route))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RepaymentDetailContainer)
