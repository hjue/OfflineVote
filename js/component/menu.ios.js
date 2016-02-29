const React = require('react-native');

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var Button = require('react-native-button');

const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Component,
} = React;


const window = Dimensions.get('window');
const uri = 'http://www.geekbang.org/favicon/apple-icon-60x60.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 0,
    flex: 1,
  },
  name: {
    position: 'absolute',
    fontSize: 20,
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 5,
    marginTop: 20,
    color: "white",
    textAlign: "left"
  },
});

module.exports = class Menu extends Component {

  componentWillMount() {
    console.log('componentWillMount')

  }

  _handlePress() {
    RCTDeviceEventEmitter.emit('counter','show');
  }

  _clearCounter() {
    RCTDeviceEventEmitter.emit('clear','1');
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../image/logo.png')}/>
          <Text style={styles.name}>Geekbang</Text>
        </View>

         <Button
        style={styles.item}
        styleDisabled={{color: 'red'}}
        onPress={this._handlePress}
      >
        显示/隐藏 计数
      </Button>

      <Button
        style={styles.item}
        styleDisabled={{color: 'red'}}
        onPress={this._clearCounter}
      >
        清空计数
      </Button>

      </ScrollView>
    );
  }

};