import React, { Component } from 'react';
import {ScrollView, View, Image ,StyleSheet } from 'react-native';

import Text from 'components/shared/Text';
import { colors } from 'styles/varibles';

import ScrollPagination from 'components/shared/ScrollPagination';

export default class CardListScene extends Component {

  render() {

    let { isPaging, pagination, paginationParams, nomore } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3'}}>
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
                  <Text style={{marginBottom:12}}>{cardList.info}</Text>
                  <Text><Text style={{color:'#ff6d17'}}>{cardList.num}</Text>人申请</Text>
                </View>
              </View>
          )
          }
        </ScrollPagination>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  list: {
    backgroundColor:'#fff',
    paddingTop:20,
    paddingBottom:20,
    paddingLeft:15,
    paddingRight:15,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderStyle : 'solid',
    borderBottomColor: colors.line,
    marginTop:5
  },
  logo:{
    width:128,
    height:80,
    marginRight:15
  },
  name:{
    color:'#333',
    fontSize:17,
    marginBottom:5
  }
})