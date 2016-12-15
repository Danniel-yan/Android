import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet } from 'react-native';
import Text from 'components/shared/Text';

import { ExternalPushLink } from 'containers/shared/Link';

import dateBackground from 'assets/icons/date_background.png'

import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchActHot } from 'actions/scene/card/actHot';

import styles from './cardStyles';

class ActHotScene extends Component {
  render(){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.actHot)

    return(
      <View style={[styles.bgColorWhite,{position:'relative'}]}>
        <Image style={styles.topic} source={dateBackground} >
          <Text style={styles.topicText}>{new Date().getMonth()+1}.{new Date().getDate()}</Text>
        </Image>

        <ListView
          contentContainerStyle={[styles.flexRow]}
          enableEmptySections={true}
          dataSource={dataSource}
          horizontal={true}
          renderRow={this.renderBanner}
          showsHorizontalScrollIndicator={false}
          />
      </View>
    )
  }

  renderBanner(data){
    let bankName = data.banks[0] && data.banks[0].name;

    return(
      <View style={[styles.flexHorizontalColumn]}>
        <ExternalPushLink
          tracking={{key: 'card', topic: 'rotation', entity: 'promotion', title: data.title, bank_name: bankName}}
          title="活动详情"
          toKey="ActHotDetailScene"
          componentProps={{fetchingParams: data.id }}>
          <Image source={{uri: data.img_banner.x3}} style={styles.cardPic}>
            <Text style={[styles.bankName,{color:'#' + data.font_color}]}>{bankName}</Text>
            <Text style={[styles.actTitle,{color:'#' + data.font_color}]}>{data.title}</Text>
          </Image>
        </ExternalPushLink>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return state.actHot;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: num => dispatch(fetchActHot( num = 8 ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ActHotScene));
