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
