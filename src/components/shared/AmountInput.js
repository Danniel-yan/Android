import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';
import Input from 'components/shared/Input';

import { MajorTabLink, ExternalPushLink } from 'containers/shared/Link';
import Button from 'components/shared/ButtonBase';
import { colors, iptFontSize } from "styles/varibles";

export default class AmountInput extends Component {
    constructor(props) {
        super(props);

        this.state = {text: ''}
    }

    onPressNumberBtn() {
        var amount = parseInt(this.state.text) || null;
        amount && this.props.setAmount && this.props.setAmount(amount);
        this.props.majorTab && this.props.majorTab("LoanScene");
    }

    render() {
        return this.props.isIOSVerifying || !this.props.iosFetched ? null : (
            <View style={{height:25,flexDirection:"row", paddingBottom:12}}>
                <View style={AIStyle.iptWrap}>
                    <Input
                        tracking={{key: 'homepage', topic: 'btn_sec', entity: 'amount'}}
                        type={"number"} style={AIStyle.input} placeholder="请输入想借的金额" onChangeText={(text)=> {
        this.setState({text: text.replace(/[^\d]/g,'')})
      }} value={this.state.text}
                        ref={component => this._textInput = component}
                        onSubmitEditing={this._onSubmitEditing.bind(this)}
                        onEndEditing={this._onPressSearch.bind(this)}

                    ></Input></View>
                <View style={[AIStyle.btnWrap]}>
                    <Button
                        tracking={{key: 'homepage', topic: 'btn_sec', entity: 'i_want_money', amount: this.state.text}}
                        onPress={this.onPressNumberBtn.bind(this)}><Text style={[AIStyle.btn]}>我要借钱</Text></Button>
                </View>
            </View>);
    }

    _onSubmitEditing() {
        this._textInput.blur();
    }

    _onPressSearch(event) {
        this.onPressNumberBtn()

    }
}

const AIStyle = StyleSheet.create({
    iptWrap: {
        backgroundColor: "#F3F3F3",
        height: 32,
        flex: 3,
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14
    },
    input: {
        paddingLeft: 12,
        height: 32,
        paddingTop: 0, paddingBottom: 0,
        fontSize: iptFontSize,
        flex: 1
    },
    btnWrap: {
        flex: 1,
        height: 32,
        paddingRight: 5,
        backgroundColor: colors.secondary,
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14,
        justifyContent: "center"
    },
    btn: {
        color: "#fff",
        textAlign: "center",
        fontSize: iptFontSize
    }
});
