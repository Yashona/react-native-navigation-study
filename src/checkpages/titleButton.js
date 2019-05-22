import React from 'react';
import { Button, Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//1.通过引入下面的文件，可以跳转到 没有 navigation 这个 prop 的情况下 的页面，
import NavigationService from '../middleward/NavigationService.js';

//2.直接在要跳转的位置加下面语句，并传入对应组件的 navigate 名称 
//  NavigationService.navigate('Home');


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../images/spiro.png')}
        style={{ width: 25, height: 25 ,marginLeft: 10}}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: (  <View style={{width: 50, height: 30,  marginRight: 10, borderRadius:5, backgroundColor:'#00f'}}>
                      <TouchableOpacity onPress={() => Alert.alert('Alert','This is a button!')}>
                        <Text style={{lineHeight: 30, textAlign:'center', color: '#fff',}} >Info</Text>
                      </TouchableOpacity>
                    </View> 
                ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ width:'80%', alignItems: 'center'}}>  本页面是为了测试在header title 上面增加按钮；通过设置 navigationOptions 的参数来传递值，改变 navigator 里面的值</Text>
        <Text></Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details',{
               itemId: 86,
              otherParam: 'First Details',
            });
          }}
        />
        <Text></Text>
        <Button
          title="Go Back"
          onPress={() => {
            NavigationService.navigate('Home');
          }}
        />
        <Text></Text>
        <Button
          title="Login"
          onPress={() => {
            NavigationService.navigate('Login');
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params && params.otherParam ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params && params.itemId ? params.itemId : null;
    const otherParam = params && params.otherParam ? params.otherParam : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: 'Updated!' })}
        />
        <Text>下面按钮在页面没有切换的时候点击没有反应</Text>
        <Button
          title="Go to Details again fasle"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Text>下面点击没有参数</Text>
        <Button
          title="Go to Details again true"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Text>下面按钮点击会返回上一页面，与左上角按钮一样</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    TitleButton: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'TitleButton',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
        height: 45,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
