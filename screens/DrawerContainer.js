import React, {Component} from 'react';
import {Text,View,SafeAreaView, Image, AsyncStorage,StyleSheet,TouchableOpacity} from 'react-native';
import { MenuButton } from '../common';
import axios from 'axios'; 
import { ScrollView } from 'react-native-gesture-handler';

class DrawerContainer extends Component{

    state = {}
    
    removeSession = async() => {
        await AsyncStorage.removeItem('user_id')
        this.props.navigation.navigate('SignIn');
        navigation.closeDrawer();
    }

  

    // componentWillReceiveProps(){
    //    this.loadSession().done()
       
    // }
  
    
    render(){
        const { navigation } = this.props

        return(
            
          <View style={{height:'100%',width:'100%',backgroundColor:'#E73131',}}>
                <View style={{justifyContent:'flex-end',alignItems:'center',height:'25%'}}>
                    <Image
                    source={require('../assets/images/logowhite.png')}
                    style={{width:100,height:86}}
                    />
                </View>
                <ScrollView>
                <View style={{paddingTop:'20%'}}>
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="OFFERS"
                onPress={() => {
                    navigation.navigate('Offer');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="PIZZAS"
                onPress={() => {
                    navigation.navigate('Pizza');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="MAKE YOUR OWN"
                onPress={() => {
                    navigation.navigate('Makeyourown');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="SIDES"
                onPress={() => {
                    navigation.navigate('Sides');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="DRNKS"
                onPress={() => {
                    navigation.navigate('Drinks');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="KETO INGREDIENTS"
                onPress={() => {
                    alert('N/A')
                    // navigation.navigate('Notification');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="PREVIOUS ORDER"
                onPress={() => {
                    navigation.navigate('Lastorder');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="ADDRESS"
                onPress={() => {
                    alert('N/A')
                    // navigation.navigate('Notification');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                <MenuButton
                title="LOCATION"
                onPress={() => {
                    alert('N/A')
                    // navigation.navigate('Notification');
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                </View>
                <View style={{justifyContent:'flex-end',alignItems:'center',height:"10%"}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')}>
                    <View style={Styles.ButtonView}>
                        <Image
                        source={require('../assets/images/log-out.png')}
                        style={{width:19,height:18}}
                        />
                        <Text style={{fontFamily:'Avenir',color:'#E73131',fontSize:18,fontWeight:'500'}}>Log Out</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                </ScrollView>
          </View>     
           
        );
    }
}

const Styles = StyleSheet.create({
    
    ButtonView: {
        width:120,
        height:40,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#ffffff',
        
    }
   
})

export  {DrawerContainer};