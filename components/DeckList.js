import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Deck from './Deck';
import { darkGreen } from '../utils/colours';
import { connect } from 'react-redux';
import { getDecks } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    this.props.getDecks();

  }

  renderItem = ({ item }) => {
    return <Deck {...item} {...this.props} />
  }

  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: darkGreen
  },
});

function mapStateToProps (state) {
  return {
    decks: state
  }
};

export default connect(mapStateToProps, { getDecks })(DeckList);
