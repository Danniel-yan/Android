import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import actions from 'actions/online';
import {externalPush} from 'actions/navigation';
import BankLoading from 'components/shared/BankLoading';

class BankDepositoryLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            depositoryInfo: props.info,
            success: props.success,
            fail: props.fail
        }
    }

    render() {
        return this.props.isFetching ? <BankLoading/> : null
    }

    componentDidMount() {
        this.props.fetching(this.state.depositoryInfo.mobile, this.state.depositoryInfo.bank_card_no, this.state.success, this.state.fail);
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.online.depositoryCreate.isFetching,
        depositoryCreate: state.online.depositoryCreate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetching: (mobile, bank_card, success, fail) => {
            dispatch(actions.depositoryCreate(mobile, bank_card, success, fail))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankDepositoryLoad)