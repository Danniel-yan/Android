/**
 * Created by yshr on 17/3/13.
 */
import React, { Component} from 'react';
import { View, Text, Image,TextInput,AsyncStorage} from 'react-native';
import Button from 'components/shared/ButtonBase';
import { connect } from 'react-redux';
import * as defaultStyles from 'styles';
import repaymentStyle from './repayment/repaymentStyle';
import { ExternalPushLink } from 'containers/shared/Link';
import PopView from './repayment/repaymentVerifyCode';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import { post, responseStatus } from 'utils/fetch';
import { alert } from 'utils/alert';
import { loanType } from 'constants';
import { externalPush } from 'actions/navigation';
import ProcessingButton from 'components/shared/ProcessingButton'
class RepaymentDetailContainer extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mobile: this.props.bankInfo.mobile,
            idnum: this.props.bankInfo.id_no,
            logo: this.props.bankInfo.logo.px80,
            realname: this.props.bankInfo.name,
            bank_card_no: this.props.bankInfo.bank_card_no,
            bank_name: this.props.bankInfo.bank_name,
            loan_type: this.props.loanType,
            repayAmount: this.props.repayAmount,
            submitting: false
        };
    }

    _payctcFloanCreate = (callback) => {
        let mobile = this.state.mobile
        let realname = this.state.realname
        let idnum = this.state.idnum
        let cardnum = this.state.bank_card_no
        let loan_type = this.state.loan_type
        let repay_amount = this.state.repayAmount.amount
        if (this.submitting) {
            return;
        }

        this.submitting = true;
        this.setState({
            submitting: true
        })

        post('/payctcfloan/create', {mobile, realname, idnum, cardnum, loan_type, repay_amount})
            .then(res => {

                if (res.res == responseStatus.failure) {
                    console.log('创建支付请求失败')
                    alert(res.msg)
                    return
                } else {
                    AsyncStorage.setItem('ticket_id', res.data.ticket_id)
                    this.refs.confirm.open();
                }
            })
            .catch(()=>console.log)
            .finally(()=> {
                this.submitting = false;
                this.setState({submitting: false})
            })

        //callback();

    }

    confirmAction(value) {
        console.log("确定" + value)
    }

    hintAction() {
        console.log("发送验证码")

    }

    render() {
        let amount_int = this.state.repayAmount.amount;
        return (
            <View style={[defaultStyles.container, defaultStyles.bg,repaymentStyle.wrap_content]}>
                <PopView ref='confirm' confirmAction={this.confirmAction} hintAction={this.hintAction} mobile='123455'
                         externalPush={() => this.props.externalPush({key: 'RepaymentResult', title: '还款结果',backRoute:{key:'OnlineLoanDetail'}})}></PopView>
                <View>
                    <View style={repaymentStyle.item}>
                        <Text style={repaymentStyle.textColor}>还款金额(元)</Text>

                        {this.showTextInput(amount_int)}

                    </View>
                    <View style={repaymentStyle.item}>
                        <Image
                            style={repaymentStyle.icon_bank}
                            source={{uri:this.state.logo}}/>
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
                        disabled={amount_int <= 0}
                        style={[amount_int > 0 ? repaymentStyle.btn : repaymentStyle.btn_dis, defaultStyles.centering]}/>
                </View>
            </View>

        );
    }

    showTextInput(amount_int) {
        let amount = amount_int.toString();
        if (amount_int > 500) {
            return (
                <TextInput
                    style={[repaymentStyle.textinput,repaymentStyle.textColor]}
                    underlineColorAndroid="transparent"
                    onChangeText={(repay_amount) => this.setState({repay_amount})}
                    value={amount}
                />
            )
        } else {
            return (
                <Text
                    style={[repaymentStyle.textinput,repaymentStyle.textColor]}> {amount}</Text>
            )
        }
    }


}

function mapStateToProps(state) {
    return {
        isFetching: state.online.loanDetail.isFetching || state.online.bankInfo.isFetching,
        bankInfo: state.online.bankInfo,
        repayAmount: state.online.repayAmount,
        loanType: state.online.loanType.type,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //fetching: () => {
        //    dispatch(actions.loanDetail()),
        //        dispatch(actions.bankInfo())
        //},
        externalPush: route => dispatch(externalPush(route))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RepaymentDetailContainer)