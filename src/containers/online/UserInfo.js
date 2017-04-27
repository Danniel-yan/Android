import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';

import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import Checkbox from 'components/shared/Checkbox'
import DeviceInfo from 'react-native-device-info';
import Picker from 'components/shared/Picker';
import validators from 'utils/validators';
import { container, rowContainer, centering, fontSize, colors, border } from 'styles';
import alert from 'utils/alert';
import { externalPush } from 'actions/navigation';
import { get, post, responseStatus } from 'utils/fetch';
import FormGroup from 'components/shared/FormGroup';
import SubmitButton from './SubmitButton';
import ErrorInfo from './ErrorInfo';
import { ExternalPushLink } from 'containers/shared/Link';

import { DeviceSwitchComponent } from 'high-order/ComponentSwitcher';
import tracker from 'utils/tracker.js';
import { window} from 'styles';
import * as defaultStyles from 'styles';
import LoanButton from 'containers/shared/LoanButton';

const noWrap = true;
(window.width > 400);

const hasCreditStatus = {
    yes: 1,
    no: 0
}

class UserInfo extends Component {
    tracking() {
        return {
            key: 'inhouse_loan',
            topic: "online_user_info",
            exten_info: JSON.stringify({title: this.props.title, id: this.props.id})
        }
    }

    constructor(props) {
        super(props);

        let user = props.user.data || {};

        let form = {
            person_name: user.person_name || '',
            id_no: user.id_no || '',
            mobile: props.mobile,
            profession: user.profession || '',
            education: user.education || '',
            company: user.company || '',
        };

        this.state = {
            form,
            firstTime: !user.person_name,
            checkedAgreement: true,
        }
    }

    _validation() {
        let { education, company, id_no, profession, person_name } = this.state.form;

        const validName = person_name.length >= 2;
        const validID = validators.idNO(id_no);

        if (person_name.length < 2) {
            alert('请输入有效姓名')
            //tracking={{key: "inhouse_loan", topic: "online_user_info", entity: "submit", event: "clk", exten_info: JSON.stringify({title: this.props.title})}}
            this.trackingVerify('请输入有效姓名')
            return false
            //return '请输入有效姓名';
        }
        if (!this.state.checkedAgreement) {
            alert('必须接受服务协议')
            this.trackingVerify('必须接受服务协议')
            return false
            //return '必须接受服务协议';
        }
        if (!validID) {
            alert('请输入有效身份证号')
            this.trackingVerify('请输入有效身份证号')
            return false
            //return '请输入有效身份证号';
        }
        if (profession == '') {
            alert('请选择职业身份')
            this.trackingVerify('请选择职业身份')
            return false
            //return '请选择职业身份';
        }
        if (education == '') {
            alert('请选择教育程度')
            this.trackingVerify('请选择教育程度')
            return false
            //return '请选择教育程度';
        }
        if (company.length < 2) {
            alert('请输入单位名称')
            this.trackingVerify('请输入单位名称')
            return false
            //return '请输入单位名称';
        }
        this.trackingVerifySuccess()
        return true;
    }

    trackingVerify(error_msg) {
        tracker.trackAction({
            key: "inhouse_loan",
            topic: "online_user_info",
            entity: "error_local",
            event: "pop",
            exten_info: JSON.stringify({error_msg: error_msg})
        })
    }

    trackingVerifySuccess(){
        tracker.trackAction({
            key: "inhouse_loan",
            topic: "online_user_info",
            entity: "success_local",
            event: "undefined"
        })
    }

    trackingVerifyBack(error_msg) {
        tracker.trackAction({
            key: "inhouse_loan",
            topic: "online_user_info",
            entity: "error_backend",
            event: "pop",
            exten_info: JSON.stringify({error_msg: error_msg})
        })
    }

    trackingVerifyBackSuccess() {
        tracker.trackAction({
            key: "inhouse_loan",
            topic: "online_user_info",
            entity: "success_backend",
            event: "undefined"
        })
    }

    render() {
        let { education, company, id_no, profession, person_name } = this.state.form;

        let error = this.formChanged && this._validation();
        let disabled = !this.formChanged || !!error;
        // 第二次进入默认不禁用
        if (!this.state.firstTime && !this.formChanged && this.state.checkedAgreement) {
            disabled = false;
        }

        return (
            <View style={container}>

                <ScrollView style={[container, styles.container]} keyboardShouldPersistTaps={true}>
                    <FormGroup label="姓名">
                        <TextInput style={styles.formControl}
                                   clearButtonMode="while-editing"
                                   maxLength={20}
                                   value={person_name}
                                   underlineColorAndroid="transparent"
                                   onChangeText={this._inputChange.bind(this, 'person_name')}
                                   onBlur={this._trackingInfo.bind(this, 'person_name', 'name')}
                        />
                    </FormGroup>

                    <FormGroup label="身份证号">
                        <TextInput style={styles.formControl}
                                   clearButtonMode="while-editing"
                                   maxLength={18}
                                   value={id_no}
                                   underlineColorAndroid="transparent"
                                   onChangeText={this._inputChange.bind(this, 'id_no')}
                                   onBlur={this._trackingInfo.bind(this, 'id_no', 'ID')}
                        />
                    </FormGroup>

                    <View style={styles.optional}>

                        <View style={[defaultStyles.container, styles.formGroup]}>
                            <View style={styles.controlLabel}><Text style={styles.label}>职业类别</Text></View>
                            <Picker
                                style={styles.pickerGroup}
                                value={profession}
                                textStyle={{fontSize: 16, color: '#333333',}}
                                onChange={this._inputChange.bind(this, 'profession')}
                                items={this.props.pickers.profession}
                                withArrow={true}
                            />

                        </View>


                        <View style={[defaultStyles.container, styles.formGroup]}>
                            <View style={styles.controlLabel}><Text style={styles.label}>教育程度</Text></View>
                            <Picker
                                style={styles.pickerGroup}
                                value={education}
                                textStyle={{fontSize: 16, color: '#333333',}}
                                onChange={this._inputChange.bind(this, 'education')}
                                items={this.props.pickers.education}
                                withArrow={true}
                            />

                        </View>


                        <FormGroup label="单位名称">
                            <TextInput style={styles.formControl}
                                       clearButtonMode="while-editing"
                                       maxLength={30}
                                       value={company}
                                       underlineColorAndroid="transparent"
                                       onChangeText={this._inputChange.bind(this, 'company')}
                                       onBlur={this._trackingInfo.bind(this, 'company', 'company')}
                            />
                        </FormGroup>


                    </View>

                    <ErrorInfo msg={error || this.state.error}/>

                    <View style={[styles.textRow, {marginTop: 4}]}>
                        <Checkbox checked={this.state.checkedAgreement}
                                  onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}
                                  style={{marginRight: 5}}/>
                        <Text style={{flex: 1, flexWrap: "wrap"}}>
                            <Text style={{fontSize: 10}} onPress={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}>我已阅读并同意</Text>
                            <TouchableWithoutFeedback onPress={() => this.props.externalPush({
                web: "https://chaoshi-api.jujinpan.cn/static/pages/chaoshi/shenqingheyue.html",
                title: "《申请合约》"
              })}><Text numberOfLines={2} style={{ fontSize: 10,color: colors.secondary}}>《申请合约》、</Text></TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.externalPush({
                web: "https://chaoshi-api.jujinpan.cn/static/pages/chaoshi/qianhaizhengxinshouquanshu.html",
                title: "《前海征信授权书》"
              })}><Text numberOfLines={2} style={{ fontSize: 10,color: colors.secondary}}>《前海征信授权书》</Text></TouchableWithoutFeedback>
                        </Text>
                    </View>

                    <TouchableOpacity style={{marginTop: 10}}
                                      onPress={()=> {
                        this._submit();
                        tracker.trackAction({key: "inhouse_loan", topic: "online_user_info", entity: "submit", event: "clk", exten_info: JSON.stringify({title: this.props.title})})
                    }}>
                        <LoanButton
                            processing={this.state.submitting}/>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        );
    }

    pushToAgreement() {

    }

    _submit() {
        if (!this._validation()) {
            this.setState({submitting: false});
            return
        }
        this.setState({submitting: true, error: ''}, () => {
            let form = this.state.form;
            navigator.geolocation.getCurrentPosition(position => {
                const coords = position.coords;
                form.lati = coords.latitude;
                form.long = Math.abs(coords.longitude);
                form.phone_model = DeviceInfo.getModel();
                form.phone_system_version = DeviceInfo.getSystemVersion();


                var loanType = this.props.loanType || 0;
                loanType && (form.loan_type = loanType);
                return post('/loanctcf/first-filter', form).then(response => {
                    if (response.res == responseStatus.success) {
                        this.trackingVerifyBackSuccess();
                        this.setState({submitting: false})
                        this.props.fetchStatus();
                        this.props.requestUser();
                        this.props.goHome();
                    } else if (response.code == 300) {
                        this.trackingVerifyBack('审批失败')
                        this.setState({submitting: false})
                        this.props.goApproveFailed && this.props.goApproveFailed({title: this.props.title});
                    } else {
                        this.trackingVerifyBack(response.msg)
                        throw response.msg;
                    }
                }).catch(err => {
                    console.log(err);
                    //this.setState({submitting: false, error: err})
                    this.setState({submitting: false})
                    alert(err)
                });
            }, err => {
                console.log(err);
                this.trackingVerify('定位失败')
                //this.setState({submitting: false, error: "请打开定位"})
                this.setState({submitting: false})
                alert('请打开定位')
            });
        });
    }

    _inputChange(field, value) {
        //this.formChanged = true;
        value = typeof value == 'string' ? value.trim() : value;
        let form = {...this.state.form, [field]: value};
        this.setState({form});

        if (field == "profession") {
            tracker.trackAction({
                key: "inhouse_loan",
                topic: "online_user_info",
                entity: "profession",
                event: "clk",
                exten_info: JSON.stringify({
                    title: this.props.title, profession: value
                })
            })
        }
        if (field == "education") {
            tracker.trackAction({
                key: "inhouse_loan",
                topic: "online_user_info",
                entity: "education",
                event: "clk",
                exten_info: JSON.stringify({
                    title: this.props.title, education: value
                })
            })
        }
    }

    _trackingInfo(field, entity) {
        tracker.trackAction({
            key: "inhouse_loan", topic: "online_user_info", entity: entity, event: "blur", exten_info: JSON.stringify({
                title: this.props.title,
                [entity]: this.state.form[field]
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {},

    formControl: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        color: '#333333',
        paddingHorizontal: 10,
        marginLeft: 130
    },

    footer: {
        height: 50,
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
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        justifyContent: 'center'
    },

    optionalTxt: {
        color: '#999',
    },

    pickerGroup: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 55
    },

    txtRow: {
        marginTop: 10,
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textRow: {
        flexDirection: 'row',
        // height: 30,
        alignItems: 'center',
        marginLeft: 10,
    },
    formGroup: {
        height: 55,
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


import { connect } from 'react-redux';

import { trackingScene } from 'high-order/trackingPointGenerator';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import actions from 'actions/online';

function mapStateToProps(state, ownProps) {
    let user = state.online.userInfo;
    let pickers = state.online.pickers;
    let loanDetail = state.loanDetail.detail || {};

    // console.log(state);

    return {
        isFetching: user.isFetching || pickers.isFetching,
        fetched: user.fetched && pickers.fetched,
        err: user.err || pickers.err,
        user,
        mobile: state.loginUser.info.username,
        pickers,
        loanType: state.online.loanType.type,
        title: loanDetail.title,
        id: loanDetail.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStatus: () => dispatch(actions.status()),
        fetching: () => {
            dispatch(actions.pickers());
            dispatch(actions.userInfo())
        },
        goHome: () => dispatch(externalPush({key: 'CertificationHome', title: '信息认证'})),
        goApproveFailed: (componentProps) => dispatch(externalPush({
            key: 'OnlineApproveStatus',
            title: '审批失败',
            componentProps: componentProps
        })),
        requestUser: () => dispatch(actions.userInfo()),
        externalPush: route => dispatch(externalPush(route))
    }
}

let AsyncUserInfo = AsynCpGenerator(Loading, UserInfo, true);

class AsyncUserInfoComponent extends Component {
    tracking() {
        return {
            key: 'inhouse_loan',
            topic: "online_user_info",
            exten_info: JSON.stringify({title: this.props.title, id: this.props.id})
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <AsyncUserInfo {...this.props} />
        );
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(trackingScene(AsyncUserInfoComponent)));
