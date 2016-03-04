import React, { Component, PropTypes, View, Text, Image ,AsyncStorage} from 'react-native';

import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: {
        smile: 0,
        meh: 0,
        frown: 0
      }
    };

  };

  componentWillMount() {
    AsyncStorage.getItem('smile').then((value) => {
      var counter = this.state.counter;
      if(value){
        counter.smile =  parseInt(value);
      }else{
        counter.smile =  0;
      }
      this.setState({"counter":counter});
    }).done();

    AsyncStorage.getItem('frown').then((value) => {
      var counter = this.state.counter;
      if(value){
        counter.frown =  parseInt(value);
      }else{
        counter.frown =  0;
      }
      this.setState({"counter":counter});
    }).done();

    AsyncStorage.getItem('meh').then((value) => {
      var counter = this.state.counter;
      if(value){
        counter.meh =  parseInt(value);
      }else{
        counter.meh =  0;
      }
      this.setState({"counter":counter});
    }).done();
  }

  componentDidMount() {
    var me = this;
    RCTDeviceEventEmitter.addListener('CountClick', function(data) {
      var c = me.state.counter;
      c[data.type] = data.count;
      me.setState(c);

    });
  };

  clearCounter = () => {
    RCTDeviceEventEmitter.emit('clear', '1');
  };

  showCounter = () => {
    RCTDeviceEventEmitter.emit('counter', 'show');

  };

getCounterText = (ctype) => {
    var percent = 0;
    var total = this.state.counter.smile + this.state.counter.meh + this.state.counter.frown;
    var ret;
    if (ctype == 'total') {
      ret = "" + total;
    }

    if (ctype == 'smile') {
      if (total > 0) {
        percent = this.state.counter.smile * 100 / total;
        ret = "" + this.state.counter.smile + '   ' + percent.toFixed(2) + '%';
      } else {
        ret = "" + this.state.counter.smile;
      }
    }

    if (ctype == 'meh') {
      if (total > 0) {
        percent = this.state.counter.meh * 100 / total;
        ret = "" + this.state.counter.meh + '   ' + percent.toFixed(2) + '%';
      } else {
        ret = "" + this.state.counter.meh;
      }
    }


    if (ctype == 'frown') {
      if (total > 0) {
        percent = this.state.counter.frown * 100 / total;
        ret = "" + this.state.counter.frown + '   ' + percent.toFixed(2) + '%';
      } else {
        ret = "" + this.state.counter.frown;
      }
    }

    return ret;
  };

  render() {

    return ( <Drawer theme ='light'>
        <Drawer.Header image={<Image source={ require('./../image/nav.jpg') } /> } >
        <View style={ styles.header } >
        <Avatar size={80} image = { <Image source = { require('./../image/logo.png') } />} />
        <Text style ={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]} > 点赞吧 </Text>
        </View>
        </Drawer.Header>

        <Drawer.Section
          title="Action"
          items = {
            [{
              icon: 'visibility',
              value: 'Show',
              label: ' ',
              active: false,
              onPress: () => this.showCounter(),
              onLongPress: () => this.showCounter()
            }, {
              icon: 'delete',
              value: 'Clear',
              active: false,
              label: ' ',
              onPress: () => this.clearCounter(),
              onLongPress: () => this.clearCounter()
            }]
          }
          />
          <Divider style = { { marginTop: 8 }}/>
          <Drawer.Section
        title = "统计"
        items = {
          [{
            icon: 'invert-colors',
            value: '满意',
            label: this.getCounterText('smile'),
          }, {
            icon: 'invert-colors',
            value: '一般',
            label: this.getCounterText('meh'),
          }, {
            icon: 'invert-colors',
            value: '不满意',
            label: this.getCounterText('frown'),
          }, {
            icon: 'invert-colors',
            value: '总计',
            label: this.getCounterText('total'),
          }]
        }
        />


        </Drawer>
      );
    }
  };

  const styles = {
    header: {
      paddingTop: 16
    },
    text: {
      marginTop: 20
    }
  };
