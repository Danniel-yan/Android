import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import * as dstyles from 'styles';
import { fetchCategory } from 'actions/scene/home/categoryList';
import paginationCardList from 'actions/scene/card/cardList'
import CardPanel from 'components/CardPanel';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import ScrollPagination from 'components/shared/ScrollPagination';
import Loading from 'components/shared/Loading';
import { trackingScene } from 'high-order/trackingPointGenerator';


import Button from 'components/shared/ButtonBase';

class CardListByCategory extends Component {

  tracking() {
    let name = this._selectedCategory().name;

    return {
      key: 'card',
      topic: 'type_list',
      card_type: name
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    }
  }

  componentDidMount() {
    this.props.paginationCard({
      offset: 0,
      bankid: 0,
      categoryid: this.props.selected || 1
    });
  }

  render() {
    return (
      <View style={dstyles.container}>
        {this._renderTabHeader()}

        <View style={dstyles.container}>
          {this._renderContent()}
        </View>
      </View>
    )
  }

  _renderContent() {
    let { paginationCard } = this.props;
    let { isFetching, isPaging, paginationParams, nomore } = this.props.cardList;

    if(isFetching) {
      return <Loading/>;
    }

    let typeName = this._selectedCategory().name
    let Scroll = this.props.cardList.cardList.length < 10 ? ScrollView : ScrollPagination;

    return (
      <Scroll
        isPaging={isPaging}
        paginationParams={paginationParams}
        pagination={paginationCard}
        nomore={nomore}>
        {
          this.props.cardList.cardList.map((card, index) => {
            return (
              <ExternalPushLink
                tracking={{key: 'card', topic: 'type_list_card_list', entity: index, card_name: card.name, type: typeName }}
                title="申请信用卡"
                key={"card"+index}
                web={card.link}
                >
                <View style={[dstyles.rowContainer, dstyles.centering, styles.row ]}>
                  <CardPanel {...card} style={styles.cardPanel}/>
                  <NextIcon/>
                </View>
              </ExternalPushLink>
            );
          })
        }
      </Scroll>
    );
  }

  _renderTabHeader() {
    let selected = this.state.selected;

    let children = this.props.category.map((category, index) => {
      return (
        <Button
          key={'category' + index}
          style={styles.tabBtn}
          onPress={this._onTabChange.bind(this, category.id)}
          textStyle={[styles.tabBtnText, category.id == selected && styles.tabBtnTextSelected]}
          text={category.name}
        />
      );
    })

    return (
      <View style={styles.header}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {children}
        </ScrollView>
      </View>
    );
  }

  _onTabChange(selected) {
    this.setState({ selected });
    this.props.paginationCard({
      offset: 0,
      bankid: 0,
      categoryid: selected 
    });
  }

  _selectedCategory() {
    return this.props.category.find(cate => cate.id == this.state.selected);
  }
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: '#F7F7F7'
  },
  row: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    ...dstyles.border('bottom')
  },
  cardPanel: {
    paddingRight: 20,
  },
  tabBtn: {
    height: 40,
    paddingHorizontal: 15 
  },
  tabBtnText: {
    fontSize: 16
  },
  tabBtnTextSelected: {
    color: dstyles.colors.primary
  },
});


function mapStateToProps(state) {
  return {
    ...state.categoryList,
    cardList: state.cardList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchCategory()),
    paginationCard: params => dispatch(paginationCardList(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(CardListByCategory)));
