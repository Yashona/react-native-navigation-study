import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';


export default class RegisterScreen extends Component {
  //会覆盖StackNavigator声明的页面的navigationOptions 
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Register'),
      headerRight:<View><TouchableOpacity onPress={() => {navigation.navigate('Home')}}><View><Text style={{color: '#fff', marginRight: 20}}>OK</Text></View></TouchableOpacity></View>
    };
  };

  render() {
      return (
        <View>
            <Text style={{color:'#000'}}>注册页面</Text>
        </View>
      );
  };
}
