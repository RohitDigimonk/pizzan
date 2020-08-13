import React, {Component} from 'react';
import {View,Text, StyleSheet,SafeAreaView,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { ArrowButton } from '../../common';

class Pizzasize extends Component{

    offerdata = this.props.navigation.state.params.offerdata

    state= {selectpizza:'',price:'',sizeno:''}

    pizzavalue=(pizza,price,sizeno)=>{
        
        this.setState({selectpizza:pizza,price:price,sizeno:sizeno})
        
    }

    arrowselection=(size)=>{
        const offerdata = this.offerdata
        const {price} = this.state
        const {sizeno} = this.state;
        // console.log(sizeno)
        this.props.navigation.navigate('Offerpizzatwo',{size,offerdata,price,sizeno})
    }


    render(){
        // console.log(this.offerdata)
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
                <ImageBackground
                source={require('../../assets/images/background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >
            <View style={{height:'100%',width:'100%'}}>
            <TouchableOpacity 
            style={{width:40,height:40,alignItems:'center',justifyContent:'center'}}
            onPress={()=>this.props.navigation.goBack()}
            >
                <Image
                    source={require('../../assets/images/leftarrow.png')}
                    style={{width:26,height:20,resizeMode:'contain'}}
                />
            </TouchableOpacity>
               {/* <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'MAKE YOUR OWN'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               /> */}
               <View style={{height:'15%',width:'100%',justifyContent:'center',paddingLeft:20}}>
                   <View style={{paddingVertical:40,width:'100%'}}>
                   <Text style={{fontFamily:'Avenir',fontSize:17,fontWeight:'200'}}>
                       START BY CHOOSING THE SIZE YOU WANT
                   </Text>
                   </View>
                   <View>
                   <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'600'}}>
                       CHOOSE SIZE
                   </Text>
                   </View>
               </View>
               <View style={{height:'55%',width:'100%',marginTop:'10%'}}>
                   <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        
                        <View>
                        <TouchableOpacity
                            onPress={()=>this.pizzavalue('Small',1190,9)}
                        >
                           {this.state.selectpizza=='Small'?
                            <Image
                                source={require('../../assets/images/small_black.png')}
                                style={{width:190,height:130,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../../assets/images/small_white.png')}
                                style={{width:190,height:130,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity> 
                        </View>
                        
                        <View>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Medium',1790,12)}
                            >
                             {this.state.selectpizza=='Medium'?
                            <Image
                                source={require('../../assets/images/medium_black.png')}
                                style={{width:210,height:150,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../../assets/images/medium_white.png')}
                                style={{width:210,height:150,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                   <View style={{alignItems:'center',paddingTop:'15%'}}>
                        <View>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Large',2290,16)}
                            >
                            {this.state.selectpizza=='Large'?
                            <Image
                                source={require('../../assets/images/large_black.png')}
                                style={{width:240,height:180,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../../assets/images/large_white.png')}
                                style={{width:240,height:180,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity>
                           
                        </View>
                   </View>

               </View>
            <Text style={{fontFamily:'Avenir',paddingLeft:35,fontSize:20,fontWeight:'500',paddingBottom:20,height:30}}>{this.state.selectpizza}</Text>
            
                <View style={{right:-140}}>
                 {this.state.selectpizza==''?
                        <ArrowButton
                        backgroundColor='grey'
                        
                        />
                  :
                      <ArrowButton
                      backgroundColor='#E73131'
                      onPress={()=>this.arrowselection(this.state.selectpizza)}
                      />
                 }
                 
                </View>
            

            </View>
            </ImageBackground>
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    diamondView: {
        width: 140,
        height: 140,
        backgroundColor: '#ffffff',
        marginHorizontal:40,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        
        // flexDirection:'row',
        transform: [
            {rotate: '45deg'}
          ]   
    },
   
    imageview: {
        width:106,
        height:106,
        resizeMode:'contain', 
        transform:[{rotate: '-45deg'}]
    }
})

export default Pizzasize;