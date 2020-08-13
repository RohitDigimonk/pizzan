import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { Big_button } from '../common';
import Header from '../common/Header';
import {connect} from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { removefromcart } from '../store/actions';
import {bindActionCreators} from 'redux';


class Cart extends Component {

    state= {totalprice:0,totalp:[],total:0} 
   
    componentDidMount=()=>{
       
        const total = this.props.addtocart.reduce((prev,next) => prev + next.price,0);
        this.setState({total:total})
    }

   

    removefromcart=(item)=>{
        console.log(item,'sdf')
        this.setState({total:this.state.total-item.price})
        this.props.removefromcart(item);  
    }

    checkout=()=>{
        const {total} = this.state;
        this.props.navigation.navigate('Checkout',{total})
    }

    render(){
        // console.log(this.props.addtocart,'toppings',this.state.totalprice)
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
            <View style={{height:'100%',width:'100%',backgroundColor:'#f2f2f2'}}>
               <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={'CART'}
                 sideicon={require('../assets/images/back.png')}
                 notificationicon={require('../assets/images/notification.png')}
                //  carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
               <ScrollView>
               {this.props.addtocart?
               this.props.addtocart.map(data=>{
                 
                   return(
                            <View style={{height:'auto',width:'100%'}}>
                                <View style={Styles.container}>
                                  
                               <View>
                                    {
                                        data.ownpizza==false?
                                        data.name.map(datanew=>{
                                            // console.log(data,'rere')
                                            return(
                                                <View style={{width:'90%'}}>
                                                   <Text style={{fontFamily:'Avenir',fontSize:22,paddingVertical:5}}>
                                                    {datanew.pizzadetail.name}
                                                    </Text>
                                                    
                                                    <Text style={{fontFamily:'Avenir'}}>
                                                    {datanew.bottom?<Text style={{fontFamily:'Avenir',fontSize:18}}>Bottom-{datanew.bottom}</Text>:null}
                                                    </Text>
                                                    <Text style={{fontFamily:'Avenir'}}>
                                                    {datanew.pizzadetail.toppingsSummary}
                                                    </Text>
                                                    {datanew.size?
                                                    <View style={{bottom:0}}>
                                                    <Text style={{fontFamily:'Avenir',paddingVertical:5,fontSize:20}}>
                                                        {datanew.size}
                                                    </Text>
                                                    </View>
                                                    :null}
                                                </View>
                                                
                                            )
                                        })
                                    :
                                    <View>
                                        <Text style={{fontFamily:'Avenir',fontSize:20}}>Own Pizza One</Text>
                                       {data.bottom? <Text style={{fontSize:18}}>Bottom-{data.bottom.map(data=>data.bottom)}</Text>:null}
                                        {data.halftoppingone.map(data1=>{
                                            if(data1.index==0){
                                            return(
                                                <Text style={{fontFamily:'Avenir'}}>{data1.toppingname} x {data1.qty}</Text>
                                            )
                                        }
                                })}
                               
                                {data.halftoppingtwo.length > 0?<Text style={{fontFamily:'Avenir',fontSize:18,paddingVertical:5}}>Second Half Topping</Text>:null}
                                {data.halftoppingtwo.length > 0?
                                    data.halftoppingtwo.map(data1=>{
                                            if(data1.index==0){
                                            return(
                                                <Text style={{fontFamily:'Avenir'}}>{data1.toppingname} x {data1.qty}</Text>
                                            )
                                        }
                                }):null}
                            
                                <View style={{paddingVertical:10}} />
                                
                            {data.secondfreepizza?<Text style={{fontFamily:'Avenir',fontSize:20}}>Own Pizza Two</Text>:null}
                          {data.bottom > 1 ?<Text style={{fontFamily:'Avenir',fontSize:18}}>Bottom-{data.bottom[1].bottom}</Text>:null}
                                  {data.halftoppingone.map(data1=>{
                                            if(data1.index==1){
                                            return(
                                                <Text style={{fontFamily:'Avenir'}}>{data1.toppingname} x {data1.qty}</Text>
                                            )
                                        }
                                })}
                                

                                 {data.halftoppingtwo.length > 0?<Text style={{fontFamily:'Avenir',fontSize:18,paddingVertical:5}}>Second Half Topping</Text>:null}
                                {data.halftoppingtwo.length > 0?
                                    data.halftoppingtwo.map(data1=>{
                                            if(data1.index==1){
                                            return(
                                                <Text style={{fontFamily:'Avenir'}}>{data1.toppingname} x {data1.qty}</Text>
                                            )
                                        }
                                }):null}
                                

                                    </View> 
                             
                                }  
                                    
                                    <View style={{paddingVertical:10}}>
                                     {
                                        data.selectedsides.map(selectedsides=>{
                                            // console.log(selectedsides)
                                            return(
                                                <View>
                                                <Text style={{fontFamily:'Avenir',fontSize:20}}>
                                                    {selectedsides.sidedetail}
                                                </Text>
                                                </View>
                                            )
                                        })
                                    }
                                    </View>
                                    {
                                    data.selecteddrinks.map(drinks=>{
                                        // console.log(drinks)
                                        return(
                                      <View style={{paddingHorizontal:3}}>
                                        <Text style={{fontFamily:'Avenir',fontSize:20}}>{drinks.drinksdetail.name}</Text>
                                     </View>
                                        )
                                    })
                                }
                              </View>

                              
                                   
                             
                                
                                <TouchableOpacity onPress={()=>this.removefromcart(data)}>
                                <Text style={{fontFamily:'Avenir'}}>X</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={Styles.container}>
                                <Text style={{fontFamily:'Avenir',fontSize:20}}>
                                    {data.size}
                                </Text>
                                
                                <Text style={{fontFamily:'Avenir'}}>
                                    {
                                        data.useMinimumPrice==true?data.minimumprice:data.price
                                    }
                                </Text>
                                </View>
                                <View style={Styles.container}>
                                <Text style={{fontFamily:'Avenir'}}>
                                    {data.discription}
                                </Text>
                           
                                </View>
                                <View style={{flexDirection:'row',height:'auto'}}>
                                {
                                    data.toppingname.map(toppingname=>{
                                        return(
                                      <View style={{paddingHorizontal:3}}>
                                        <Text style={{fontFamily:'Avenir'}}>{toppingname},</Text>
                                     </View>
                                        )
                                    })
                                }
                            </View>                     
                                
                                
                                <View style={{width:'100%',height:1,backgroundColor:'grey'}} />
                            </View>
                    )    
            }):null}
            </ScrollView>
                <View style={{height:60,paddingHorizontal:20,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Avenir',fontSize:20}}>
                        Total
                    </Text>
                <Text style={{fontFamily:'Avenir'}}>
                   {
                      this.state.total
                   }

                    </Text>
                </View>
               <View style={{justifyContent:'flex-end',alignItems:'center',height:60,width:'100%',bottom:0}}>
               <Big_button
               backgroundColor={'#E73131'}
               textcolor={'#fff'}
               onPress={this.checkout} >
                   CHECK OUT
                </Big_button>
               </View>
               </View>
               </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:10
    }
})

function mapStateToProps(state){
    // console.log(state.addtocart)
    return {
        addtocart: state.addtocart,
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({removefromcart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);