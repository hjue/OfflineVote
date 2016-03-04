/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  Navigator
} from 'react-native';

import { Button, Card } from 'react-native-material-design';
import Navigation from './src/android/component/menu';
import HomePage from './src/android/page/home';
// var HomePage = require('./src/ios/page/home.ios.js');

class Application extends Component {
  static childContextTypes = {
    drawer: React.PropTypes.object,
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      drawer: null,
      navigator: null
    };
  }

  getChildContext = () => {
    return {
      drawer: this.state.drawer,
      navigator: this.state.navigator
    }
  };

  setDrawer = (drawer) => {
    this.setState({
      drawer
    });
  };

  setNavigator = (navigator) => {
    this.setState({
      navigator: null
    });
  };

  render() {
    const { drawer, navigator } = this.state;
    const navView = React.createElement(Navigation);
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView= {() => {
                    if (1) {
                        return navView;
                    }
                    return null;
                }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
      >
        <HomePage />
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('QconVote', () => Application);
