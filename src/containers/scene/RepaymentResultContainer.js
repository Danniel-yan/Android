/**
 * Created by yshr on 17/3/14.
 */
import React, { Component} from 'react';
import { View, Text, Image, StyleSheet,AsyncStorage} from 'react-native';
import Button from 'components/shared/ButtonBase';
import repaymentStyle from './repayment/repaymentStyle';
import { connect } from 'react-redux';
import * as defaultStyles from 'styles';
import { ExternalPushLink } from 'containers/shared/Link';
import { externalPush } from 'actions/navigation';
import { post, responseStatus } from 'utils/fetch';
import { receiveRepaymentAmount } from 'actions/online/repayAmount';

var repaymenting_loading = require('assets/icons/repaymenting_loading.gif')
var repayment_exception = require('assets/icons/repayment_exception.png')
var repayment_success = require('assets/icons/repayment_success.png')
var repayment_failed = require('assets/icons/repayment_failed.png')

class RepaymentResultContainer extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            ticket_id: '',
            shoud_repayamout: '',
            repayamout_done: '',
            rest_repayamout: '',
            requestPeriod: 5000,
            result_view: false,
            is_show_repayamount: false,
            showSubmitView: false,
            is_show_repayamountfailed: false,
            status_text: '还款中...',
            status_icon: repaymenting_loading,
            submit_text: ''
        };
    }

    componentWillMount() {
        console.log('还款结果界面componentWillMount进来了11')
        AsyncStorage.getItem('ticket_id').then(ticket_id => {
            console.log('还款结果界面componentWillMount进来了2222')
            console.log(ticket_id)
            let index = 0
            this.timer = setInterval(
                () => {
                    index++
                    console.log('index')
                    console.log(index)
                    console.log(this.state.requestPeriod)
                    post('/payorder/check-status', {ticket_id})
                        .then(res => {
                            if (res.res == responseStatus.failure) {
                                console.log('状态请求失败')
                                alert(res.msg)
                                //return
                            } else {
                                console.log('状态请求成功')
                                console.log(res)
                                console.log(res.data.status)
                                console.log(res.data.repay_result)
                                switch (res.data.status) {
                                    case 1:
                                        console.log('支付中,等待一分钟后跳转异常显示界面')
                                        this.setState({
                                            status_icon: repaymenting_loading,
                                            status_text: '还款中...'
                                        })

                                        if (index == 60000 / this.state.requestPeriod) {
                                            this.setState({
                                                showSubmitView: true,
                                                status_icon: repayment_exception,
                                                status_text: '还款结果已提交银行对账中，\n请稍后再来查看',
                                                submit_text: '确定'
                                            });
                                            this.timer && clearTimeout(this.timer);
                                        }
                                        break;
                                    case 2:
                                        console.log('支付成功')
                                        switch (res.data.repay_result) {
                                            case 2:
                                                console.log('支付中,等待一分钟后跳转异常显示界面')
                                                this.setState({
                                                    status_icon: repaymenting_loading,
                                                    status_text: '还款中...'
                                                })
                                                if (index == 60000 / this.state.requestPeriod) {
                                                    this.setState({
                                                        showSubmitView: true,
                                                        status_icon: repayment_exception,
                                                        status_text: '还款结果已提交银行对账中，\n请稍后再来查看',
                                                        submit_text: '确定'
                                                    });
                                                    this.timer && clearTimeout(this.timer);
                                                }
                                                break;
                                            case 4:
                                                console.log('支付成功,还款成功,跳转还款成功显示界面')
                                                this.setState({
                                                    is_show_repayamount: true,
                                                    showSubmitView: true,
                                                    shoud_repayamout: res.data.repay_info.total_amount,
                                                    repayamout_done: res.data.repay_info.repay_amount,
                                                    rest_repayamout: res.data.repay_info.curr_amount,
                                                    status_icon: repayment_success,
                                                    status_text: '还款成功!',
                                                    submit_text: '继续还款'
                                                });

                                                this.timer && clearTimeout(this.timer);
                                                if (this.state.is_show_repayamount) {
                                                  this.props.repaymentAmount(this.state.rest_repayamout)
                                                }
                                                break;
                                            case 5:
                                                console.log('支付成功,还款失败跳转异常显示界面')
                                                this.setState({
                                                    showSubmitView: true,
                                                    status_icon: repayment_exception,
                                                    status_text: '还款结果已提交银行对账中，请稍后再来查看',
                                                    submit_text: '确定'
                                                });
                                                break;
                                        }
                                        break;
                                    case 3:
                                        console.log('支付失败还款失败,显示还款失败界面')
                                        this.setState({
                                            showSubmitView: true,
                                            is_show_repayamountfailed:true,
                                            status_icon: repayment_failed,
                                            status_text: '还款失败!',
                                            submit_text: '重新还款'
                                        })
                                        break;
                                }
                            }
                        })
                        .catch(console.log)
                },
                this.state.requestPeriod
            );
        })

    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    _continue_repay:{

        }

    render() {
        console.log("render方法绘制了")
        return (
            <View style={[defaultStyles.container, defaultStyles.bg,styles.wrap_content]}>
                <View>
                    <View style={styles.top}>
                        <Image style={styles.top_icon} source={this.state.status_icon}/>
                        <Text style={styles.top_text}>{this.state.status_text}</Text>
                    </View>
                    {this._showRepaymentInfo()}
                    {this._againRepaymentinfo()}

                </View>
                <View>
                    {this._submitView()}
                </View>
                <View style={styles.bottom}>
                    <Text style={{fontSize: 14}}>如果有疑问请拨打客服热线：4009 160160</Text>
                </View>
            </View>

        );
    }

    _submitView() {
        console.log('this.state.showSubmitView')
        console.log(this.state.showSubmitView)
        return (this.state.showSubmitView == true ?
                <Button onPress={() => this._continue_repay()}
                        text={this.state.submit_text}
                        type="line"
                        textStyle={repaymentStyle.btnText}
                        style={[repaymentStyle.btn, defaultStyles.centering]}/> : (null)

        )
    }

    _showRepaymentInfo() {
        console.log('this.state._showRepaymentInfo')
        console.log(this.state._showRepaymentInfo)
        return (
            this.state.is_show_repayamount == true ? <View style={{marginTop:5}}>
                <View style={styles.item}>
                    <Text style={styles.textColor}>本期应还金额(元)：</Text>
                    <Text style={styles.textColor}>{this.state.shoud_repayamout}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.textColor}>已还金额(元)：</Text>
                    <Text style={styles.textColor}>{this.state.repayamout_done}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.textColor}>本期剩余应还金额(元)：</Text>
                    <Text style={styles.textColor}>{this.state.rest_repayamout}</Text>
                </View>
            </View> : (null)
        )

    }

    _againRepaymentinfo() {
        return (
            this.state.is_show_repayamountfailed == true ? <View style={{marginTop:5}}>
                <View style={styles.item_failed}>
                    <Text style={styles.textColor}>请确认还款银行卡中有足够的金额！</Text>
                </View>
            </View> : (null)
        )
    }

}
const styles = StyleSheet.create({
    wrap_content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    item: {
        //flex: 1,
        flexDirection: 'row',
        height: 43,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    item_failed: {
        //flex: 1,
        flexDirection: 'row',
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    text_item_content: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textColor: {
        fontSize: 16,
        color: '#333333',
        paddingLeft: 10,
        paddingRight: 10,
    },
    top: {
        height: 200,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    top_icon: {
        width: 70,
        height: 70,
    },
    top_text: {
        paddingTop: 20,
        color: '#333333',
        fontSize: 18
    },
    bottom: {
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,

    }
});

function mapDispatchToProps(dispatch) {
    return {
        repaymentAmount: amount => dispatch(receiveRepaymentAmount(amount))
    }
}

export default connect(null,mapDispatchToProps)(RepaymentResultContainer)
