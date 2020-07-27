import React, {Component} from 'react';
import {View,Text, StyleSheet,SafeAreaView,TouchableOpacity,Image} from 'react-native';
import { ArrowButton } from '../../common';

class Pizzasize extends Component{

    offerdata = this.props.navigation.state.params.offerdata

    state= {selectpizza:''}

    pizzavalue=(pizza)=>{
        console.log(pizza)
        this.setState({selectpizza:pizza})
    }

    arrowselection=(size)=>{
        const offerdata = this.offerdata
        this.props.navigation.navigate('Pizzaselection',{size,offerdata})
    }


    render(){
        console.log(this.offerdata)
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               {/* <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'MAKE YOUR OWN'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               /> */}
               <View style={{height:'15%',width:'100%',justifyContent:'center',paddingLeft:20}}>
                   <View style={{paddingVertical:40}}>
                   <Text style={{fontSize:18,fontWeight:'200'}}>
                       START BY CHOOSING THE SIZE YOU WANT
                   </Text>
                   </View>
                   <View>
                   <Text style={{fontSize:18,fontWeight:'600'}}>
                       CHOOSE SIZE
                   </Text>
                   </View>
               </View>
               <View style={{height:'55%',width:'100%',marginTop:'10%'}}>
                   <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        
                        <View style={[ Styles.diamondView,this.state.selectpizza=='Small'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                        <TouchableOpacity
                            onPress={()=>this.pizzavalue('Small')}
                        >
                            <Image
                                source={require('../../assets/images/small.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity> 
                        </View>
                        
                        <View style={[ Styles.diamondView,this.state.selectpizza=='Medium'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Medium')}
                            >
                            <Image
                                source={require('../../assets/images/medium.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                   <View style={{alignItems:'center',paddingTop:'15%'}}>
                        <View style={[ Styles.diamondView,this.state.selectpizza=='Large'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Large')}
                            >
                            <Image
                                source={require('../../assets/images/large.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity>
                           
                        </View>
                   </View>

               </View>
            <Text style={{paddingLeft:35,fontSize:20,fontWeight:'500',paddingBottom:20,height:30}}>{this.state.selectpizza}</Text>
            
                <View style={{right:-140}}>
                 
                      <ArrowButton
                      onPress={()=>this.arrowselection(this.state.selectpizza)}
                      />
                  
                 
                </View>
            

            </View>
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