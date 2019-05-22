/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, ImageBackground, Text, View, Button,Image, Alert, TouchableOpacity} from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import Login from './login'
import Register from './register'
import TitleButton from './checkpages/titleButton'

//此为主页面引入中间键文件，并在其他页面中引入，同时传入本页面中的 navigate 参数；
import NavigationService from './middleward/NavigationService';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Nice to meet U,\n\n' +
    'Here is your Happiness times！',
});

class Home extends Component {

  /*onPressLearnMore(){
    Alert.alert(
        'notice',
        'Allow to get your equipment information',
        [
          {text: 'cancel', onPress: () => console.log('Ask me later pressed')},
          {text: 'sign in', onPress: () => console.log('Login')},
          {text: 'sign up', onPress: () => console.log('OK Pressed')},
        ]
    )
  }*/
  render() {
    return (
      <ImageBackground source={ require('./images/appbg.jpg') } style={{width: '100%', height: '100%'}}>
        {/*<View style={styles.container}>
                  <Text style={styles.welcome}>Welcome to React Native!</Text>
                  <Text style={styles.instructions}>{instructions}</Text>
                </View>
        <View style={{flex:1,flexDirection:'column',justifyContent:'space-around',alignItems:'center',alignContent:'center'}} >
          <View style={{height:50,backgroundColor:'#0f0'}}>
            <Text style={{lineHeight:50}}>this is the first box</Text>
          </View>
          <View style={{height:50,backgroundColor:'#00f'}}>
            <Text style={{lineHeight:50}}>this is the second box</Text>
          </View>
          <View style={{height:50,backgroundColor:'#f00'}}>
            <Text style={{lineHeight:50}}>this is the three box</Text>
          </View>
        </View>*/}

        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to my App !</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <Button onPress={() => this.props.navigation.navigate('Login')} title="进入体验" />
          <Text style={styles.instructions}></Text>
          <Button style={styles.titlebutton} onPress={() => this.props.navigation.navigate('TitleButton')} title="测试页面" />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  titlebutton:{
    marginTop:90,
  }
});

const navSetParam = {
  headerTintColor: '#fff',
  headerStyle: {height: 45, backgroundColor: 'blue'},
  headerTitleStyle: {
      fontSize: 18,
      color: '#fff',
      alignSelf: 'center',    //包括下面的属性主要是为了标题居中显示
      flex: 1,
      textAlign: 'center'
  },
};


const appNav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: navSetParam,
    },
    Register: {
      screen: Register,
      navigationOptions: navSetParam,
    },
    TitleButton: {
      screen: TitleButton,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
)

const AppContainer = createAppContainer(appNav);


export default class App extends React.Component {
  render() {
    return (
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
  }
}

