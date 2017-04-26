import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';

import { border, colors } from 'styles';
import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import Checkbox from 'components/shared/Checkbox'
import Picker from 'components/shared/Picker';
import FormGroup from 'components/shared/FormGroup';
import VerifyButton from 'components/shared/VerifyButton'
import validators from 'utils/validators';
import * as defaultStyles from 'styles';
import alert from 'utils/alert';
import { get, post, responseStatus } from 'utils/fetch';
import { ExternalPushLink } from 'containers/shared/Link';

import { DeviceSwitchComponent } from 'high-order/ComponentSwitcher';
import LoanButton from 'containers/shared/LoanButton';

const hasCreditStatus = {
    yes: 1,
    no: 0
}

class FillUserInfo extends Component {

    tracking() {
        let userFilled = this.props.loginUser.info && this.props.loginUser.info.username;

        return {key: 'loan', topic: userFilled ? 'complete_info_rtn_S' : 'complete_info_new_S'};
    }

    constructor(props) {
        super(props);

        let loginUser = props.loginUser.info || {};

        this.state = {
            submitting: false,
            checkedAgreement: true,
            username: loginUser.username,
            editableMobile: !loginUser.username,
            realname: loginUser.realname || '',
            id_no: loginUser.id_no || '',
            mobile: loginUser.username || loginUser.mobile || '',
            credit_status: loginUser.credit_status == hasCreditStatus.yes,
            job: loginUser.job || '',
            verify_code: loginUser.verify_code || ''
        };

    }

    alertError(msg) {
        Platform.OS == "ios" ? this.setState({error: msg}) : alert(msg);
    }

    _validation() {
        if (!this.formChanged) {
            return false;
        }

        let { editableMobile, checkedAgreement, username, verify_code, mobile, id_no, job, credit_status, realname } = this.state;

        const validMobile = validators.mobile(mobile);
        const validVerifyCode = !editableMobile || editableMobile && verify_code.length > 0;
        const validName = realname.length >= 2;
        const validID = validators.idNO(id_no);
        const validAgreement = !editableMobile || editableMobile && checkedAgreement;

        if (!validName) {
            //this.setState({error: '请输入有效的名字'});
            this.alertError('请输入有效的名字')
            return false;
        }

        if (!validID) {
            //this.setState({error: '请输入有效的身份证号'});
            this.alertError('请输入有效的身份证号')
            return false;
        }

        if (!validMobile) {
            //this.setState({error: '请输入正确的手机号'});
            this.alertError('请输入正确的手机号')
            return false;
        }

        if (!validVerifyCode) {
            //this.setState({error: '请输入验证码'});
            this.alertError('请输入验证码')
            return false;

        }

        if (!validAgreement) {
            //this.setState({error: '请接受钞市服务协议'});
            this.alertError('请接受钞市服务协议')
            return false;
        }

        this.setState({error: ''});
        return true;
    }

    render() {
        let { editableMobile, checkedAgreement, username, verify_code, mobile, id_no, job, credit_status, realname } = this.state;

        const validMobile = validators.mobile(mobile);
        const validVerifyCode = !editableMobile || editableMobile && verify_code.length == 6;
        const validName = realname.length >= 2;
        const validID = validators.idNO(id_no);
        const validAgreement = !editableMobile || editableMobile && checkedAgreement;

        return (
            <View style={defaultStyles.container}>
                <View style={styles.inputGroup}>
                    <View style={[defaultStyles.container, styles.formGroup]}>
                        <View style={styles.controlLabel}><Text style={styles.label}>姓名</Text></View>
                        <TextInput style={styles.formControl}
                                   clearButtonMode="while-editing"
                                   maxLength={20}
                                   value={realname}
                                   underlineColorAndroid="transparent"
                                   onChangeText={this._inputChange.bind(this, 'realname')}
                        />
                    </View></View>

                    <View style={styles.inputGroup}>
                    <View style={[defaultStyles.container, styles.formGroup]}>
                        <View style={styles.controlLabel}><Text style={styles.label}>身份证号</Text></View>
                        <TextInput style={styles.formControl}
                                   clearButtonMode="while-editing"
                                   maxLength={18}
                                   value={id_no}
                                   underlineColorAndroid="transparent"
                                   onChangeText={this._inputChange.bind(this, 'id_no')}
                        />
                    </View></View>

<View style={styles.inputGroup}>
                    <View style={[defaultStyles.container, styles.formGroup]}>
                        <View style={styles.controlLabel}><Text style={styles.label}>注册手机号</Text></View>
                        <TextInput style={styles.formControl}
                                   clearButtonMode="while-editing"
                                   keyboardType="numeric"
                                   maxLength={11}
                                   value={username || mobile}
                                   editable={editableMobile}
                                   underlineColorAndroid="transparent"
                                   onChangeText={this._inputChange.bind(this, 'mobile')}
                        />
                    </View></View>

                    { editableMobile && (
<View style={styles.inputGroup}>
                        <View style={[defaultStyles.container, styles.formGroup]}>
                            <View style={styles.controlLabel}><Text style={styles.label}>输入验证码</Text></View>
                            <TextInput style={styles.formControl}
                                       clearButtonMode="while-editing"
                                       keyboardType="numeric"
                                       maxLength={6}
                                       value={verify_code}
                                       underlineColorAndroid="transparent"
                                       onChangeText={this._inputChange.bind(this, 'verify_code')}
                            />
                            <View style={styles.addon}>
                                <VerifyButton
                                    tracking={Object.assign({ entity: 'mob_code_button'}, this.tracking()) }
                                    mobile={this.state.mobile}
                                />
                            </View>
                        </View>
</View>
                    )}
                    <View style={styles.optional}>
                        <View style={styles.optionalHeader}><Text style={styles.optionalTxt}>选填</Text></View>

<View style={styles.inputGroup}>
                        <View style={[defaultStyles.container, styles.formGroup]}>
                            <View style={styles.controlLabel}><Text style={styles.label}>职业身份</Text></View>
                            <Picker
                                style={styles.pickerGroupJob}
                                value={job}
                                textStyle={{fontSize: 16, color: '#333333',}}
                                onChange={this._inputChange.bind(this, 'job')}
                                items={[{value: '1', label:"上班族"},{value: '2', label:"学生"},{value: '3', label:"企业主"},{value: '4', label:"自由职业"}]}/>
                            <Image style={{marginRight: 10}} source={require('assets/icons/arrow-down@2x.png')}/>

                        </View></View>

<View style={styles.inputGroup}>
                        <FormGroup label="有信用卡资质">

                            <Checkbox
                                style={styles.pickerGroup}
                                checked={this.state.credit_status == true}
                                onChange={this._inputChange.bind(this, 'credit_status')}
                            />

                        </FormGroup></View>


                        { editableMobile && (
                            <View style={styles.txtRow}>
                                <Checkbox checked={checkedAgreement}
                                          onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}
                                          style={{marginRight: 5}}/>
                                <Text
                                    onPress={() => this._inputChange('checkedAgreement', !this.state.checkedAgreement)}>阅读并接受</Text>
                                <ExternalPushLink
                                    web='https://chaoshi-api.jujinpan.cn/static/pages/chaoshi/agreement.html'
                                    text="《钞市服务协议》" title="《钞市服务协议》"
                                />
                            </View>
                        )}

                        <View style={styles.txtRow}>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                    </View>

                    <View style={{flex: 1}}></View>
                <View style={styles.footer}>

                    <LoanButton
                        tracking={Object.assign({entity: 'apply', name: realname, cell: mobile, profession: job, own_credit_card: credit_status}, this.tracking()) }
                        processing={this.state.submitting}
                        style={styles.btn}
                        textStyle={styles.btnText}
                        disabled={this.state.error !== ''}
                        onPress={this._submit.bind(this)}/>
                </View>
            </View>
        );
    }


    _submit() {
        this.setState({submitting: true});
        let { mobile, verify_code, id_no, job, credit_status, realname } = this.state;

        let body = {
            mobile,
            verify_code,
            id_no,
            job,
            credit_status: credit_status ? hasCreditStatus.yes : hasCreditStatus.no,
            realname
        };

        this.props.submit(body).then(response => {
            if (response.res == responseStatus.success) {
                this.props.onSubmitSuccess();
            }
        }).catch(console.error)
            .finally(() => {
                this.setState({submitting: false});
            })
    }

    _inputChange(field, value) {
        this.formChanged = true;
        this.setState({[field]: value}, this._validation.bind(this));
    }
}

const styles = StyleSheet.create({
    container: {},
    error: {
        color: colors.error
    },

    inputGroup: {
        height: 49,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },

    formControl: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        color: '#333333',
        marginTop: 5

    },

    footer: {
        height: 50,
    },

    btn: {
        height: 50,
        backgroundColor: colors.primary
    },

    btnText: {
        color: '#fff',
        fontSize: 20,
    },

    addon: {
        paddingRight: 10
    },

    optional: {
        marginTop: 5,
    },

    optionalHeader: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        ...border('bottom'),
        justifyContent: 'center'
    },

    optionalTxt: {
        color: '#999',
    },

    pickerGroupJob: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 55
    },

    pickerGroup: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 55
    },

    txtRow: {
        marginTop: 10,
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    formGroup: {
        backgroundColor: '#fff',
        ...border('bottom'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    controlLabel: {
        left: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        width: 140
    },
    label: {
        fontSize: 16,
        color: '#666666',
    }
});


import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import submitUserInfo from 'actions/fillUserInfo';


function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submit: body => dispatch(submitUserInfo(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(FillUserInfo));
