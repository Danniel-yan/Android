import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {FormGroup, HorizontalRadios, VerticalRadios, HorizontalCheckboxes} from "components/FormGroup";

// import FastLoanRecommendList from 'containers/scene/home/RecommendListContainer';
import {RecList, MoreList} from 'containers/scene/fast/ListContainer';

import {colors} from 'styles/varibles';
import {container, rowContainer, flexRow, centering, bg} from 'styles';
import tracker from 'utils/tracker.js';
import Input from 'components/shared/Input';
import Picker from 'components/shared/Picker';
import Button from 'components/shared/ButtonBase';

import Dimensions from 'Dimensions';
import SceneHeader from 'components/shared/SceneHeader';
import {trackingScene} from 'high-order/trackingPointGenerator';

const jobItems = [
    {label: "上班族", value: 1},
    {label: "企业主", value: 2},
    {label: "学生", value: 4},
    {label: "自由职业", value: 8}
];

var screenWidth = Dimensions.get('window').width;
import validators from 'utils/validators';

let formater100000 = validators.maxNumFormater(100000);

class FastLoanScene extends Component {
    tracking = 'loan'

    constructor(props) {
        super(props);
        this.state = {
            fetchRecParams: {
                amount: props.amount || 5000,
                period: props.period || 12,
                job: 0,
                reslist: props.selectIndex ? [props.selectIndex] : [],
                order: 1
            },
            isFetchingRec: true,
            toggleFilter: false,
            toggleSort: false
        };

        props.landing && props.landing({key: 'loan'});
    }

    static title = "极速贷款";

    formValueChanged(name, value) {
        if (this.state.fetchRecParams[name] === value) return;

        this.setState({
            fetchRecParams: Object.assign({}, this.state.fetchRecParams, {[name]: value})
        }, () => {
            clearTimeout(this.fetchingTimer);

            this.fetchingTimer = setTimeout(() => {
                this.fetchingData();
            }, 500);
        });
    }

    resListSelected(resList) {
        var valueList = [];
        resList && resList.length > 0 && resList.map(res => valueList.push(res.value));
        this.formValueChanged("reslist", valueList);
        this.onToggleDrp("toggleFilter");

        tracker.trackAction({
            key: 'loan',
            entity: 'filter_complete',
            topic: 'complete',
            event: 'clk',
            filter: resList.map(item => item.label).join(',')
        });
    }

    orderSelected(opt) {
        tracker.trackAction({key: 'loan', topic: 'sort', entity: opt.label, event: 'clk'});
        this.formValueChanged("order", opt.value);
        this.onToggleDrp("toggleSort");
    }

    onToggleDrp() {
        var origValue = this.state.toggleSort;
        this.state.toggleFilter = this.state.toggleSort = false;
        this.state.toggleSort = !origValue;
        this.setState({toggleFilter: this.state.toggleFilter, toggleSort: this.state.toggleSort});
    }

    render() {
        var halfWidth = screenWidth / 2;

        return (
            <View style={[bg, {flex: 1}]}>
                {!this.props.onBack ? <SceneHeader title="极速贷款" right={ImageComponent} onToggleDrp={this.onToggleDrp.bind(this)}/> : null}

                <View style={{position: "relative", flexDirection: "row"}}>
                    <View style={{zIndex: -5, borderTopColor: colors.line, flex: 1}}>
                        <ScrollView>
                            <RecList itemTracking={{key: 'loan', topic: 'rec_loan_list'}}/>
		    	    <View style={{height: 50}}>
			    </View>		    
			</ScrollView>
                    </View>
                    <View style={{
                        position: "absolute",
                        overflow: "hidden",
                        left: screenWidth / 2,
                        zIndex: 3,
                        width: screenWidth / 2,
                        height: !this.state.toggleSort ? 0 : null
                    }}>
                        <VerticalRadios options={[{label: "默认", value: 1}, {label: "放款速度快", value: 2}]}
                                        selectedChanged={idx=> {
                                            this.orderSelected(idx);
                                        }}></VerticalRadios>
                    </View>
                </View>

            </View>
        );
    }


    _renderLoanGroup() {
        return (
            <View style={styles.formGroup}>
                <View style={[rowContainer, styles.inputGroup]}>
                    <Text>金额</Text>
                    <View style={[rowContainer, centering, styles.inputWrap]}>
                        <Input
                            keyboardType="numeric"
                            tracking={{
                                key: 'loan',
                                topic: 'top',
                                entity: 'amount',
                                event: 'blur',
                                amount: this.state.fetchRecParams.amount
                            }}
                            value={this.state.fetchRecParams.amount + ''}
                            style={[container, styles.formField]}
                            onChangeText={(text) => {
                                this.formValueChanged("amount", formater100000(text));
                            }}></Input>
                        <Text style={styles.formFieldText}>元</Text>
                    </View>
                </View>

                <View style={[rowContainer, styles.inputGroup]}>
                    <Text>期数</Text>
                    <View style={[rowContainer, centering, styles.inputWrap]}>
                        <Picker
                            tracking={{
                                key: 'loan',
                                topic: 'top',
                                entity: 'period',
                                event: 'blur',
                                period: this.state.fetchRecParams.period
                            }}
                            style={container}
                            value={this.state.fetchRecParams.period}
                            textStyle={styles.formPickerText}
                            onChange={this.formValueChanged.bind(this, 'period')}
                            items={[{value: "1", label: "1"}, {value: "3", label: "3"}, {value: "6", label: "6"},
                                {value: "9", label: "9"}, {value: "12", label: "12"}, {value: "15", label: "15"},
                                {value: "24", label: "24"}, {value: "36", label: "36"}]}></Picker>
                        <Text style={styles.formFieldText}>个月</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderDropDownFilters() {
        var applyResList = [];
        this.props.apply_res_list && this.props.apply_res_list.map((item)=> {
            item && applyResList.push({label: item.name, value: item.key});
        });
        return (
            <View style={{marginTop: 5, position: "relative", flexDirection: "row"}}>
                <Button
                    tracking={{key: 'loan', topic: 'filter', entity: ''}}
                    style={styles.dropButton}
                    onPress={()=>this.onToggleDrp("toggleFilter")}>
                    <Text style={{fontSize: 16, color: "#333"}}>筛选</Text><Image resizeMode="stretch"
                                                                                style={styles.dropIcon}
                                                                                source={require('assets/icons/arrow-down.png')}/>
                </Button>

                <View style={[{
                    position: "absolute",
                    overflow: "hidden",
                    left: 0,
                    top: 31,
                    right: 0,
                    zIndex: 3,
                    paddingTop: 10
                }, !this.state.toggleFilter ? {paddingTop: 0, height: 0} : {}]}>
                    <HorizontalCheckboxes
                        selectedIdxes={this.state.fetchRecParams.reslist}
                        withBtns={true}
                        options={applyResList}
                        eachLineCount={3}
                        onReset={() => {
                            tracker.trackAction({key: 'loan', topic: 'filter_reset', entity: 'reset', event: 'clk'});
                        }}
                        selectedSubmit={(selectedIdxes) => this.resListSelected(selectedIdxes)}>
                    </HorizontalCheckboxes>
                </View>

                <Button
                    tracking={{key: 'loan', topic: 'sort', entity: ''}}
                    style={styles.dropButton}
                    onPress={()=>this.onToggleDrp("toggleSort")}>
                    <Text style={{fontSize: 16, color: "#333"}}>排序</Text><Image resizeMode="stretch"
                                                                                style={styles.dropIcon}
                                                                                source={require('assets/icons/arrow-down.png')}/>
                </Button>

                <View style={{
                    position: "absolute",
                    overflow: "hidden",
                    left: screenWidth / 2,
                    top: 41,
                    zIndex: 3,
                    width: screenWidth / 2,
                    height: !this.state.toggleSort ? 0 : null
                }}>
                    <VerticalRadios options={[{label: "默认", value: 1}, {label: "放款速度快", value: 2}]}
                                    selectedChanged={idx=> {
                                        this.orderSelected(idx);
                                    }}></VerticalRadios>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.props.fetching && this.props.fetching();
        // console.log("CMPONENTDIDMOUNT");
        this.props.fetchingList && this.props.fetchingList(this.state.fetchRecParams);
        // this.fetchingData();
    }

    fetchingData() {
        // this.props.fetchingList && this.props.fetchingList(this.state.fetchRecParams);
        this.props.reFetchingList && this.props.reFetchingList(this.state.fetchRecParams);
    }
}

function ImageComponent(props) {
    return (
        <TouchableOpacity style={{paddingLeft: 10, paddingRight: 10}} onPress={()=>{
            props.onToggleDrp && props.onToggleDrp();
            tracker.trackAction({key: 'loan', topic: 'sort', entity: ''})
        }}>
            <Image style={{width: 20, height: 20}}
                   source={require('assets/icons/icon_sort.png')}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    formGroup: {
        paddingVertical: 10,
        flexDirection: 'row',
        height: 46,
        backgroundColor: '#fff'
    },
    inputGroup: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    inputWrap: {
        paddingHorizontal: 10,
        backgroundColor: '#F2F2F2',
        marginHorizontal: 10,
        height: 26,
        borderRadius: 18
    },
    formField: {
        fontSize: 17,
        color: '#333',
        textAlign: 'center'
    },
    formPickerText: {
        color: '#333',
        fontSize: 17,
    },
    formFieldText: {
        fontSize: 12,
        color: '#666'
    },
    dropButton: {
        flex: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    title: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    bgColorWhite: {
        backgroundColor: colors.white
    },
    titleLeft: {
        fontSize: 14,
        flex: 1,
        fontSize: 16,
        color: colors.fontColorSecondary
    },
    dropIcon: {
        width: 10,
        height: 6,
        marginLeft: 2
        // backgroundColor: "gray"
    }
})

export default trackingScene(FastLoanScene)
