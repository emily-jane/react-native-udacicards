import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { darkPurple } from './utils/colours';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

function AppStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? darkPurple : '#FFFFFF',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? '#FFFFFF' : darkPurple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Decks: {
    screen: Tabs,
  },
  // EntryDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: {
  //     headerTintColor: '#FFFFFF',
  //     headerStyle: {
  //       backgroundColor: darkPurple,
  //     }
  //   }
  // }
})

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={darkPurple} barStyle='light-content' />
        <MainNavigator />
      </View>
    )
  }
}
