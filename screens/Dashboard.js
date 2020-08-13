import React, {Component} from 'react';
import {ImageBackground, AsyncStorage, Text, View, StyleSheet,Image} from 'react-native';
import {Big_button,Footer} from '../common';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../common/CommonStyle';
import stringsoflanguages from './Language';

class Dashboard extends Component{
  state={token:''}

  componentDidMount=()=>{
    this.loadSession().done();
  }
  loadSession=async()=>{
    this.setState({
      token:await AsyncStorage.getItem('token')
    })
  }
  render(){

    return(
      // <SafeAreaView>
      <ImageBackground
      source={require('../assets/images/welcome_background.jpg')}
      style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center'}}
      >

                <View style={[Styles.logocontainer,{marginTop:120}]}>
                  <Image
                    source={require('../assets/images/logo.png')}
                    style={{height:120,width:120,resizeMode:'contain'}}
                  />
                </View>
      <View style={{width:'100%'}}>
      <Big_button 
      backgroundColor={'#E63C2F'}
      textcolor={'#fff'}
      onPress={()=>this.props.navigation.navigate('Takeaway')}>{stringsoflanguages.takeaway}
      </Big_button>
     
      <Big_button 
      backgroundColor={'#E63C2F'}
      textcolor={'#fff'}
      onPress={()=>this.props.navigation.navigate('Delivery')}>
        {stringsoflanguages.delivery}
      </Big_button>
      
      <View style={{alignItems:'center',paddingBottom:20}}>
          <Footer
            locationpress={()=>this.props.navigation.navigate('Takeaway')}
            selectionid='dashboard'
          />
      
          
        
      </View>
      </View>
      </ImageBackground>
      // </SafeAreaView>
    );
  }
}

export {Dashboard};