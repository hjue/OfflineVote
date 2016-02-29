'use strict';

var React = require('react-native');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  LayoutAnimation,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AlertIOS
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');

var TouchableHighlight = require('TouchableHighlight');
var TouchableWithoutFeedback = require('TouchableWithoutFeedback');
var Power = React.createClass({
    render: function() {
      return(
        <Text style={{color:'#ECF0F1',fontSize: 12,position: 'absolute',bottom: 0,right: 0,backgroundColor:'transparent'}}>
           {this.props.title}
        </Text>
      )
    }
  });

function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

var Button = React.createClass({
  style: function () {
    return {
      backgroundColor: this.props.backgroundColor,
      flex: 0.3,
      justifyContent: 'center',
    }
  },
  getInitialState: function(){
    return {
        count: 0,
        hidden: 0,
    };
  },

  componentDidMount: function(){
    var me = this;

    RCTDeviceEventEmitter.addListener('counter',function(text){
      if(me.state.hidden){
        me.setState({hidden: 0});
      }else{
        me.setState({hidden: 1});
      }

    })
  },

  _renderCounter: function() {
    if(this.state.hidden){
      return ;
    }else{
      return (
        <Text style={{color:'#fff',fontSize: 24,textAlign: 'center',justifyContent: 'center',marginBottom: 50,}}>
  {this.state.count}
        </Text>
      );

    }
  },

  render: function() {
    var underlayColor = shadeColor2(this.props.backgroundColor || '#000000',-0.5);
    return (
      <TouchableHighlight  onPress={this._handlePress} style={this.style()} underlayColor={underlayColor}>
        <View >
        {this._renderCounter()}
        <Icon name={this.props.icon} size={70} color="#fff" style={{textAlign: 'center',marginBottom: 50}} />
        <Text style={{fontSize: 24,textAlign: 'center',color:'#fff'}}>
           {this.props.title}
        </Text>
        </View>
      </TouchableHighlight>

    );
  },

  _handlePress() {
    var i = this.state.count+1;
    this.setState({count: i});
    RCTDeviceEventEmitter.emit('CountClick',{type:this.props.buttonType,count:i});
  }

});


var home = React.createClass({

  componentDidMount: function(){
    var me = this;
    RCTDeviceEventEmitter.addListener('clear',function(text){
      console.log('clear');
      AlertIOS.prompt(
        '投票器',
        '确认要清空数据吗？',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => {
            me.refs.btnSmile.setState({count: 0});
            me.refs.btnMeh.setState({count: 0});
            me.refs.btnFrown.setState({count: 0});
            RCTDeviceEventEmitter.emit('CountClick',{type:'smile',count:0});
            RCTDeviceEventEmitter.emit('CountClick',{type:'meh',count:0});
            RCTDeviceEventEmitter.emit('CountClick',{type:'frown',count:0});
            }
          },
        ],
        null
      );

      //
    });
  },

  render: function() {
    return (
        <View style={{flexDirection:'row',marginTop:0,flex: 1,}}
        >
          <Button backgroundColor="#27AE60" title="满意" icon="smile-o" ref="btnSmile" buttonType="smile" ></Button>
          <Button backgroundColor="#C0392C" title="一般" icon="meh-o" ref="btnMeh" buttonType="meh" ></Button>
          <Button backgroundColor="#F1C40E" title="不满意" icon="frown-o" ref="btnFrown" buttonType="frown" ></Button>
          <Power title="©Powerby Geekbang"></Power>
        </View>

    );
  },

});

module.exports = home;