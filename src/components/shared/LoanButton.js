import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    ActivityIndicator
} from 'react-native';
import Dimensions from 'Dimensions';
import styles from 'styles/loan';
import * as defaultStyles from 'styles';
import {Keyboard} from 'react-native';
var screenWidth = Dimensions.get('window').width;

export default class LoanButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let btnText = this.props.isIOSVerifying ? "立即查看" : "立即申请";
        btnText = this.props.btnText || btnText;

        return (
            <View style={[{
                position: "relative",
                flexDirection: "row"
            }, this.props.white ? {backgroundColor: '#fff'} : null]} onPress={Keyboard.dismiss()}>
                <Image
                    style={{
                        position: 'absolute',
                        width: screenWidth - 30,
                        height: 60,
                        margin: 15,
                        resizeMode: 'stretch',
                        zIndex: -1
                    }}
                    source={require('assets/icons/button-lijishenqing.png')}/>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 90,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "transparent",
                    zIndex: 1
                }}>
                    {!this.props.processing ? <Text
                        style={[styles.loanButtonText, {
                            alignItems: 'center',
                            textAlign: 'center',
                            flex: 1

                        }]}>{btnText}</Text> : <ActivityIndicator
                        animating={true}
                        style={defaultStyles.centering}
                        color={"#fff"}
                        size="small"
                    />}
                </View>
            </View>
        );
    }
}
