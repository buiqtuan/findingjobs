/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';

import {PersistGate} from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
}

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: {screen: WelcomeScreen},
      auth: {screen: AuthScreen},
      main: {
        screen: TabNavigator({
          map: {screen: MapScreen},
          deck: {screen: DeckScreen},
          review: StackNavigator({
            review: {screen: ReviewScreen},
            setting: {screen: SettingScreen}
          })
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: {fontSize:12}
          }
        }
      )
      }
    }, {
      navigationOptions: {
        tabBar: {visible: false}
      },
      lazyLoad: true
    });

    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator/>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
