import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import {
    AppRegistry,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import { container, fontSize, colors } from 'styles';
var loan_adjust_downdisable = require('assets/icons/loan_adjust_downdisable.png')
var loan_adjust_down = require('assets/icons/loan_adjust_down@2x.png')
var loan_adjust_up = require('assets/icons/loan_adjust_up.png')
var loan_adjust_updisable = require('assets/icons/loan_adjust_updisable@2x.png')

export class LoanAdjustRText extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            left: "借款金额：",
            approve_amount: parseInt(this.props.approve_amount), // 申请时提交的金额
            contractAmount: parseInt(this.props.contractAmount), // 审批通过后通过的最高额度
            initMinAmount: parseInt(this.props.approve_amount),
            initMaxAmount: parseInt(this.props.contractAmount),
            loan_adjust_down: loan_adjust_down,
            loan_adjust_downdisable: loan_adjust_downdisable,
            loan_adjust_up: loan_adjust_up,
            loan_adjust_updisable: loan_adjust_updisable,

        };
    }

    componentWillMount() {
        this.props.adjustApproveAmount(this.state.contractAmount)
    }

    render() {

        return (
            <View style={[styles.item1]}>
                <Text style={[container, styles.left]}>{this.state.left}</Text>
                <View style={styles.adjustAmount}>
                    <TouchableOpacity
                        onPress={()=>loanAdjustDown.call(this, this.state.approve_amount,this.state.contractAmount)}>
                        <Image style={styles.image}
                               source={(this.state.contractAmount == this.state.initMinAmount)?this.state.loan_adjust_downdisable:this.state.loan_adjust_down}/>
                    </TouchableOpacity>
                    <Text style={[styles.right]}>{this.state.contractAmount}</Text>
                    <TouchableOpacity
                        onPress={()=>loanAdjustUp.call(this, this.state.contractAmount)}>
                        <Image style={styles.image}
                               source={(this.state.contractAmount == this.state.initMaxAmount)?this.state.loan_adjust_updisable:this.state.loan_adjust_up}/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

}

function loanAdjustUp(contractAmount) {

    if (contractAmount == this.state.initMaxAmount) {
        this.setState(() => {
            this.props.adjustApproveAmount(this.state.contractAmount)
        })
        return
    } else if (contractAmount < this.state.initMaxAmount) {
        this.setState({
            contractAmount: parseInt(contractAmount) + 1000,
        }, () => {
            this.props.adjustApproveAmount(this.state.contractAmount)
        })

        return
    }
}
function loanAdjustDown(approve_amount, contractAmount) {
    if (contractAmount == this.state.initMinAmount) {
        this.setState(), () => {
            this.props.adjustApproveAmount(this.state.contractAmount)
        }
        return
    } else if (this.state.initMinAmount < contractAmount) {
        if (contractAmount - this.state.initMinAmount < 1000) {
            this.setState(() => {
                this.props.adjustApproveAmount(this.state.contractAmount)
            })
            return
        } else {
            this.setState({
                contractAmount: parseInt(contractAmount) - 1000,
            }, () => {
                this.props.adjustApproveAmount(this.state.contractAmount)
            })
            return
        }

    }

}

const styles = StyleSheet.create({
    item1: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: '#fff'
    },
    left: {
        fontSize: fontSize.large,
        color: '#4A4A4A'
    },
    right: {
        fontSize: 35,
        color: colors.grayDark,
        paddingLeft: 15,
        paddingRight: 15,
    },
    adjustAmount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35

    },
    image: {
        width: 20,
        height: 20
    },
})

function mapDispatchToProps(dispatch) {
    return {
        //repaymentAmount: (amount, tips) => dispatch(receiveRepaymentAmount(amount, tips)),
        adjustApproveAmount: (contractAmount) => dispatch({
            type: 'receiveOnlineAdjustApproveAmount',
            tempAmount: contractAmount
        }),
        //externalPush: route => dispatch(externalPush(route))
    }
}

export default connect(null, mapDispatchToProps)(LoanAdjustRText)
