import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet, Image} from 'react-native';
import { Big_button } from '../common';
import Header from '../common/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';

class Makebottom extends Component{

    state= {selectbottom:'',price:''}

    
    selectpizza = this.props.navigation.state.params.selectpizza
    size = this.props.navigation.state.params.size

    componentDidMount=()=>{
        Axios.get('https://s1-api.pizzan.is/api/v1/toppings/groups')
        .then((response)=>{
            console.log(response)
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
        this.props.navigation.navigate('Toppingpage',{size})
    }

    render(){
        console.log(this.size)
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
                       CHOOSE BOTTOM
                   </Text>
                   </View>
               </View>
               <View style={{height:'55%',width:'100%',marginTop:'10%'}}>
                   <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        
                        <View style={[ Styles.diamondView,this.state.selectbottom=='normal'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                        <TouchableOpacity
                            onPress={()=>this.bottomvalue('normal')}
                        >
                            <Image
                                source={require('../assets/images/normal.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity> 
                        </View>
                        
                        <View style={[ Styles.diamondView,this.state.selectbottom=='thin'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                            onPress={()=>this.bottomvalue('thin')}
                            >
                            <Image
                                source={require('../assets/images/thin.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                   <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center',paddingTop:70}}>
                        
                        <View style={[ Styles.diamondView,this.state.selectbottom=='garlic'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                        <TouchableOpacity
                            onPress={()=>this.bottomvalue('garlic')}
                        >
                            <Image
                                source={require('../assets/images/garlic.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity> 
                        </View>
                        
                        <View style={[ Styles.diamondView,this.state.selectbottom=='keto'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                            onPress={()=>this.bottomvalue('keto')}
                            >
                            <Image
                                source={require('../assets/images/keto.png')}
                                style={Styles.imageview}
                            />
                            </TouchableOpacity>
                            
                        </View>
                   </View>
                


               </View>
                   
            <Text style={{paddingLeft:35,fontSize:20,fontWeight:'500',paddingBottom:20,height:30}}>{this.state.selectbottom}</Text>
            <Text style={{paddingLeft:35,fontSize:20,fontWeight:'500',paddingBottom:20,height:30}}>{this.selectpizza}</Text> 
            <View>
                <View>
                    <View style={Styles.buttonView}>
                        <Text style={{fontSize:18,color:'#ffffff'}}>
                            Total
                        </Text>
                        <Text style={{fontSize:18,color:'#ffffff'}}>
                            {this.state.price}
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

export {Makebottom};