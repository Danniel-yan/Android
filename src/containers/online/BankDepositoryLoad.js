import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import actions from 'actions/online';
import { externalPush } from 'actions/navigation';

class BankDepositoryLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            depositoryInfo: props.info
        }
    }

    componentDidMount() {
        this.props.fetching(this.state.depositoryInfo.mobile, this.state.depositoryInfo.bank_card_no);
    }

    // {/*componentWillReceiveProps(nextProps) {*/}
    //     {/*if (!nextProps.isFetching) {*/}
    // //         console.log(nextProps.depositoryCreate);
    // //         let head = nextProps.depositoryCreate.gatewayRequestHead;
    // //         var uri = "", method = "POST", body = "";
    // //         console.log(head);
    // //         for (var key in head) {
    // //             if (key == 'gatewayUrl') {
    // //                 uri = head[key];
    // //             } else {
    // //                 body = body + key + "=" + head[key] + "&";
    // //             }
    // //         }
    // //         console.log(uri);
    // //         console.log(body);
    // //         this.props.externalPush({web: {uri: uri, method: method, body: body}, title: "激活", backRoute: null})
    // //     }
    // // }

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.content}>
                    <View style={styles.imgborder}>
                        <Image style={styles.img} source={require('assets/online/ic_bank_chaoshi.png')}/>
                    </View>
                    <Image style={styles.load} source={require('assets/online/ic_bank_load.gif')}/>
                    <View style={styles.imgborder}>
                        <Image style={styles.img} source={require('assets/online/ic_bank_xiamen.png')}/>
                    </View>
                </View>
                <View style={styles.textcontent}>
                    <Text style={styles.text}>正在前往厦门银行</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff',
        flex: 1
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90
    },
    imgborder: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6E6E6'
    },
    img: {
        width: 36,
        height: 36
    },
    load: {
        alignItems: 'center'
    },
    textcontent: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    text: {
        color: '#000',
        fontSize: 18
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.online.depositoryCreate.isFetching,
        depositoryCreate: state.online.depositoryCreate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetching: (moblie, bank_card_no) => {
            dispatch(actions.depositoryCreate(dispatch, moblie, bank_card_no))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankDepositoryLoad)