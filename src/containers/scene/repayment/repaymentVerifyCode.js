/**
 * Created by yshr on 17/3/14.
 * 还款输入手机验证码
 */
import React,{
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Dimensions,
    Text,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';

//确定事件函数confirmAction
//发送验证码事件hintAction
let _width = Dimensions.get('window').width;
let times = 60;
var showTime;
class repaymentVerifyCode extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            show: false,
            text: '',
            time: '获取验证码',
            sendHint: false,
        };
    }

    open = ()=> {
        this.setState({
            show: true,
        })
    }

    hintAction() {
        return <Text style={styles.hint}>查询密码错误,请重新输入</Text>;
    }

//验证码事件
    authCodeAction() {
        var that = this;
        if (that.state.sendHint == true) return;
        var totalTime = times;
        showTime = setInterval(function () {
            if (totalTime == '0') {
                that.setState({
                    time: '获取验证码',
                    sendHint: false
                });
                clearInterval(showTime);
                return;
            }
            ;
            totalTime -= 1;
            that.setState({
                time: totalTime + 's',
                sendHint: true,
            })
        }, 1000);
        if (typeof this.props.hintAction == 'function') {
            this.props.hintAction();
        }
    }

    //取消事件
    cancelAction() {
        this.setState({
            show: false,
        });
        if (showTime != undefined) clearInterval(showTime);
        this.state.time = "获取验证码";
        this.state.sendHint = false;
    }

    //确定的事件
    confirmAction() {
        var value = this.state.text;
        if (typeof this.props.confirmAction == 'function') {
            this.props.confirmAction(value);
        }
        this.state.time = "获取验证码";
        this.state.sendHint = false;

    }

    render() {
        return (
            <Modal animationType={"none"}
                   transparent={true}
                   visible={this.state.show}
                   onRequestClose={() => {}}>
                <View style={styles.masking}>
                    <View style={styles.contentView}>
                        <Text style={styles.title}>请输入手机验证码:</Text>
                        <View style={styles.InputView}>
                            <TextInput ref="input" style={styles.textInput} placeholder="请输入手机验证码"
                                       underlineColorAndroid="transparent" onChangeText={(text)=>{
                      this.state.text=text;
                      }}/>
                            <TouchableOpacity style={styles.authCode} onPress={this.authCodeAction.bind(this)}>
                                <Text style={{color:'#FFFFFF'}}>{this.state.time}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* {this.hintAction()}*/}
                        <View style={styles.slecteView}>
                            <TouchableOpacity style={[styles.selectBut,styles.lineVertical]}
                                              onPress={this.cancelAction.bind(this)}>
                                <Text style={styles.butTitle}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.selectBut} onPress={this.confirmAction.bind(this)}>
                                <Text style={styles.butTitle}>确认</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


}
const styles = StyleSheet.create({
    masking: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,.45)',
    },
    contentView: {
        width: _width * .8,
        backgroundColor: 'rgba(255,255,255,1)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white'

    },
    contentViewTop: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 17,
        color: '#333333'
    },
    InputView: {
        flexDirection: 'row',
        borderColor: 'red',
        width: _width * .8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 50,
        borderRadius: 5,
        width: _width * 0.45,
        backgroundColor: '#D9D9D9',
        marginLeft: 10,
        padding: 0,

    },
    authCode: {
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFAF32',
        margin: 5,
        width: _width * 0.25,
        paddingLeft: 5,
        paddingRight: 5
    },
    hint: {
        width: _width,
        marginTop: 5,
        fontSize: 15,
        color: '#DE001B',
        textAlign: 'center',
    },
    slecteView: {
        width: _width * .8,
        borderTopWidth: 1,
        borderTopColor: '#E6E6E6',
        padding: 5,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    selectBut: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    lineVertical: {
        borderRightWidth: 1,
        borderRightColor: '#E6E6E6',
    },
    butTitle: {
        textAlign: 'center',
        fontSize: 17,
        color: '#333333',


    }

})
export default repaymentVerifyCode;