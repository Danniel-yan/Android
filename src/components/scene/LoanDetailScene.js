import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    AsyncStorage,
    Modal, TextInput,
    NativeModules
} from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';
import {ExternalPushLink} from 'containers/shared/Link';
import alert from 'utils/alert';
import {externalPop} from 'actions/navigation';

import iconSqlc from 'assets/icons/shenqingliucheng.png'
import Dimensions from 'Dimensions';
import SceneHeader from 'components/shared/SceneHeader';
import {ExternalOnlineBtn} from 'components/shared/ExternalOnlineBtn';
import * as defaultStyles from 'styles';
import LoanButton from 'containers/shared/LoanButton';
import {
    loanType,
    firstFilterStatusSuccess,
    // preloanStatus as preloanStatusConstants
} from 'constants';

import Button from 'components/shared/Button'
import AbstractScene from 'components/scene/AbstractScene.js';

import Picker from 'components/shared/Picker';
import tracker from 'utils/tracker.js';

var screenWidth = Dimensions.get('window').width;

export default class LoanDetailScene extends Component {

    tracking() {
        let detail = this.props.detail;
        return {key: 'loan', topic: 'product_detail', id: detail.id, title: detail.title};
    }

    constructor(props) {
        super(props);

        tracker.trackGIO('land_loan_product_detail',{'id':this.props.detail.id,'title':this.props.detail.title})

        var repayParams = this.props.repayCalc ? this.props.repayCalc.fetchedParams : null;

        this.state = {
            amount: repayParams ? repayParams.amount.toString() : String(props.detail.amount_min),
            value: repayParams ? repayParams.period : props.detail.period_list[0],
            id: repayParams ? repayParams.id : props.detail.id
        };

        this.changeFlag = null;
    }

    componentWillMount() {

        var fetchedParams = this.props.repayCalc ? this.props.repayCalc.fetchedParams : null;

        if (fetchedParams && fetchedParams.amount == parseInt(this.state.amount) && fetchedParams.period == this.state.value && fetchedParams.id == this.state.id) return;
        this.props.fetchRepay({id: this.state.id, amount: parseInt(this.state.amount), period: this.state.value})
    }

    _formChange(name, value) {
        this.setState({[name]: value})
    }

    _fetchRepay() {
        this.props.fetchRepay({
            id: this.state.id,
            amount: parseInt(this.state.amount),
            period: this.state.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.repayCalc.error) {
            this.setState({amount: String(nextProps.repayCalc.fetchedParams.amount)});
        }
    }

    render() {

        let detail = this.props.detail;
        const repayCalc = this.props.repayCalc.repayCalc;
        let sectionList = [], length = detail.apply_list.length;
        detail.apply_list.map((item, idx) => {
            sectionList.push(item);
            if (idx !== length - 1) sectionList.push("processIcon");
        })

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>

                <ScrollView >
                    <View style={[styles.flexColumn, styles.bgColorWhite]}>
                        <View style={styles.flexContainerRow}>
                            <Image source={{uri: detail.logo_detail}} style={styles.thumbnailLarge}/>
                            <View style={styles.rightContainer}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}><Text
                                    style={[styles.rightContainerTitle, {marginBottom: 0}]}>{detail.title}</Text><View
                                    style={styles.rightContainerDes}>
                                    <Text
                                        style={styles.rightContainerDesText}>{detail.tips}</Text></View>
                                </View>
                                <Text style={[styles.rightContainerSubTitle, {
                                    marginBottom: 10,
                                    color: '#353535'
                                }]}>{detail.info}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <Text style={{color: '#666666'}}>{detail.web_fangkuan}</Text>
                                    <Text style={styles.number}>{repayCalc.interest}</Text>
                                    <Text style={{color: '#666666'}}>/{repayCalc.interest_period}费率</Text></View>
                            </View>
                        </View>

                    </View>
                    <View style={{height: 5, backgroundColor: '#f3f3f3'}}/>
                    <View style={styles.bgColorWhite}>
                        <View style={[styles.editText, {marginTop: 5}]}>
                            <Text style={styles.moneyTxt}>金额</Text>
                            <Text style={{color: '#999', marginLeft: 6}}>{detail.amount_showinfo}</Text>
                            <TextInput style={styles.moneyInput}
                                       underlineColorAndroid={'transparent'}
                                       value={this.state.amount}
                                       keyboardType={'numeric'}
                                       onChangeText={this._formChange.bind(this, 'amount')}
                                       onBlur={() => {
                                           this._fetchRepay();
                                           tracker.trackAction({
                                               key: "loan",
                                               topic: "product_detail",
                                               entity: "amount",
                                               event: "blur",
                                               exten_info: JSON.stringify({
                                                   amount: this.state.amount,
                                                   title: detail.title
                                               })
                                           });
                                       }}/>
                            <Text style={{color: '#666', fontSize: 16}}>元</Text>
                        </View>
                        <View style={[styles.lineMargin, {marginTop: 5}]}/>
                        <View style={styles.editText}>
                            <Text style={styles.moneyTxt}>期数</Text>
                            <Text style={{color: '#999', marginLeft: 6, flex: 1}}>{detail.period_showinfo}</Text>
                            {this._renderPeriodList(detail.period_list, detail.period_name)}
                        </View>
                        <View style={styles.line}/>
                        <View style={[styles.editText, {marginBottom: 10}]}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{color: '#999'}}>{repayCalc.repay_period}:</Text>
                                <Text style={{color: '#999', marginLeft: 10}}>{repayCalc.repay}</Text>
                            </View>
                            <Text style={{color: '#999'}}>{repayCalc.interest_period}利率:</Text>
                            <Text style={{color: '#999', marginLeft: 10}}>{repayCalc.interest}</Text>
                        </View>
                    </View>

                    <View style={{height: 5, backgroundColor: '#f3f3f3'}}/>
                    <View style={styles.bgColorWhite}>
                        <View style={styles.flexContainer}><Text style={styles.applyTitle}>申请流程</Text></View>

                        <View style={{flexDirection: 'row', padding: 10}}>
                            {
                                sectionList.map((item, idx) => {
                                    return (item != "processIcon") ? (
                                        <View key={idx} style={{
                                            flex: 6,
                                            alignItems: 'center',
                                            justifyContent: "flex-start",
                                            flexDirection: "column"
                                        }}>
                                            <Image style={{width: 36, height: 36}} source={{uri: item.img.x2}}/>
                                            <Text style={{marginTop: 8, textAlign: "center"}}>{item.name}</Text>
                                        </View>
                                    ) : (
                                        <View key={idx} style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: "flex-start",
                                            flexDirection: "column",
                                            paddingBottom: 20,
                                            marginTop: 15
                                        }}>
                                            <Image source={require('assets/icons/jiantou.png')}/>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.bgColorWhite}>
                        <View style={styles.lineMargin2}/>
                        <View style={[styles.flexContainer]}><Text
                            style={styles.applyTitle}>申请条件</Text></View>
                        <View style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15}}>
                            <Text style={{lineHeight: 24}}>{detail.apply_info}</Text>
                        </View>
                    </View>

                    <View style={styles.bgColorWhite}>
                        <View style={styles.lineMargin2}/>
                        <View style={styles.flexContainer}><Text style={styles.applyTitle}>所有材料</Text></View>
                        <View style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15}}>
                            <Text style={{lineHeight: 24}}>{detail.apply_content}</Text>
                        </View>
                    </View>

                </ScrollView>

                {this._renderButton()}
            </View>
        );
    }

    _renderPeriodList(data, text) {

        let periodList = [];

        if (data) {

            data.map((value, index) => {
                periodList.push({value: value, label: String(value)})
            })

            return (
                <Picker
                    style={{paddingLeft: 10}}
                    textStyle={styles.moneyInput}
                    value={ this.state.value }
                    onChange={value => {
                        this.setState({value}, () => {
                            this._fetchRepay();
                            tracker.trackAction({
                                key: "loan",
                                topic: "product_detail",
                                entity: "period",
                                event: "clk",
                                exten_info: JSON.stringify({period: this.state.value, title: this.props.detail.title})
                            })
                        })
                    }}
                    items={ periodList }
                    textPeriod={ text }
                />
            )

        }

    }

    _renderButton() {

        if (this.props.isIOSVerifying) {
            return null;
        }

        let detail = this.props.detail, btnTxt = this.props.isIOS ? '立即申请' : "立即申请";

        if (this.props.isOnline) {
            return <ExternalOnlineBtn
                loginUser={this.props.loginUser} onlineStatus={this.props.onlineStatus}
                fetchOnlineStatus={this.props.fetchOnlineStatus}
                externalPop={() => this.props.dispatch(externalPop())}
                detail={this.props.detail}
                style={[styles.loanButton,{backgroundColor: '#f3f3f3'}]} textStyle={styles.loanButtonText}
                tracking={{
                    key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                    title: detail.title, amount: this.state.amount, period: this.state.value
                }}/>
            // prePress={ () => this.props.setLoanType() }  AsyncStorage.setItem('loan_type', this.props.detail.loan_type.toString())
        }

        if (this.props.loginUser.valid) {
            return this.props.isIOS ? (
                <Button
                    tracking={{
                        key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                        title: detail.title, amount: this.state.amount, period: this.state.value
                    }}
                    style={styles.loanButton}
                    textStyle={styles.loanButtonText}
                    text={btnTxt}
                    onPress={() => {
                        this.__skipToSafari__(detail.url)
                    }}
                />
            ) : (
                <ExternalPushLink
                    tracking={{
                        key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                        title: detail.title, amount: this.state.amount, period: this.state.value
                    }}
                    prePress={() => tracker.trackGIO('land_loan_loan_application',{'id':detail.id,'title':detail.title,'url':detail.url})}
                    web={detail.url}
                    title={detail.title}
                    componentProps={{
                        tracking: {key: 'loan', topic: 'loan_application', id: detail.id, title: detail.title}
                    }}>
                    <LoanButton
                        white={true}/>
                </ExternalPushLink>
            );
        }

        return (
            <ExternalPushLink
                toKey="FillUserInfo"
                title="完善个人信息"
                componentProps={{
                    onSubmitSuccess: this.props.goLoan.bind(null, this.props.detail, {
                        key: 'loan',
                        topic: 'loan_application',
                        id: detail.id,
                        title: detail.title
                    })
                }}
                prePress={() => tracker.trackGIO('land_loan_product_detail_apply',{'id':this.props.detail.id,'title':this.props.detail.title})}
                tracking={{
                    key: 'loan', topic: 'product_detail', entity: 'apply_all', id: detail.id,
                    title: detail.title, amount: this.state.amount, period: this.state.value
                }}>
                <LoanButton
                    white={true}/>
            </ExternalPushLink>

        );
    }

    __skipToSafari__(url) {
        var skipFunc = NativeModules.SkipSafari ? NativeModules.SkipSafari.skipSafariForUrlStr : null;

        skipFunc && typeof skipFunc == "function" && skipFunc(url);
    }
}
