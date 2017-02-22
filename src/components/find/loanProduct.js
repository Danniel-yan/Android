import React, { Component } from 'react';
import {
  View,
  ListView,
  Image,
  Platform,
  StyleSheet
} from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';
import { colors, responsive, textVerticalCenter } from 'styles';

import { ExternalPushLink } from 'containers/shared/Link';

export default class loanProduct extends Component {

  static default = {
    loanProductList : []
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.loanProductList)

    return (
      <View>
        <ListView
          contentContainerStyle={[styles.listView, styles.flexRow]}
          enableEmptySections={true}
          dataSource={dataSource}
          horizontal={true}
          renderRow={this.renderCard.bind(this)}
          showsHorizontalScrollIndicator={false}
          />
      </View>
    )
  }

  renderCard(data, sID, rowID){
    let tracking = Object.assign({}, this.props.itemTracking, {
      entity: rowID,
      event: 'clk',
      id: data.id,
      name: data.name
    });

    return(
      <ExternalPushLink
        tracking={tracking}
        title={data.title}
        toKey="LoanDetailScene"
        componentProps={{fetchingParams: data.id, ...data }}>
        <View style={[boxStyles.box]}>
          <Image source={{uri: data.logo_list}} style={boxStyles.boxPic} />
          <View>
            <Text style={boxStyles.title}>
              {data.title}
            </Text>
            <View style = {{flexDirection : 'row'}}>
             <Text style = {{color : '#FF6D17',fontSize : 12}}>{data.interest}／{data.interest_period}<Text style = {{color : '#333', fontSize : 12}}>费率</Text></Text>
            </View>
          </View>
        </View>
      </ExternalPushLink>
    )
  }

}

const boxStyles = StyleSheet.create({
    box : {
      width : 115,
      height : 122,
      // borderRightWidth : 1,
      // borderRightColor : '#E6E6E6',
      justifyContent: 'center',
      alignItems:'center',
      marginRight : 1,
      backgroundColor : '#FFF',
    },
    boxPic : {
      width : 50,
      height : 50,
      marginBottom : 10
    },
    title : {
      fontSize : 15,
      color : '#333',
      textAlign : 'center',
      marginBottom : 5
    },

});
