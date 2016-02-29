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
  result: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    marginTop: 1,
    color: "white",
    textAlign: "left"
  }
});

module.exports = React.createClass({
  getInitialState(){
    return {
        counter: {
          smile :0,
          meh: 0,
          frown: 0
        }
    };
  },

  componentWillMount() {
    console.log('componentWillMount')

  },

  componentDidMount() {
    var me = this;
    RCTDeviceEventEmitter.addListener('CountClick',function(data){
      console.log('CountClick')
      var c = me.state.counter;
      c[data.type] =  data.count;
      me.setState(c);

    });
  },


  _handlePress() {
    RCTDeviceEventEmitter.emit('counter','show');
  },

  _clearCounter() {
    RCTDeviceEventEmitter.emit('clear','1');
  },

  _getCounterText(ctype) {
    var percent = 0;
    var total = this.state.counter.smile + this.state.counter.meh + this.state.counter.frown;
    var ret;
    if(ctype == 'total') {
      ret = "总计  "+  total;
    }

    if(ctype == 'smile') {
      if (total > 0) {
       percent =  this.state.counter.smile*100/total;
       ret = "满意   "+  this.state.counter.smile + '   ' + percent.toFixed(2)+'%';
      }else{
        ret = "满意   "+  this.state.counter.smile ;
      }
    }

    if(ctype == 'meh') {
      if (total > 0) {
       percent =  this.state.counter.meh*100/total;
       ret = "一般   "+  this.state.counter.meh + '   ' + percent.toFixed(2)+'%';
      }else{
        ret = "一般   "+  this.state.counter.meh ;
      }
    }


    if(ctype == 'frown') {
      if (total > 0) {
       percent =  this.state.counter.frown*100/total;
       ret = "满意   "+  this.state.counter.frown + '   ' + percent.toFixed(2)+'%';
      }else{
        ret = "满意   "+  this.state.counter.frown ;
      }
    }

    return ret;
  },
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

      <View style={{borderTopColor:'#fff',borderTopWidth:1, marginTop: 20 ,marginBottom: 10  }}></View>

      <Text style={styles.result} >
      {this._getCounterText('smile')}

      </Text>
      <Text style={styles.result}>
      {this._getCounterText('meh')}
      </Text>
      <Text style={styles.result}>
      {this._getCounterText('frown')}
      </Text>
      <Text style={styles.result}>
      {this._getCounterText('total')}
      </Text>



      </ScrollView>
    );
  }

});