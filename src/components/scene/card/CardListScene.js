import React, { Component } from 'react';
import {ScrollView, View, Image ,StyleSheet } from 'react-native';

import Text from 'components/shared/Text';
import * as defaultStyles from 'styles';

import ScrollPagination from 'components/shared/ScrollPagination';

export default class CardListScene extends Component {

  render() {
    let { isPaging, pagination, paginationParams, nomore } = this.props;

    return (
      <ScrollPagination
        isPaging={isPaging}
        paginationParams={paginationParams}
        pagination={pagination}
        nomore={nomore}>

        { this.props.cardList.map((cardList,index) =>

            <View key={'key' + index } style={styles.list}>
              <Image source={{uri: cardList.pic_card}} style={styles.logo}/>
              <View style={{flex: 1}}>
                <Text style={styles.name}>{cardList.name}</Text>
                <Text style={styles.info}>{cardList.info}</Text>
              </View>
              <View style={styles.applyBtn}>
                <Text style={{color:'#ffaf32',fontSize:13}}>立即申请</Text>
              </View>
            </View>
        )
        }

      </ScrollPagination>
    )
  }

}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    margin: 5,
    padding:16,
    flexDirection: 'row',
    borderRadius: 5
  },
  logo:{
    width:40,
    height:40,
    marginRight:16,
    marginTop:5
  },
  name:{
    color:'#333',
    fontSize:17,
    marginBottom:5
  },
  info:{
    fontSize:13
  },
  applyBtn:{
    borderColor:'#ffaf32',
    borderWidth:1,
    width:60,
    height:22,
    borderRadius:2,
    alignItems:'center',
    marginTop:5
  }
})