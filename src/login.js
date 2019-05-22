import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    TextInput,
    Switch
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      errText:' ',
      swicthValue1: false
    };
  }

  //会覆盖StackNavigator声明的页面的navigationOptions 
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Login'),
      headerRight:( <View>
                      <TouchableOpacity onPress={() => {navigation.state.params.toOperate();}}>
                        <View>
                          <Text style={{color: '#fff', marginRight: 20}}>注册</Text>
                        </View>
                      </TouchableOpacity>
                    </View> )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({toOperate: () => {
      this.props.navigation.navigate('Register')
    }})
  };

  login(){
    
  }

  render() {
    return (
      <ImageBackground source={ require('./images/appbg.jpg') } style={{width: '100%', height: '100%'}}>
        <View style={styles.content}>
          <Text style={styles.title}>User Name：</Text>
          <TextInput style={styles.input}
            onChangeText={(con)=>this.setState({con})}
          ></TextInput>
          <Text style={styles.title}>Password：</Text>
          <TextInput style={styles.input}></TextInput>
          <Text style={styles.title}>{this.state.errText}</Text>
          <Button
            title="Login in"
            onPress={() => this.props.navigation.push('Home')}
          />
          
          <Switch style={{marginTop: 20}}
             onTintColor={'#0f0'}
             tintColor={'#fff'}
             value={this.state.swicthValue1}
             onValueChange={(value)=> {
                 //当开关状态改变了，一定要修改value的值，不然最终无法改变状态
                 this.setState({
                     swicthValue1: value
                 })
              }}
              thumbTintColor={"#00f"}
             testID={'one'}/>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    height:30,
    color:'#fff',
  },
  input:{
    width:'70%',
    borderWidth:1,
    borderColor:'#fff',
    margin:10,
    paddingLeft:10,
    paddingRight:10,
    color:'#fff'
  }
})