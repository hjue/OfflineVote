const React = require('react-native');

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

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
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    marginTop: 20,
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
        <TouchableWithoutFeedback onPress={this._handlePress}>
          <Text style={styles.item}>显示/隐藏 计数</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._clearCounter}>
          <Text style={styles.item}>清空计数</Text>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }

};