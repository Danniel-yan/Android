import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ScrollView, View, Image ,StyleSheet } from 'react-native';
import {colors, fontSize} from 'styles/varibles';
import Text from 'components/shared/Text';
import * as defaultStyles from 'styles';

import ScrollPagination from 'components/shared/ScrollPagination';
import { ExternalPushLink } from 'containers/shared/Link';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import paginationCardList from 'actions/scene/card/cardList'

import styles from './cardStyles';

class BankCardListScene extends Component {

    render() {

        let { isPaging, pagination, paginationParams, nomore } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3'}}>
                <ScrollPagination
                    isPaging={isPaging}
                    paginationParams={paginationParams}
                    pagination={pagination}
                    nomore={nomore}>

                    { this.props.cardList.map((cardList, index) =>

                        <View key={'key' + index } style={[styles.list,{paddingVertical:16}]}>
                            <Image source={{uri: cardList.pic_card}} style={styles.cardLogo}/>
                            <View style={{flex: 1}}>
                                <Text
                                    style={[styles.mb5,{fontSize:fontSize.seventeen, color:colors.fontColorSecondary}]}>{cardList.name}</Text>
                                <Text style={{fontSize:fontSize.thirteen}}>{cardList.info}</Text>
                            </View>
                            <View style={styles.applyBtn}>
                                <ExternalPushLink title="申请信用卡" web={cardList.link}><Text
                                    style={{color:colors.secondary,fontSize:fontSize.thirteen}}>立即申请</Text></ExternalPushLink>
                            </View>
                        </View>
                    )
                    }

                </ScrollPagination>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return state.cardList
}

function mapDispatchToProps(dispatch) {
    return {
        fetching: offset => dispatch(paginationCardList(offset)),
        pagination: offset => dispatch(paginationCardList(offset))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, BankCardListScene))
