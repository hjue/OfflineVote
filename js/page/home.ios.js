'use strict';

var React = require('react-native');

var Icon = require('react-native-vector-icons/FontAwesome');

var {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

var TouchableHighlight = require('TouchableHighlight');
var TouchableWithoutFeedback = require('TouchableWithoutFeedback');


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
    };
  },

  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress} >
        <View style={this.style()}>
        <Text style={{color:'#fff',fontSize: 24,textAlign: 'center',marginBottom: 50,}}>
  {this.state.count}
        </Text>
        <Icon name={this.props.icon} size={70} color="#fff" style={{textAlign: 'center',marginBottom: 50}} />
        <Text style={{color:'#fff',fontSize: 24,textAlign: 'center',}}>
  {this.props.title}
        </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  _handlePress() {
    var i = this.state.count+1;
    this.setState({count: i});
  }

});

var home = React.createClass({
  // componentWillMount: function() {
  //  this._panResponder = PanResponder.create({
  //       onStartShouldSetPanResponder: (evt, gestureState) => true,
  //       onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  //       onMoveShouldSetPanResponder: (evt, gestureState) => true,
  //       onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  //       onPanResponderGrant: () => this.setState({scroll: false}),
  //       onPanResponderMove: console.log("move"),
  //         onPanResponderRelease: () => this.setState({scroll: true})
  //     })
  // },
  //{...this._panResponder.panHandlers}
  render: function() {
    return (
        <View style={{flexDirection:'row',marginTop:0,flex: 1,}} >
          <Button backgroundColor="#27AE60" title="满意" icon="smile-o" ></Button>
          <Button backgroundColor="#C0392C" title="一般" icon="meh-o" ></Button>
          <Button backgroundColor="#F1C40E" title="不满意" icon="frown-o" ></Button>
        </View>
    );
  },


});

module.exports = home;