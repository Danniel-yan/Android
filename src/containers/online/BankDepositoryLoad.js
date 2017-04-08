import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';

class BankDepositoryLoad extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.content}>
                    <View style={styles.imgborder}>
                        <Image style={styles.img} source={require('assets/online/ic_bank_chaoshi.png')}/>
                    </View>
                    <Image style={styles.load} source={require('assets/online/ic_bank_load.gif')}/>
                    <View style={styles.imgborder}>
                        <Image style={styles.img} source={require('assets/online/ic_bank_xiamen.png')}/>
                    </View>
                </View>
                <View style={styles.textcontent}>
                    <Text style={styles.text}>正在前往厦门银行</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff',
        flex: 1
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90
    },
    imgborder: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6E6E6'
    },
    img: {
        width: 36,
        height: 36
    },
    load: {
        alignItems: 'center'
    },
    textcontent: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    text: {
        color: '#000',
        fontSize: 18
    }
});

export default connect(null, null)(BankDepositoryLoad)