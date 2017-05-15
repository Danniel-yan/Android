import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView , TextInput, StyleSheet, Image, TouchableOpacity , AsyncStorage} from 'react-native';

import * as defaultStyles from 'styles';
import { fontSize } from 'styles';

import ProcessingButton from 'components/shared/ProcessingButton'
import { colors } from 'styles/varibles'
import LocationPicker from 'components/modal/LocationPicker';
import Dialog from './Dialog'
import { post, responseStatus } from 'utils/fetch';

import FundSecondLogin from './FundSecondLogin';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import ErrorInfo from 'containers/online/ErrorInfo';
import { trackingScene } from 'high-order/trackingPointGenerator';
import tracker from 'utils/tracker.js';
import {Keyboard} from 'react-native'

import onlineActions from 'actions/online'

import { ExternalPushLink } from 'containers/shared/Link';

import { externalPush } from 'actions/navigation'

import NextIcon from 'components/shared/NextIcon';

const GjjLocationPicker = connect(state => {
    return {gjjLoginElements: state.online.gjjLoginElements.elements}
})(LocationPicker);

class FundLoginScene extends Component {

    tracking = {key: "PAF_report", topic: "basic_info"}

    constructor(props) {
        super(props);

        this.state = {
            visibleSecondVerify: false, submitting: false,
            showPicker: false, showDialog: false,
            location: '请选择您所在的城市',
            typeName:'请选择您的登录类型'
        };

    }

    render() {
        var gjjBillList = this.props.gjjResult ? this.props.gjjResult.billList : null;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.setState({showPicker: true}) } style={styles.inputGroup}>
                    <Text style={styles.text}>请选择城市</Text>
                    {/*         <TextInput value={this.state.location}
                     style={styles.input}
                     placeholder='请选择您所在的城市'
                     underlineColorAndroid="transparent"
                     editable={false}
                     onChangeText={(location) => { this.setState({location}) }}
                     />*/}
                    <Text style={styles.input}
                    >
                        {this.state.location}
                    </Text>
                    <NextIcon/>

                    <GjjLocationPicker mark='fundCity' visible={this.state.showPicker}
                                       onChange={this._onChange.bind(this)}
                                       onHide={() => this.setState({showPicker: false})}/>
                </TouchableOpacity>

                {
                    this.state.location !== '请选择您所在的城市'? (
                        <TouchableOpacity
                            onPress={() => { this.state.configList && this.state.configList.length > 1 && this.setState({showDialog: true})} }
                            style={styles.inputGroup}>
                            <Text style={styles.text}>登录类型</Text>
                            {/* <TextInput value={this.state.typeName}
                                       style={styles.input}
                                       placeholder='请选择你的登陆类型'
                                       underlineColorAndroid="transparent"
                                       editable={false}
                                       onChangeText={(typeName) => { this.setState({typeName}) }}
                            />*/}
                            <Text style={styles.input}
                            >
                                {this.state.typeName}
                            </Text>
                            <NextIcon/>

                            {
                                this.state.configList && this.state.configList.length > 1 ?
                                    <Dialog visible={this.state.showDialog} location={this.state.location}
                                            onChange={this._onChangeDialog.bind(this)}
                                            loginConfig={this.state.configList}
                                            onHide={() => this.setState({showDialog: false})}/>
                                    : null
                            }
                        </TouchableOpacity>
                    ) : null
                }

                {
                    this.state.description ? (
                        this.state.description.map((config, idx) =>
                            <View key={'key' + idx } style={styles.inputGroup}>
                                <Text style={styles.text}>{config.show_name}</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    placeholder={'请输入'+ config.show_name}
                                    secureTextEntry={config.name == 'password'}
                                    onChangeText={this._onFormChange.bind(this, config.name)}
                                />
                            </View>
                        )
                    ) : null
                }

                <ErrorInfo msg={this.state.error}/>

                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <ProcessingButton
                        processing={this.state.submitting}
                        onPress={this._submit.bind(this)}
                        style={styles.submitBtn}
                        textStyle={styles.submitBtnText}
                        disabled={this._buttonDisabled()}
                        text="提交"/>
                </View>
                {
                    gjjBillList && gjjBillList.length > 0 && gjjBillList[0].status == 8 ? (
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <ExternalPushLink
                                style={[styles.submitBtn, { marginTop: 5, backgroundColor: "#d3d3d3" }]}
                                textStyle={{color: "#fff"}}
                                title={"公积金报告"}
                                toKey={"GjjReport"} text={"查看已有报告"}
                                tracking={{key: 'PAF_report', topic: 'basic_info', entity: "review", event: 'clk'}}>
                            </ExternalPushLink>
                        </View>
                    ) : null
                }
                <FundSecondLogin
                    {...this.state.submitResult}
                    onHide={() => this.setState({visibleSecondVerify: false})}
                    visible={this.state.visibleSecondVerify}
                    verifySuccess={this._onSecondVerifySuccess.bind(this)}
                />
            </View>

        )
    }

    _buttonDisabled() {
        var { config, description } = this.state;

        if (!config || !description) return true;

        var infoCompelete = true;
        description.map(obj => {
            infoCompelete = infoCompelete && (!!this.state[obj.name]);
        })

        return !infoCompelete;
    }

    _onChangeDialog(config) {
        this.setState({
            config,
            description: config.description,
            typeName: config.login_type_name,
            showDialog: false
        });
    }

    _onChange(location) {
        var loginEle = this.props.loginElements.find(ele => ele.area_name == location),
            configList = loginEle ? loginEle.login_config : null,
            defaultConfig = configList && configList.length > 0 ? configList[0] : {};

        this.setState({
            location,
            showPicker: false,
            configList: configList,
            config: defaultConfig,
            typeName: defaultConfig.login_type_name || '',
            description: defaultConfig.description || {}
        });

    }

    _onFormChange(field, value) {
        this.setState({
            [field]: value
        });
    }

    _submit() {
        Keyboard.dismiss();
        this.setState({submitting: true, error: ''}, () => {
            let { login_target, login_type, description } = this.state.config;

            if (this.submitting) {
                return;
            }
            this.submitting = true;

            let body = {}
            description.map(obj => {
                body[obj.name] = this.state[obj.name];
            })
            tracker.trackAction({
                key: 'PAF_report',
                topic: 'basic_info',
                entity: "submit",
                event: 'clk',
                exten_info: JSON.stringify(body)
            });

            // this.setState({submitting: false, visibleSecondVerify: true, submitResult: {
            //   "ticket_id": "ea8029b2-c81c-11e6-b5e3-00163e00ed7a_1482393720.03", //ticket_id 供二次登录时使用
            //   "second_login": 1, //是否需要二次登陆，0=不需要，1=需要
            //   "val_code": {
            //       "type": "sms", //验证码类型，sms=手机验证码，img=图片验证码
            //       "value": "null" //图片验证码的base64数据
            //   }
            // }});

            post('/bill/gjj-login', Object.assign({loan_type: this.props.loanType, login_target, login_type}, body))
                .then(response => {
                    if (response.res == responseStatus.success && response.data.second_login == 1) {
                        this.setState({submitting: false, visibleSecondVerify: true, submitResult: response.data});
                    } else if (response.res == responseStatus.success) {
                        this.setState({submitting: false});
                        this.props.externalPush({
                            key: "GjjStatus",
                            title: "公积金认证",
                            backRoute: {key: this.props.loanType != 0 ? 'CertificationHome' : "CreditLoan"}
                        });
                    } else {
                        this.setState({submitting: false, error: response.msg});
                    }
                    this.submitting = false;
                })
                .catch(err => {
                    this.setState({submitting: false});
                    this.submitting = false;
                })

        })
    }

    _onSecondVerifySuccess() {
        this.props.externalPush({
            key: "GjjStatus",
            title: "公积金认证",
            backRoute: {key: this.props.loanType != 0 ? 'CertificationHome' : "CreditLoan"}
        });
    }

    componentWillUnmount() {
        this.props.updateCreditScore && this.props.updateCreditScore();
        this.props.creditLevel();
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    inputGroup: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        marginLeft: 18,
        marginRight: 10,
        fontSize: fontSize.normal,
        color: '#A5A5A5',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: fontSize.normal,
        color: '#727272',
        width: 90,
    },
    submitBtn: {
        marginTop: 50,
        height: 40,
        backgroundColor: '#FF003C',
        borderRadius: 4,
        width: 250
    },
    submitBtnText: {
        fontSize: 20,
        color: '#fff',
    },
})

function mapStateToProps(state) {
    return {
        isFetching: state.online.gjjLoginElements.isFetching,
        fetched: state.online.gjjLoginElements.fetched,
        loginElements: state.online.gjjLoginElements.elements,
        loanType: state.online.loanType.type,
        gjjResult: state.online.gjjResult
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gjjLoginElements: () => dispatch(onlineActions.gjjLoginElements()),
        fetching: () => dispatch(onlineActions.gjjLoginElements()),
        externalPush: route => dispatch(externalPush(route)),
        updateCreditScore: () => dispatch(onlineActions.creditScore()),
        creditLevel: () => {
            dispatch(onlineActions.userCreditDetail());
            dispatch(onlineActions.userCreditLevel());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(FundLoginScene)));
