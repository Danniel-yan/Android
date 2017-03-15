/**
 * Created by yshr on 17/3/14.
 */
import React, { Component} from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import Button from 'components/shared/ButtonBase';
import { connect } from 'react-redux';
import * as defaultStyles from 'styles';
import repaymentStyle from './repayment/repaymentStyle';
import { ExternalPushLink } from 'containers/shared/Link';

class RepaymentResultContainer extends Component {
    _continue_repay:{

        }
    render() {
        return (
            <View style={[defaultStyles.container, defaultStyles.bg,styles.wrap_content]}>
                <View>
                    <View style={styles.top}>
                        <Image style={styles.top_icon} source={require('assets/icons/repaymenting_loading.gif')}/>
                        <Text style={styles.top_text}>还款中...</Text>
                    </View>


                </View>
                <View>
                    <Button onPress={() => this._continue_repay()}
                            text="继续还款"
                            type="line"
                            textStyle={repaymentStyle.btnText}
                            style={[repaymentStyle.btn, defaultStyles.centering]}/>
                </View>
                <View style={styles.bottom}>
                    <Text style={{fontSize: 14}}>如果有疑问请拨打客服热线：021-888888</Text>
                </View>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    wrap_content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
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

export default connect()(RepaymentResultContainer)