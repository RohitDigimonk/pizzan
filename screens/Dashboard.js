import React, {Component} from 'react';
import {ImageBackground, AsyncStorage, Text, View, StyleSheet,Image} from 'react-native';
import {Big_button,Footer1} from '../common';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../common/CommonStyle';

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
    // console.log(this.state.token)
    return(
      <SafeAreaView>
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
      <View>
      <Big_button 
      backgroundColor={'#E63C2F'}
      textcolor={'#fff'}
      onPress={()=>this.props.navigation.navigate('Takeaway')}>Take Away</Big_button>
     
      <Big_button 
      backgroundColor={'#E63C2F'}
      textcolor={'#fff'}
      onPress={()=>this.props.navigation.navigate('Delivery')}>
        Delivery
      </Big_button>
      
      <View style={{flexDirection:'row'}}>
          <Footer1>
        
            <Image
            source={require('../assets/images/home.png')}
            style={{width:23,height:22,resizeMode:'contain'}}
            />
            <Text style={Styles.buttontext}>Home</Text>
          
          </Footer1>
          
          <Footer1>
          <Image
            source={require('../assets/images/home.png')}
            style={{width:23,height:22,resizeMode:'contain'}}
            />
            <Text style={Styles.buttontext}>Pizza Tracker</Text>
          </Footer1>
          <Footer1>
          <Image
            source={require('../assets/images/home.png')}
            style={{width:23,height:22,resizeMode:'contain'}}
            />
            <Text style={Styles.buttontext}>Location</Text>
          </Footer1>
      </View>
      </View>
      </ImageBackground>
      </SafeAreaView>
    );
  }
}

export {Dashboard};