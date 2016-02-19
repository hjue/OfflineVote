'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

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
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={this.style()}>
        <Text style={{color:'#fff',fontSize: 24,textAlign: 'center',marginBottom: 50,}}>
  {this.state.count}
        </Text>
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

  render: function() {
    return (
        <View style={{flexDirection:'row',marginTop:20,flex: 1,}}>
          <Button backgroundColor="#27AE60" title="满意" ></Button>
          <Button backgroundColor="#C0392C" title="一般"></Button>
          <Button backgroundColor="#F1C40E" title="不满意"></Button>
        </View>
    );
  },


});

module.exports = home;