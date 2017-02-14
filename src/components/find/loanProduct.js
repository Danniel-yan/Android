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
          <Text style={boxStyles.title}>
            {data.title}
          </Text>
           <Text>
              {data.interest}／{data.interest_period}费率
           </Text>
        </View>
      </ExternalPushLink>
    )
  }

}

const boxStyles = StyleSheet.create({
  box: {
    marginVertical: 5,
    marginLeft: 5,
    width: responsive.width(220),
    height: responsive.width(300),
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom : 15,
    marginTop : 1
  },

  boxPic: {
    width: responsive.width(200),
    height: responsive.width(200),
    marginTop: 30
  },

  title: {
    ...textVerticalCenter(responsive.height(64)),
    fontSize:16,
    color:colors.fontColorSecondary,
  }
});
