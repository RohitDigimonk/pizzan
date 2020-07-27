import React, {Component} from 'react';
import {Text,View, SafeAreaView} from 'react-native';
import Header from '../common/Header';

class Lastorder extends Component{
    render(){
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'LAST ORDER'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
            </View>
            </SafeAreaView>
        );
    }
}

export {Lastorder};