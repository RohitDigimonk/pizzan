import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AppNavigator from './screens/routing/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import promiseMiddleware from 'redux-promise';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import {  WelcomeScreen, SignIn, Dashboard, Takeaway,Delivery,Toppingpage,
//           Category,Offer,Lastorder,Pizza,Sides,Makeyourown,Drinks,DrawerContainer,Makebottom,Cart } from './screens'
// import { createDrawerNavigator } from 'react-navigation-drawer';
          


class App extends Component{
  
  render(){
    const store = createStore(reducers,{},applyMiddleware(promiseMiddleware));
    return(
      <Provider store={store}>
          {/* <PaperProvider> */}
            <View style={style.container}>
              <AppNavigator></AppNavigator>
            </View>
          {/* </PaperProvider> */}
          {/* <Snackbar id={"root_app"}/> */}
        </Provider>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
})



export default App;



// const AppNavigator = createStackNavigator({
//   WelcomeScreen: {
//     screen: WelcomeScreen,
//     navigationOptions: {
//       header: null
//     }
//   },
//     SignIn: {
//       screen: SignIn,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Dashboard: {
//       screen: Dashboard,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Takeaway: {
//       screen: Takeaway,
//       navigationOptions: {
//         header: null
//       }
//     },
//     Delivery: {
//       screen: Delivery,
//       navigationOptions: {
//         header: null
//       }
//     },
//     Category: {
//       screen: Category,
//       navigationOptions: {
//         header: null
//       }
//     },
//     Offer: {
//       screen: Offer,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Lastorder: {
//       screen: Lastorder,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Pizza: {
//       screen: Pizza,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Sides: {
//       screen: Sides,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Drinks: {
//       screen: Drinks,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Makeyourown: {
//       screen: Makeyourown,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Makebottom: {
//       screen: Makebottom,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Toppingpage: {
//       screen: Toppingpage,
//       navigationOptions: {
//         header:null
//       }
//     },
//     Cart: {
//       screen: Cart,
//       navigationOptions: {
//         header:null
//       }
//     }

// },{
//   initialRouteName: 'Drinks'
// })

// const DrawerStack = createDrawerNavigator(
//   {
//     Main: AppNavigator
//   },
//   {
//     drawerPosition: 'left',
//     drawerType:'front',
//     initialRouteName:'Main',
//     drawerWidth:280,
//     contentComponent: DrawerContainer
//   }
// );

// export default createAppContainer(DrawerStack);