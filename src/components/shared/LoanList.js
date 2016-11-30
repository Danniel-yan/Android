import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';
import { colors } from 'styles/varibles';
import Text from 'components/shared/Text';
import styles from 'styles/loan';

import { ExternalPushLink } from 'containers/shared/Link';

export default class LoanList extends Component {
  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.loans)

    return (
      <View>
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
      <ExternalPushLink title={data.title} toKey="LoanDetailScene" componentProps={{fetchingParams: data.id }} >
        <View>
          <View style={styles.flexContainerColumn}>
            <Text style={styles.flexContainerColumnTitle}>
              {data.title}
            </Text>
            <Image source={{uri: data.logo_list}} style={{width:50,height:50, marginBottom: 8}} />
            <Text style={styles.flexContainerColumnDes}>
              <Text style={styles.flexContainerColumnPrimary}>{data.interest}</Text>费率
            </Text>
            <Text style={styles.flexContainerColumnDes}>
              <Text style={styles.flexContainerColumnPrimary}>{data.amnout_showinfo}</Text>万贷款
            </Text>
          </View>
        </View>
      </ExternalPushLink>
    )
  }

}
