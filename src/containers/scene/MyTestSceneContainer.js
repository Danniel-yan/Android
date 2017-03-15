/**
 * Created by yshr on 17/3/13.
 */
import React, { Component} from 'react';
import { View, Text, Image,TextInput} from 'react-native';
import Button from 'components/shared/ButtonBase';
import { connect } from 'react-redux';
import * as defaultStyles from 'styles';
import repaymentStyle from './repayment/repaymentStyle';
import { ExternalPushLink } from 'containers/shared/Link';
import PopView from './repayment/repaymentVerifyCode';

class MyTestSceneContainer extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {text: '1022.55'};
    }

    _confirmOnPress = (callback) => {
        this.refs.confirm.open();
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
            <View style={[defaultStyles.container, defaultStyles.bg,repaymentStyle.wrap_content]}>
                <PopView ref='confirm' confirmAction={this.confirmAction} hintAction={this.hintAction}></PopView>
                <View>
                    <View style={repaymentStyle.item}>
                        <Text style={repaymentStyle.textColor}>还款金额(元)</Text>

                        {this.showTextInput()}

                    </View>
                    <View style={repaymentStyle.item}>
                        <Image
                            style={repaymentStyle.icon_bank}
                            source={require('assets/zone/weixingonggonghao.png')}/>
                        <Text style={repaymentStyle.textColor}>招商银行(****0639)</Text>
                    </View>
                    <View style={repaymentStyle.item}>
                        <Text style={repaymentStyle.textColor}>银行预留手机号</Text>
                        <Text style={repaymentStyle.textColor}>18900240678</Text>
                    </View>

                    <View style={repaymentStyle.text_bottom}>
                        <Text>本期应还金额为1122.05元，最后还款期限为2017-3-27</Text>
                        <Text>本次最低还款500元，最高还款1122.05元</Text>
                        <Text>点击确认还款后，将从您绑定的银行卡中划扣档期还款</Text>
                        <Text>金额，请确保卡内余额充足</Text>
                    </View>
                </View>
                <View>
                    <Button onPress={() => this._confirmOnPress()}
                            text="确认还款"
                            type="line"
                            textStyle={repaymentStyle.btnText}
                            style={[repaymentStyle.btn, defaultStyles.centering]}/>
                </View>
            </View>

        );
    }

    showTextInput() {
        if (this.state.text > 500) {
            return (
                <TextInput
                    style={[repaymentStyle.textinput,repaymentStyle.textColor]}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
            )
        } else {
            return (
                <Text style={[repaymentStyle.textinput,repaymentStyle.textColor]}> {this.state.text}</Text>
            )
        }
    }


}


export default connect()(MyTestSceneContainer)
