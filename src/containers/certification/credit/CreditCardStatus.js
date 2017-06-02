import React, {Component} from 'react';

import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';
import {connect} from "react-redux";

import {get, post, mock, responseStatus} from 'utils/fetch';
import alert from 'utils/alert';
import {responsive, border, fontSize, flexRow, rowContainer, container, colors, centering} from 'styles';
import onlineStyles from './../styles';
import SceneHeader from 'components/shared/SceneHeader';
import {ExternalPopLink, ExternalPushLink} from 'containers/shared/Link';

import successImage from 'assets/online/import-success.png';
import failureImage from 'assets/online/import-failure.png';
import ingImage from 'assets/online/importing.gif';

import CameraInput, {FaceMegInput} from 'containers/online/CameraInput';
import {InputGroup} from 'components/form';
import Input from 'components/shared/Input';

class CreditCardStatus extends Component {
    tracking = {key: "bill", topic: "progress"}

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            status: "processing",
            form: {
                credit_card_no: ""
            }
        };
    }

    componentDidMount() {
        this._getBillStatus();
    }

    componentDidUpdate() {
        if (this.state.checked && (!this.props.isFetching) && (this.props.status == 'success' || this.props.status == 'failure')) {
            clearInterval(this.timeFlag);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timeFlag)
    }

    render() {
        return (
            <View style={[container]}>
                {this._content()}
            </View>
        );
    }

    _content() {
        let status = this.props.status, loanType = this.props.loanType;


        let image = ingImage;
        let button = '';
        let statusText = (<Text style={styles.text}>正在导入...</Text>);
        let popKey = "CertificationHome";

        if (loanType == 0) popKey = "CreditLoan";
        // if(loanType == 9999) popKey = "ZoneScene"; // "我的"页面不需要认证流程

        if (this.state.checked && status == 'success') {
            image = successImage;
            button = '完成'
            statusText = loanType == 0 ? (
                <View style={{flexDirection: "row", marginVertical: 30, alignItems: "center"}}>
                    <Text style={{fontSize: fontSize.normal, color: colors.grayDark}}>导入完成，请至</Text>
                    <ExternalPushLink toKey={"BillList"} title={"我的账单"}><View><Text
                        style={{fontSize: fontSize.large, color: colors.primary}}>我的账单</Text></View></ExternalPushLink>
                    <Text style={{fontSize: fontSize.normal, color: colors.grayDark}}>查看！</Text>
                </View>
            ) : (<Text style={styles.text}>导入完成，请返回首页查看！.</Text>);
        } else if (this.state.checked && status == 'failure') {
            image = failureImage;
            button = '重新导入账单';
            statusText = (<Text style={styles.text}>信用卡认证失败，请重新认证！.</Text>);
        }
        if (loanType == 4 && this.state.checked && status == 'success' && this.props.preloanObject.data) return this._chaoHaoDaiSuccessContent();

        return (
            <ScrollView contentContainerStyle={[container, onlineStyles.container]}>
                <View style={centering}>
                    <Image style={styles.image} source={image}/>
                    {statusText}
                </View>

                { !button ? null : <ExternalPopLink
                    prePress={this.props.onHide}
                    style={[onlineStyles.btn, centering, styles.btn]}
                    textStyle={onlineStyles.btnText}
                    text={button}
                    toKey={popKey}/>
                }
            </ScrollView>
        );
    }

    _onInputChange(name, value) {
        value = typeof value == 'string' ? value.trim() : value;
        let form = this.state.form;

        form[name] = value;

        this.setState({form});
    }

    _cardChange(value) {
        let form = this.state.form;

        form.credit_card_no_auto = value;
        form.credit_card_no = value;

        this.setState({form});
    }

    _cardTip() {
        if (!this.props.preloanStatus || !this.props.preloanStatus.data) return null;
        let cards = this.props.preloanStatus.data.card_no_last_four_list;

        if (!cards || !cards.map) return null;
        return (
            <Text style={styles.tipText}>
                请上传尾号为
                { cards.map(this._cardNos.bind(this)) }
                信用卡正面照片
            </Text>
        );
    }

    _cardNos(card, index) {
        return (
            <Text key={'card' + index}>
                {index ? '或' : ''}
                <Text style={styles.cardNum}>{card}</Text>
            </Text>
        );
    }

    _chaoHaoDaiSuccessContent() {
        let status = this.props.status, loanType = this.props.loanType;
        let enable = this.state.form && this.state.form.credit_card_no_auto && this.state.form.credit_card_no;
        return (
            <ScrollView style={{flex: 1}}>
                <View style={[centering, {backgroundColor: "#fff"}]}>
                    <Image style={[styles.image, {marginTop: responsive.height(20)}]} source={successImage}/>
                    <View style={{marginTop: 10}}><Text style={{textAlign: "center"}}>恭喜您，信用卡账单导入成功，</Text></View>
                    <View style={{marginBottom: 30}}><Text style={{textAlign: "center"}}>接下来请按照要求给信用卡拍照哦！</Text></View>
                </View>
                <View style={{padding: 10}}><Text style={{fontSize: fontSize.large, color: "#666"}}>信用卡认证</Text></View>
                <View style={{backgroundColor: "#fff", padding: 8,}}>
                    <View style={{paddingVertical: 10, backgroundColor: '#fff'}}>
                        <CameraInput
                            type="bankCard"
                            onChange={this._cardChange.bind(this)}
                            label="信用卡正面"
                            example={require('assets/online/card-front.png')}
                            tracking={{
                                key: "bill",
                                topic: "card_certification",
                                entity: "add",
                                event: "clk",
                                exten_info: JSON.stringify({title: this.props.title, loantype: this.props.loanType})
                            }}/>
                        {this._cardTip()}
                    </View>

                    <View style={{paddingTop: 10, flexDirection: "row", alignItems: "center", ...border("top", 1)}}>
                        <Text>信用卡号码</Text>
                        <View style={{flex: 1}}>
                            <Input type="number" style={{
                                flex: 1,
                                textAlign: "right",
                                fontSize: fontSize.normal,
                                color: "#666",
                                paddingVertical: 1
                            }} value={this.state.form.credit_card_no}
                                   onChangeText={this._onInputChange.bind(this, 'credit_card_no')}></Input>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}></View>
                <View style={{paddingVertical: 20, paddingHorizontal: 10}}>
                    <ExternalPopLink
                        prePress={this._subCardInfos.bind(this)}
                        disabled={!enable}
                        style={[onlineStyles.btn, onlineStyles.btnOffset, !enable && onlineStyles.btnDisable]}
                        textStyle={onlineStyles.btnText}
                        text="完成提交"
                        toKey={"CertificationHome"}
                        tracking={{
                            key: 'bill',
                            topic: 'card_certification',
                            entity: "submit",
                            event: 'clk',
                            exten_info: JSON.stringify({title: this.props.title, loantype: this.props.loanType})
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

    _getBillStatus() {
        this.props.fetchingBillStatus();

        this.timeFlag = setInterval(() => this.props.fetchingBillStatus(), 5000);
        this.setState({checked: true});
    }

    _subCardInfos() {
        let loan_type = this.props.loanType;
        if (!this.state.form && this.state.form.credit_card_no_auto && this.state.form.credit_card_no) return false;
        return post("/loanctcf/check-creditcard-result", {
            loan_type,
            credit_card_no: this.state.form.credit_card_no
        }).then(response => {
            if (response.res == responseStatus.success) return true;
            alert(response.msg);
            return false;
        }).then(result => {
            if (result) return this.props.preloan && this.props.preloan();
        });
    }
}

const styles = StyleSheet.create({
    text: {
        marginVertical: 30,
        fontSize: fontSize.normal,
        color: colors.grayDark
    },
    image: {
        marginTop: responsive.height(170),
        width: responsive.width(414),
        height: responsive.height(200)
    },
    btn: {
        marginTop: responsive.height(220),
        marginHorizontal: responsive.height(65)
    },
    cardNum: {
        color: colors.primary
    },
    groupTitle: {
        backgroundColor: colors.bg
    },
    tipText: {
        marginTop: 10,
        marginBottom: 24,
        fontSize: fontSize.normal,
        color: colors.gray
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderBottomWidth: 0,
        backgroundColor: "red",
        ...border('top', 1)
    },
});

import {trackingScene} from 'high-order/trackingPointGenerator';
import actions from 'actions/online';
import chaoHaoDai from "actions/online/chaoHaoDai";
import {CertificationOutput} from 'high-order/Certification';
import { externalPush } from 'actions/navigation';

function mapStateToProps(state, ownProps) {
    // return { loanType: 0 }
    let {loanDetail} = state
    let detail = loanDetail.detail
    return {
        isFetching: state.online.bankResult.isFetching,
        loanType: state.online.loanType.type,
        title: detail.title,
        status: state.online.bankResult.status,
        preloanStatus: state.online.preloanStatus,
        preloanObject: state.online.preloan
    }
}

function mapDispatch(dispatch) {
    return {
        fetchingBillStatus: () => dispatch(actions.bankResult()),
        preloan: () => dispatch(actions.preloan()),
        externalPush: () => dispatch(externalPush()),
        unMountFetching: () => {
            dispatch(actions.preloanStatus());
            dispatch(chaoHaoDai.applyStatus());
            dispatch(chaoHaoDai.checkActiveResult());
        }
    }
}

export default connect(mapStateToProps, mapDispatch)(CertificationOutput(trackingScene(CreditCardStatus)));
