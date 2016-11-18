import React from 'react';
import {
    View, Text
} from 'react-native';
import { connect } from 'react-redux';

import { fetchBannerImgList } from 'actions/scene/home/bannerImgList'

import AsynCpGenerator from 'components/shared/AsynCpGenerator';
import BannerCarousel from 'components/BannerCarousel';

function mapStateToProps(state) {
    return state.bannerImgList;
}

function mapDispatchToProps(dispatch) {
    return {
        fetchBannerImgList: () => dispatch(fetchBannerImgList())
    }
}

class LoadingEle extends React.Component {
    render() {
        return (<View><Text>Loading.....</Text></View>);
    }
}

class Banner extends React.Component {
    componentDidMount() {
      this.props.fetchBannerImgList();
    }
    render() {
        return React.createElement(AsynCpGenerator(LoadingEle, BannerCarousel), this.props);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
