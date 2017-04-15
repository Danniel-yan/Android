import React, { Component } from 'react';
import {
    View, Text, Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

import { get, responseStatus } from 'utils/fetch';
import Loading from 'components/shared/Loading';

export default class BillDetail extends Component {
    constructor(props) {
        super(props);
        this.billId = props ? props.billId : null;
        this.bankName = props ? props.bankName : null;
        this.bankLogo = props ? props.bankLogo : null;
        this.userName = props ? props.userName : null;
        this.userCardNo = props ? props.userCardNo : null;
        this.state = {
            fetched: false,
            billData: null,
            error: null,
            selectedDetailIdxes: []
        }
    }

    componentDidMount() {
        var p = this.props, type = p.type || "bank_wap", id = p.billId;
        get(`/bill/bill-detail?type=${type}&id=${id}`).then(rsp => {
            // console.log(rsp);
            if (rsp.res != responseStatus.success) {
                this.setState({fetched: true, error: "出错"});
                return;
            }
            ;
            this.setState({fetched: true, error: null, billData: rsp.data});
        });
    }

    renderCardHeader(card) {
        var bill = this.state.billData ? this.state.billData.data : null;
        if (!bill) return null;
        //var sF = function(a, b) { return a["bill_month"] > b["bill_month"] };
        var bills = card.bills && card.bills.length > 0 ?
            card.bills : null, freeday = card.freeday;
        // console.log(bills);
        if (!bills) return null;

        var bankName = bill.bank_name || this.bankName,
            userName = bill.person_name || this.userName,
            userCardNo = bill.id_no || this.userCardNo,

            lastestBill = bills[0], billByUnit = lastestBill.bill_by_unit,
            rmbBill = billByUnit && billByUnit.length > 0 ? billByUnit.find(b => b.due_unit == "rmb") : null;

        var billAmount = rmbBill ? rmbBill.due_amount : null;

        return (

            <View>
                <BillHeader bankLogo={this.bankLogo} bankName={bankName} userName={userName} userCardNo={userCardNo}
                            billAmount={billAmount}/>
                <View
                    style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 5, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#f2f2f2", backgroundColor: "white"}}>
                    <View style={{flex: 1,  alignItems: "center", borderRightWidth: 1, borderRightColor: "#f2f2f2"}}>
                        <Text style={{fontSize: 16, color: "#333"}}>{lastestBill.billing_date.split(" ")[0]}</Text>
                        <Text style={{color: "#666",marginTop: 6}}>出账日期</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "center", borderRightWidth: 1, borderRightColor: "#f2f2f2"}}>
                        <Text style={{fontSize: 16, color: "#333"}}>{freeday}天</Text>
                        <Text style={{color: "#666",marginTop: 6}}>刷卡免息</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={{fontSize: 16, color: "#333"}}>{this.state.billData.data.cards.limit_rmb}元</Text>
                        <Text style={{color: "#666",marginTop: 6}}>可用额度</Text>
                    </View>
                </View>
            </View>
        );

    }

    renderBillList(card) {
        var bills = card.bills && card.bills.length > 0 ?
            card.bills : null;
        if (!bills) return null;

        return (
            <ScrollView>
                <View style={{marginTop: 6, backgroundColor: "white"}}>
                    {
                        bills && bills.length > 0 && bills.map((bill, idx) => {
                            var billByUnit = bill.bill_by_unit,
                                rmbBill = billByUnit && billByUnit.length > 0 ? billByUnit.find(b => b.due_unit == "rmb") : null,
                                billDetail = rmbBill ? rmbBill.bill_detail : null,
                                detailOpen = this.state.selectedDetailIdxes.includes(idx);
                            return (
                                <View key={idx} style={{borderBottomWidth: 1, borderBottomColor: "#f2f2f2"}}>
                                    <TouchableWithoutFeedback onPress={() => { this.toggleDetailList(idx) }}>
                                        <View
                                            style={{flexDirection: "row", alignItems: "center", padding: 10, paddingVertical: 20}}>
                                            <View style={{flex: 1}}>
                                                <Text
                                                    style={{fontSize: 18, color: "#333"}}>{bill.bill_month.split("-")[1]}月</Text>
                                                <Text
                                                    style={{color: "#666",marginTop: 4}}>{bill.bill_month.split("-")[0]}年</Text>
                                            </View>
                                            <View style={{}}>
                                                <Text
                                                    style={{fontSize: 18, color: "#333"}}>{rmbBill && rmbBill.due_amount ? "¥" + rmbBill.due_amount : ""}</Text>
                                            </View>
                                            { !detailOpen ?
                                                <Image source={require("assets/icons/triangle-down.png")}
                                                       style={{marginLeft: 10}}/> :
                                                <Image source={require("assets/icons/triangle-up.png")}
                                                       style={{marginLeft: 10}}/>
                                            }
                                        </View>
                                    </TouchableWithoutFeedback>
                                    { !detailOpen ? null : (
                                        <View>
                                            {
                                                billDetail && billDetail.length > 0 && billDetail.map((detail, idx) => {
                                                    return (
                                                        <View key={"d"+idx}
                                                              style={{backgroundColor: "#e6e6e6", flexDirection: "row",
                            alignItems: "center", padding: 10, paddingVertical: 20,
                            borderBottomWidth: 1, borderBottomColor: "#f0f0f0"}}>
                                                            <View style={{marginRight: 10}}><Text
                                                                style={{color: "#666"}}>{detail.trade_date.split(" ")[0]}</Text></View>
                                                            <View style={{flex: 1}}><Text
                                                                style={{color: "#666"}}>{detail.trade_name || detail.trade_remark}</Text></View>
                                                            <View style={{marginLeft: 10}}><Text
                                                                style={{color: "#333"}}>¥{detail.trade_amount || detail.posting_amount}</Text></View>
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>
                                    ) }

                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }

    renderBillDetail() {
        var cards = this.state.billData.data.cards;

        return cards ? (
            <View>
                { this.renderCardHeader(cards) }
                { this.renderBillList(cards) }
            </View>
        ) : null;
    }

    render() {
        var s = this.state;
        return !this.state.fetched ? <Loading></Loading> : (
            <View>
                { this.renderBillDetail() }
            </View>
        );
    }

    toggleDetailList(idx) {
        var idxPosition = this.state.selectedDetailIdxes.indexOf(idx)
        if (idxPosition > -1) {
            this.state.selectedDetailIdxes.splice(idxPosition, 1)
        }
        else {
            this.state.selectedDetailIdxes.push(idx)
        }
        ;

        this.setState({selectedDetailIdxes: this.state.selectedDetailIdxes});
    }
}

function BillHeader({ bankLogo, bankName, userName, userCardNo, billAmount }) {
    return (
        <View style={{flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "white"}}>
            <Image source={{uri: bankLogo}} style={{width: 40, height: 40, marginRight: 10, borderRadius: 20}}></Image>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
                <View><Text style={{fontSize: 20, color: "#333"}}>{bankName} {userName}</Text></View>
                <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}><Text style={{color: "#666"}}>尾号{userCardNo}</Text></View>
            </View>
            <View style={{ justifyContent: "center", flex: 1, alignItems: "flex-end" }}>
                <View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontSize: 14}}>¥</Text><Text
                    style={{fontSize: 20, color: "#333", textAlign: "right"}}>{billAmount ? billAmount : ""}</Text></View>
                <View style={{flexDirection: "row", marginTop: 10, flex: 1}}><Text
                    style={{textAlign: "right", flex: 1, color: "#666"}}>本期账单</Text></View>
            </View>
        </View>
    );
}
