import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';
import LottieView from 'lottie-react-native';

class Complete extends Component{
    render(){
        return(
            <ImageBackground
                source={require('../assets/images/completed_background.png')}
                style={{width:'100%',height:'100%',alignItems:'center'}}
                resizeMode={'cover'}
                
            >
                <View style={{width:'100%',height:300,marginTop:'30%'}}>
                    <LottieView
                        source={require('../assets/lottie/pizza_delivery2.json')}
                        autoPlay
                        loop
                    >

                    </LottieView>
                </View>
                <View style={{marginTop:'70%',height:'100%',width:'100%',alignItems:'center'}}>
                <Text style={{fontFamily:'Avenir',fontSize:20,color:'#fff'}}>Order Received</Text>
                <Text style={{fontFamily:'Avenir',fontSize:24,color:'#fff'}}>15-20 min in Nupalind</Text>
                </View>
                </ImageBackground>
        );
    }
}

export default Complete;