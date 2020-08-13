import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet, Image,ImageBackground} from 'react-native';
import { Big_button } from '../common';
import Header from '../common/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import stringsoflanguages from './Language';

class Makebottom extends Component{

    state= {selectbottom:'',price:''}

    
    selectpizza = this.props.navigation.state.params.selectpizza
    size = this.props.navigation.state.params.size
    price = this.props.navigation.state.params.price

    componentDidMount=()=>{
        Axios.get('https://s1-api.pizzan.is/api/v1/toppings/groups')
        .then((response)=>{
            // console.log(response)
        })
        this.setState({price:this.props.navigation.state.params.price})
        
    }

    bottomvalue=(bottom)=>{
        if(bottom=='keto'){
            this.setState({selectbottom:bottom,price:'1890'})
        }
        else{
            this.setState({selectbottom:bottom})
        }
        
    }

    next = () =>{
        const size = this.size
        const selectpizza = this.selectpizza
        const price = this.price
        const bottom = this.state.selectbottom
        this.props.navigation.navigate('Toppingpage',{size,price,bottom,selectpizza})
    }

    render(){
        // console.log(this.size)
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
                 <ImageBackground
                source={require('../assets/images/background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >
            <View style={{height:'100%',width:'100%',justifyContent:'space-between'}}>
               <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={stringsoflanguages.makeyourown}
                 sideicon={require('../assets/images/back.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />

              
                 <ImageBackground
                 source={require('../assets/images/background_white.png')}
                 style={{width:'100%',height:160}}
                 resizeMode={'cover'}
                 
               >
               <View style={{width:'100%',paddingLeft:20}}>
                   <View style={{paddingVertical:20}}>
                   <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'200',fontFamily:'Avenir'}}>
                   {stringsoflanguages.startbychossingbottom}
                   </Text>
                   </View>
                   <View>
                   <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'600',fontFamily:'Avenir'}}>
                   {stringsoflanguages.choosebottom}
                   </Text>
                   </View>
               </View>
               </ImageBackground>
               <View style={{width:'100%',top:-10}}>
                   <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        
                        <View>
                            <TouchableOpacity
                                onPress={()=>this.bottomvalue('normal')}
                            >
                             {this.state.selectbottom=='normal'?
                            <Image
                                source={require('../assets/images/normal_black.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../assets/images/normal_white.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity> 
                        </View>
                        
                        <View>
                            <TouchableOpacity
                            onPress={()=>this.bottomvalue('thin')}
                            >
                             {this.state.selectbottom=='thin'?
                            <Image
                                source={require('../assets/images/thin_black.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../assets/images/thin_white.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                   <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center',paddingTop:10}}>
                        
                        <View>
                        <TouchableOpacity
                            onPress={()=>this.bottomvalue('garlic')}
                        >
                            {this.state.selectbottom=='garlic'?
                            <Image
                                source={require('../assets/images/garlic_black.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../assets/images/garlic_white.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity> 
                        </View>
                        
                        <View>
                            <TouchableOpacity
                            onPress={()=>this.bottomvalue('keto')}
                            >
                            {this.state.selectbottom=='keto'?
                            <Image
                                source={require('../assets/images/keto_black.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../assets/images/keto_white.png')}
                                style={{width:180,height:140,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                


               </View>
                   
            <Text style={{fontFamily:'Avenir',paddingLeft:35,fontSize:20,fontWeight:'500',paddingBottom:10,height:25,fontFamily:'Avenir'}}>{this.state.selectbottom}</Text>
            <Text style={{fontFamily:'Avenir',paddingLeft:35,fontSize:20,fontWeight:'500',paddingBottom:10,height:25,fontFamily:'Avenir'}}>{this.selectpizza}</Text> 
            <View>
                <View style={{alignItems:'center'}}>
                    <View style={Styles.buttonView}>
                        <Text style={{fontFamily:'Avenir',fontSize:18,color:'#ffffff'}}>
                        {stringsoflanguages.total}
                        </Text>
                        <Text style={{fontFamily:'Avenir',fontSize:18,color:'#ffffff'}}>
                            {this.state.price}
                        </Text>
                    </View>
                    <Big_button 
                    backgroundColor={'#E73131'}
                    textcolor={'#fff'}
                    onPress={this.next}>{stringsoflanguages.next}</Big_button>
                </View>
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
        buttonView: {
            height:50,
            width:'95%',
            backgroundColor:'#E73131',
            justifyContent:'space-between',
            alignItems:'center',
            marginBottom:10,
            flexDirection:'row',
            paddingHorizontal:20
        
    },
    imageview: {
        width:106,
        height:106,
        resizeMode:'contain', 
        transform:[{rotate: '-45deg'}]
    }
})

export {Makebottom};