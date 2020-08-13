import React, {Component} from 'react';
import {Text,View, SafeAreaView,ImageBackground} from 'react-native';
import Header from '../common/Header';

class Lastorder extends Component{
    render(){
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={'LAST ORDER'}
                 sideicon={require('../assets/images/back.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
                 profilepress={()=>this.props.navigation.navigate('Delivery')}
               />
               <ImageBackground
                source={require('../assets/images/full_background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >

                </ImageBackground>
            </View>
            </SafeAreaView>
        );
    }
}

export {Lastorder};