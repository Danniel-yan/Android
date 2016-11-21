import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';

export default class LoanList extends Component {
  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.loans)

    return (
      <View style={{height:150}}>
        <ListView
          contentContainerStyle={[styles.listView, styles.flexRow,styles.bgColorWhite]}
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={this.renderLoan}
        />
      </View>
    )
  }

  renderLoan(data){
    return(
      <View>
        <View style={styles.flexContainerColumn}>
          <Text style={styles.flexContainerColumnTitle}>
            {data.name}
          </Text>
          <Image source={{uri: data.thumbnail}} style={{width:50,height:50,marginTop:10,marginBottom:10}} />
          <Text style={styles.flexContainerColumnDes}>
            <Text style={styles.flexContainerColumnPrimary}>{data.rate}</Text>费率
          </Text>
          <Text style={styles.flexContainerColumnDes}>
            <Text style={styles.flexContainerColumnPrimary}>{data.rate}</Text>万贷款
          </Text>
        </View>
      </View>
    )
  }

}
