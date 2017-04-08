import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import Button from 'components/shared/ButtonBase';
import {connect} from 'react-redux';
import img_activate from 'assets/online/ic_activate.png';
import img_activated from 'assets/online/ic_activated.png';

class BankDepositoryLoad extends Component {
    constructor() {
        super();
        this.state = {
            activated: false
        }
    }

    render() {
        let str_activate = "正在激活您的存管账户";
        let str_activated = "恭喜您成功激活银行存管账户";
        return (
            <ScrollView style={styles.background}>
                <View style={styles.content}>
                    <Image style={styles.img} source={this.state.activated ? img_activated : img_activate}/>
                </View>
                <View style={styles.textcontent}>
                    <Text style={styles.text}>{this.state.activated ? str_activated : str_activate}</Text>
                </View>
                {this.state.activated ? (<Button
                    style={styles.btn}
                    textStyle={styles.btnText}
                    text="继续借款"/>) : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff',
        flex: 1
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    img: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    textcontent: {
        alignItems: 'center',
        marginTop: 50
    },
    text: {
        color: '#000',
        fontSize: 18
    },
    btn: {
        marginTop: 180,
        height: 40,
        backgroundColor: '#FF003C',
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
    }
});

export default connect(null, null)(BankDepositoryLoad)