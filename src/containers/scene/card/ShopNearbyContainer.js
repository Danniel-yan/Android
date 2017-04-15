import React, { Component } from 'react';
import { Image, View, ListView , StyleSheet, TouchableOpacity, TouchableHighlight, RefreshControl} from 'react-native';

import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import paginationShopNearby from 'actions/scene/card/shopNearby';

import { colors, fontSize } from 'styles/varibles';
import Dimensions from 'Dimensions'
import * as defaultStyle from 'styles';

import Text from 'components/shared/Text'
import RemoteImage from 'components/shared/RemoteImage'
import NextIcon from 'components/shared/NextIcon'

import triangleDown from 'assets/icons/triangle-down.png';
import triangleUp from 'assets/icons/triangle-up.png';
import Button from 'components/shared/ButtonBase';

import {ExternalPushLink} from 'containers/shared/Link';

import styles from './cardStyles';

class ShopNearbyScene extends Component {

    state = {
        isFetching: this.props.isFetching
    }

    render() {

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(this.props.shopNearby)

        if (this.props.geoError) {
            return (
                <View style={[styles.bgColorWhite, styles.empty, defaultStyle.centering]}>
                    <Image style={{width:195,height:195}} source={require('assets/icons/position.png')}/>
                    <TouchableOpacity style={styles.positionText} onPress={this.props.fetching()}>
                        <Text>重新定位</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <ListView
                enableEmptySections={true}
                dataSource={dataSource}
                renderRow={this.renderShopNearbyList}
            />
        )
    }

    renderShopNearbyList(data, sectionID, rowID) {
        return (
            <View style={styles.flexColumn}>
                <List {...data} rowID={rowID}/>
            </View>
        )
    }
}

class List extends Component {
    state = {
        isShow: true
    }

    render() {
        let props = this.props;
        return (
            <View>
                <Button
                    tracking={{key: 'card', topic: 'featured_activity', entity: props.rowID}}
                    style={[styles.flexContainerRow,styles.bgColorWhite]}
                    onPress={()=>{this.setState({ isShow: !this.state.isShow})}}
                >
                    <RemoteImage uri={props.logo_url} style={styles.shopLogo}/>
                    <View style={styles.rightContainer}>
                        <Text style={styles.rightContainerTitle}>{props.shop_name}</Text>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text
                                    style={[styles.rightContainerSubTitle,{fontSize:fontSize.thirteen}]}>{parseFloat(props.dis).toFixed(2)}
                                    米</Text>
                            </View>

                            {this.renderLength(props)}

                        </View>

                    </View>
                </Button>

                {this.renderTriangle(props)}

            </View>
        )
    }

    renderLength(props) {

        if (!props.act || props.act.length == 0) return null

        return (
            <Button
                tracking={{key: 'card', topic: 'featured_activity_extend', entity: props.rowID}}
                style={{flexDirection: 'row',alignItems:'center'}}
                onPress={()=>{this.setState({ isShow: !this.state.isShow})}}>
                <View>
                    <Text
                        style={{fontSize:fontSize.thirteen,color:colors.fontColorPrimary}}>有{props.act.length}条活动</Text>
                </View>
                <View style={{alignItems: 'flex-end',marginLeft:5}}>
                    <Image source={this.state.isShow ? triangleDown: triangleUp }/>
                </View>
            </Button>
        )
    }

    renderTriangle(props) {

        if (this.state.isShow) {
            return null
        }
        return (
            <View>
                {
                    props.act && props.act.map((act, index) =>
                        <ExternalPushLink key={'key' + index} title="活动详情" toKey="ActHotDetailScene"
                                          componentProps={{fetchingParams : act.act_id }}>
                            <View style={[styles.flexContainerRow,styles.bgColorWhite,styles.nearByList]}>
                                <View
                                    style={(act.discount[0].name_en == 'decrease_price') ? styles.decrease_price : styles.discount }>
                                    <Text style={{color:'#fff',fontSize:16}}>{act.discount[0].name}</Text>
                                </View>
                                <View style={{flex:8}}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={{fontSize:16,color:colors.fontColorPrimary, height: 22, lineHeight: 22}}>{act.title}</Text>
                                </View>
                                <View style={styles.flexEnd}>
                                    <NextIcon/>
                                </View>
                            </View>
                        </ExternalPushLink>
                    )
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return state.shopNearby
}

function mapDispatchToProps(dispatch) {
    return {
        fetching: offset => dispatch(paginationShopNearby(offset)),
        pagination: offset => dispatch(paginationShopNearby(offset))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ShopNearbyScene))
