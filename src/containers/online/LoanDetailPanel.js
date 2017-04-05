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
    return (
        <View>
            <View style={[styles.container, props.style]}>
                {/*<L2RText left="借款额度：" right={props.approve_amount}/>*/}
                <L2RText left="批核额度：" right={props.contractAmount}/>
                <L2RText left="借款期限：" right={`${props.sug_term}期`}/>
                <L2RText left="月费率：" right={`${props.month_fee}%`}/>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.container, props.style]}>
                {adjustAmount(props.contractAmount, props.approve_amount)}
            </View>
            {contractAmountInfo(props.contractAmount, props.approve_amount)}
        </View>
    );

}
function contractAmountInfo(contractAmount, approve_amount) {
    if (contractAmount > approve_amount) {
        return (
            <Text
                style={styles.text}>{`恭喜! 本次借款为您批核了${contractAmount}元的额度，您可以根据需要向上调整您的借款金额,最大不超过批核额度,请尽快在有效期内确认借款，有效期过后视为放弃借款哦.`}</Text>

        )
    } else {
        return (<Text style={styles.text}>{`本次借款为您批核了${contractAmount}元的额度，请尽快在有效期内确认借款，有效期过后视为放弃借款哦.`}</Text>)
    }
}

function adjustAmount(contractAmount, approve_amount) {
    if (contractAmount > approve_amount) {
        return (
            <LoanAdjustRText textLeft="借款金额：" approve_amount={approve_amount} contractAmount={contractAmount}/>   )
    } else {
        <L2RText left="借款金额：" right={approve_amount}/>
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
