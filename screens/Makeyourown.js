import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet, Image} from 'react-native';
import { Big_button } from '../common';
import Header from '../common/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Makeyourown extends Component{

    state= {selectpizza:'',price:''}

    pizzavalue=(pizza,price,size)=>{
        console.log(pizza,price,size)
        this.setState({selectpizza:pizza,price:price,size:size})
    }

    next = () => {
        const {price,selectpizza,size} = this.state;
        this.props.navigation.navigate('Makebottom',{price,selectpizza,size})
    }

    render(){
        const {price} = this.state;
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'MAKE YOUR OWN'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
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
                            onPress={()=>this.pizzavalue('Small','1190','9')}
                        >
                            <Image
                                source={require('../assets/images/small.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity> 
                        </View>
                        
                        <View style={[ Styles.diamondView,this.state.selectpizza=='Medium'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Medium','1790','12')}
                            >
                            <Image
                                source={require('../assets/images/medium.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                   <View style={{alignItems:'center',paddingTop:'15%'}}>
                        <View style={[ Styles.diamondView,this.state.selectpizza=='Large'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                            onPress={()=>this.pizzavalue('Large','2290','16')}
                            >
                            <Image
                                source={require('../assets/images/large.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity>
                           
                        </View>
                   </View>

               </View>
            <Text style={{paddingLeft:35,fontSize:20,fontWeight:'500',paddingBottom:20,height:30}}>{this.state.selectpizza}</Text>
            <View>
                <View>
                    <View style={Styles.buttonView}>
                        <Text style={{fontSize:18,color:'#ffffff'}}>
                            Total
                        </Text>
                        <Text style={{fontSize:18,color:'#ffffff'}}>
                            {price}
                        </Text>
                    </View>
                    <Big_button
                    backgroundColor={'#E73131'}
                    textcolor={'#fff'}
                    onPress={this.next}>Next</Big_button>
                </View>
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
    buttonView: {
        height:50,
        width:360,
        backgroundColor:'#E73131',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft: 27,
        marginRight: 5,
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

export {Makeyourown};