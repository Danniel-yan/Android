import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Modal,
} from 'react-native';

import { border, container, colors, fontSize } from 'styles';
import GroupTitle from 'components/GroupTitle';
import L2RText from 'components/shared/L2RText';
import LoanAdjustRText from 'components/shared/LoanAdjustRText';
import BankListContainer from 'containers/scene/card/BankListContainer';

export default function (props) {

    this.state = {
        loanType: props.loanType,
    }
    let resultData = props.resultdata
    let applyData = props.applydata
    console.log('LoanDetailPanel resultData------------------->')
    console.log(resultData)
    console.log('LoanDetailPanel resultData------------------->')
    console.log(applyData)
    console.log('12345678----'+props.loanType)
    return (
        <View>
            <View style={[styles.container, resultData.style]}>
                {/*<L2RText left="借款额度：" right={props.approve_amount}/>*/}
                <L2RText left="批核额度：" right={resultData.approve_amount}/>
                <L2RText left="借款期限：" right={`${resultData.sug_term}期`}/>
                <L2RText left="月费率：" right={`${resultData.month_fee}%`}/>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.container, resultData.style]}>
                {adjustAmount(resultData.approve_amount, (resultData.approve_amount > applyData.apply_amount) ? applyData.apply_amount : resultData.approve_amount)}
            </View>
            {contractAmountInfo(resultData.approve_amount, applyData.apply_amount)}
        </View>
    );
}
function contractAmountInfo(contractAmount, approve_amount) {
    if (parseInt(contractAmount) > parseInt(approve_amount)) {
        return (
            <Text
                style={styles.text}>{`您本次借款批核额度为${contractAmount}元，请根据实际资金需求调整借款金额。有效期内未确认将被视为放弃借款，钞票就在眼前，快来确认借款吧`}</Text>

        )
    } else {
        return (<Text style={styles.text}>{`本次借款为您批核了${contractAmount}元的额度，请尽快在有效期内确认借款，有效期过后视为放弃借款`}</Text>)
    }
}

function adjustAmount(contractAmount, approve_amount) {

    // console.log('LoanDetailPanel function adjustAmount---------------->')
    // console.log('approve_amount---------------->' + approve_amount)
    // console.log('contractAmount---------------->' + contractAmount)

    //console.log('12345----'+this.props.loanType)
    if (parseInt(contractAmount) > parseInt(approve_amount)) {
        console.log('this.state.loanType123--------------->' + this.state.loanType)
        return (
            <LoanAdjustRText textLeft="借款金额：" approve_amount={approve_amount} contractAmount={contractAmount} loanType={this.state.loanType}/>   )
    } else {
        return (<L2RText left="借款金额：" right={approve_amount}/>)
    }
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    line: {
        height: 10,
        backgroundColor: colors.bg
    },
    text: {
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 12
    }
});
