import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
//import { receiveRepaymentAmount } from 'actions/online/repayAmount';
import { receiveAdjustApproveAmount } from 'actions/online/adjustApproveAmount';
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
            initAmount: parseInt(this.props.approve_amount), // 临时变量申请时提交的金额
            loan_adjust_downdisable: loan_adjust_downdisable,
            //loan_adjust_down: loan_adjust_down,
            loan_adjust_up: loan_adjust_up,
            //loan_adjust_updisable: loan_adjust_updisable,
        };
    }

    componentWillMount() {
        this.props.adjustApproveAmount(this.state.approve_amount)
    }

    render() {
        return (
            <View style={[styles.item1]}>
                <Text style={[container, styles.left]}>{this.state.left}</Text>
                <View style={styles.adjustAmount}>
                    <TouchableOpacity
                        onPress={()=>loanAdjustDown.call(this, this.state.approve_amount,this.state.contractAmount)}>
                        <Image style={styles.image} source={this.state.loan_adjust_downdisable}/>
                    </TouchableOpacity>
                    <Text style={[styles.right]}>{this.state.approve_amount}</Text>
                    <TouchableOpacity
                        onPress={()=>loanAdjustUp.call(this, this.state.approve_amount,this.state.contractAmount)}>
                        <Image style={styles.image} source={this.state.loan_adjust_up}/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    receiveAdjustDownApproveAmount() {
        this.props.adjustApproveAmount(this.state.approve_amount)
    }


}


//export default function LoanRText({style, left, right, leftStyle, rightStyle, ...props}) {
//
//    return (
//        <View style={[styles.item1, style]}>
//            <Text style={[container, styles.left, leftStyle]}>{left}</Text>
//            <View style={styles.adjustAmount}>
//                <TouchableOpacity onPress={()=>loanAdjustDown()}>
//                    <Image style={styles.image} source={require('assets/icons/loan_adjust_down@2x.png')}/>
//                </TouchableOpacity>
//                <Text style={[styles.right, rightStyle]}>{right}</Text>
//                <TouchableOpacity onPress={()=>loanAdjustUp()}>
//                    <Image style={styles.image} source={require('assets/icons/loan_adjust_up@2x.png')}/>
//                </TouchableOpacity>
//            </View>
//
//            {props.children}
//        </View>
//    );
//}

function loanAdjustDown(approve_amount, contractAmount) {
    if (approve_amount == this.state.initAmount) {
        this.setState({
            loan_adjust_downdisable: loan_adjust_downdisable,
            loan_adjust_up: loan_adjust_up,
        }, () => {
            this.props.adjustApproveAmount(this.state.approve_amount)
        })
        return
    } else if (approve_amount < contractAmount) {
        this.setState({
            loan_adjust_downdisable: loan_adjust_down,
            loan_adjust_up: loan_adjust_up,
            approve_amount: parseInt(approve_amount) - 1000,
        }, () => {
            this.props.adjustApproveAmount(this.state.approve_amount)
        })
        return
    }
}
function loanAdjustUp(approve_amount, contractAmount) {
    if (approve_amount == contractAmount) {
        this.setState({
            loan_adjust_up: loan_adjust_updisable,
            loan_adjust_downdisable: loan_adjust_down
        }), () => {
            this.props.adjustApproveAmount(this.state.approve_amount)
        }
        return
    } else if (approve_amount < contractAmount) {
        console.log(contractAmount)
        console.log(approve_amount)
        if (contractAmount - this.state.approve_amount < 1000) {
            this.setState({
                loan_adjust_up: loan_adjust_updisable,
                loan_adjust_downdisable: loan_adjust_down
            }, () => {
                this.props.adjustApproveAmount(this.state.approve_amount)
            })
            return
        } else {
            this.setState({
                loan_adjust_up: loan_adjust_up,
                loan_adjust_downdisable: loan_adjust_down,
                approve_amount: parseInt(approve_amount) + 1000,
            }, () => {
                this.props.adjustApproveAmount(this.state.approve_amount)
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
        adjustApproveAmount: (approve_amount) => dispatch({
            type: 'receiveOnlineAdjustApproveAmount',
            tempAmount: approve_amount
        }),
        //externalPush: route => dispatch(externalPush(route))
    }
}

export default connect(null, mapDispatchToProps)(LoanAdjustRText)
