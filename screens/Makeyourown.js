import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet, Image,ImageBackground} from 'react-native';
import { Big_button } from '../common';
import Header from '../common/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stringsoflanguages from './Language';

class Makeyourown extends Component{

    state= {selectpizza:'',price:''}

    pizzavalue=(pizza,price,size)=>{
        // console.log(pizza,price,size)
        this.setState({selectpizza:pizza,price:price,size:size})
    }

    next = () => {
        const {price,selectpizza,size} = this.state;
        this.props.navigation.navigate('Makebottom',{price,selectpizza,size})
    }

    render(){
        const {price} = this.state;
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
                 profilepress={()=>this.props.navigation.navigate('Delivery')}
               />
           
               <ImageBackground
                 source={require('../assets/images/background_white.png')}
                 style={{width:'100%',height:160}}
                 resizeMode={'cover'}
                 
               >
               <View style={{width:'100%',justifyContent:'center',paddingLeft:20}}>
                   <View style={{paddingVertical:20}}>
                   <Text style={{fontSize:18,fontWeight:'200',fontFamily:'Avenir'}}>
                       {stringsoflanguages.startbychossingsize}
                   </Text>
                   </View>
                   <View>
                   <Text style={{fontSize:18,fontWeight:'600',fontFamily:'Avenir'}}>
                   {stringsoflanguages.choosesize}
                   </Text>
                   </View>
               </View>
               </ImageBackground>
               <View style={{width:'100%'}}>
                   <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        
                        <View>
                        <TouchableOpacity
                            onPress={()=>this.pizzavalue('Small','1190','9')}
                        >
                            {this.state.selectpizza=='Small'?
                            <Image
                                source={require('../assets/images/small_black.png')}
                                style={{width:170,height:110,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../assets/images/small_white.png')}
                                style={{width:170,height:110,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity> 
                        </View>
                        
                        <View>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Medium','1790','12')}
                            >
                             {this.state.selectpizza=='Medium'?
                            <Image
                                source={require('../assets/images/medium_black.png')}
                                style={{width:190,height:130,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../assets/images/medium_white.png')}
                                style={{width:190,height:130,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                   <View style={{alignItems:'center'}}>
                        <View>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Large','2290','16')}
                            >
                             {this.state.selectpizza=='Large'?
                            <Image
                                source={require('../assets/images/large_black.png')}
                                style={{width:220,height:160,resizeMode:'contain'}}
                            />
                            :
                            <Image
                                source={require('../assets/images/large_white.png')}
                                style={{width:220,height:160,resizeMode:'contain'}}
                            />
                            }
                            </TouchableOpacity>
                           
                        </View>
                   </View>

               </View>
            <Text style={{
                        paddingLeft:35,
                        fontSize:20,
                        fontWeight:'500',
                        paddingBottom:20,
                        height:30,
                        fontFamily:'Avenir'
                        }}>
            {this.state.selectpizza}
            </Text>
            <View>
                <View style={{alignItems:'center'}}>
                    <View style={Styles.buttonView}>
                        <Text style={{fontSize:18,color:'#ffffff',fontFamily:'Avenir'}}>
                        {stringsoflanguages.total}
                        </Text>
                        <Text style={{fontSize:18,color:'#ffffff',fontFamily:'Avenir'}}>
                            {price}
                        </Text>
                    </View>
                    <Big_button
                    backgroundColor={'#E73131'}
                    textcolor={'#fff'}
                    onPress={this.next}>{stringsoflanguages.next}
                    </Big_button>
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
    
})

export {Makeyourown};