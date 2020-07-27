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

    state= {totalprice:0,totalp:[]} 
   
    // checkout=()=>{
    //     Axios.post('https://s1-api.pizzan.is/api/v1/orders',{
            
    //             phoneNumber: "8985811",
    //             price: 299,
    //             deliveryType: "notSet",
    //             name: "rohit",
    //             address: "india",
    //             addressNo: "gwalior",
    //             postalCode: "474001",
    //             city: "gwalior",
    //             comments: "adsf",
    //             branchId: 0,
    //             couponId: "",
    //             pizzas: [
    //               {
    //                 id: 0,
    //                 orderNo: 0,
    //                 size: 0,
    //                 split: true,
    //                 toppings: [
    //                   {
    //                     keyValue: "string",
    //                     name: "string",
    //                     originalName: "string",
    //                     price: 0,
    //                     size: 0,
    //                     quantity: 0,
    //                     sortOrder: 0
    //                   }
    //                 ],
    //                 toppingsSplit: [
    //                   {
    //                     keyValue: "string",
    //                     name: "string",
    //                     originalName: "string",
    //                     price: 0,
    //                     size: 0,
    //                     quantity: 0,
    //                     sortOrder: 0
    //                   }
    //                 ],
    //                 quantity: 0,
    //                 price: 0,
    //                 menuKeyValue: "string",
    //                 createdDate: "2020-04-13T06:32:19.482Z",
    //                 createdBy: "string",
    //                 crust: {
    //                   keyValue: "string",
    //                   name: "string",
    //                   originalName: "string",
    //                   price: 0,
    //                   size: 0,
    //                   quantity: 0,
    //                   sortOrder: 0
    //                 },
    //                 sauce: {
    //                   keyValue: "string",
    //                   name: "string",
    //                   originalName: "string",
    //                   price: 0,
    //                   size: 0,
    //                   quantity: 0,
    //                   sortOrder: 0
    //                 },
    //                 cheese: {
    //                   keyValue: "string",
    //                   name: "string",
    //                   originalName: "string",
    //                   price: 0,
    //                   size: 0,
    //                   quantity: 0,
    //                   sortOrder: 0
    //                 }
    //               }
    //             ],
    //             sideOrders: [
    //               {
    //                 id: 0,
    //                 orderNo: 0,
    //                 keyValue: "string",
    //                 name: "string",
    //                 originalName: "string",
    //                 size: "string",
    //                 price: 0,
    //                 quantity: 0,
    //                 createdDate: "2020-04-13T06:32:19.482Z"
    //               }
    //             ],
    //             drinks: [
    //               {
    //                 id: 0,
    //                 orderNo: 0,
    //                 keyValue: "Appelsin_0_5",
    //                 name: "Appelsín            0,5 l",
    //                 originalName: "Appelsín            0,5 l",
    //                 size: "0,5 l",
    //                 price: 299,
    //                 quantity: 1,
    //                 createdDate: "2020-04-13T06:32:19.482Z"
    //               }
    //             ],
    //             offers: [
    //               {
    //                 id: 0,
    //                 type: "string",
    //                 offerKeyValue: "string",
    //                 orderOfferGUID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //                 offerName: "string",
    //                 originalName: "string",
    //                 offerDescription: "string",
    //                 orderNo: 0,
    //                 createdDate: "2020-04-13T06:32:19.482Z",
    //                 price: 0,
    //                 createdBy: "string",
    //                 pizzas: [
    //                   {
    //                     id: 0,
    //                     orderNo: 0,
    //                     size: 0,
    //                     split: true,
    //                     toppings: [
    //                       {
    //                         keyValue: "string",
    //                         name: "string",
    //                         originalName: "string",
    //                         price: 0,
    //                         size: 0,
    //                         quantity: 0,
    //                         sortOrder: 0
    //                       }
    //                     ],
    //                     toppingsSplit: [
    //                       {
    //                         keyValue: "string",
    //                         name: "string",
    //                         originalName: "string",
    //                         price: 0,
    //                         size: 0,
    //                         quantity: 0,
    //                         sortOrder: 0
    //                       }
    //                     ],
    //                     quantity: 0,
    //                     price: 0,
    //                     menuKeyValue: "string",
    //                     createdDate: "2020-04-13T06:32:19.482Z",
    //                     createdBy: "string",
    //                     crust: {
    //                       keyValue: "string",
    //                       name: "string",
    //                       originalName: "string",
    //                       price: 0,
    //                       size: 0,
    //                       quantity: 0,
    //                       sortOrder: 0
    //                     },
    //                     sauce: {
    //                       keyValue: "string",
    //                       name: "string",
    //                       originalName: "string",
    //                       price: 0,
    //                       size: 0,
    //                       quantity: 0,
    //                       sortOrder: 0
    //                     },
    //                     cheese: {
    //                       keyValue: "string",
    //                       name: "string",
    //                       originalName: "string",
    //                       price: 0,
    //                       size: 0,
    //                       quantity: 0,
    //                       sortOrder: 0
    //                     }
    //                   }
    //                 ],
    //                 sideOrders: [
    //                   {
    //                     id: 0,
    //                     orderNo: 0,
    //                     keyValue: "string",
    //                     name: "string",
    //                     originalName: "string",
    //                     size: "string",
    //                     price: 0,
    //                     quantity: 0,
    //                     createdDate: "2020-04-13T06:32:19.482Z"
    //                   }
    //                 ],
    //                 drinks: [
    //                   {
    //                     id: 0,
    //                     orderNo: 0,
    //                     keyValue: "string",
    //                     name: "string",
    //                     originalName: "string",
    //                     size: "string",
    //                     price: 0,
    //                     quantity: 0,
    //                     createdDate: "2020-04-13T06:32:19.482Z"
    //                   }
    //                 ],
    //                 isTvennuTilbod: true
    //               }
    //             ],
    //             payment: {
    //               paymentMethod: "string",
    //               paymentProvider: "string",
    //               recipient: "string"
    //             }
    //           }).then((response)=>{
    //             console.log(response);
    //         })
        
        
    // }

    removefromcart=(item)=>{
        // console.log(item)
        this.props.removefromcart(item);  
    }

    render(){
        console.log(this.props.addtocart,'alldata')
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'CART'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                //  carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
               <ScrollView>
               {this.props.addtocart?
               this.props.addtocart.map(data=>{
                  //  const name = data.name.split('  ')
                  //  var price = []
                  //  price.push(data.price)
                  //  const total = data.price.reduce((total, price) => total + price.price, 0);
                    // console.log(data)
                   return(
                            <View style={{height:'auto',width:'100%'}}>
                                <View style={Styles.container}>
                                  
                               <View>
                                    {
                                        data.name.map(name=>{
                                            // console.log(name)
                                            return(
                                                <View>
                                                <Text>
                                                    {name}
                                                </Text>
                                                
                                                </View>
                                            )
                                        })
                                    }
                                    <View style={{paddingVertical:10}}>
                                     {
                                        data.selectedsides.map(selectedsides=>{
                                            console.log(selectedsides)
                                            return(
                                                <View>
                                                <Text>
                                                    {selectedsides.sidedetail}
                                                </Text>
                                                </View>
                                            )
                                        })
                                    }
                                    </View>
                                    {
                                    data.selecteddrinks.map(drinks=>{
                                        return(
                                      <View style={{paddingHorizontal:3}}>
                                        <Text>{drinks.drinksdetail.name},</Text>
                                     </View>
                                        )
                                    })
                                }
                              </View>

                              
                                   
                             
                                
                                <TouchableOpacity onPress={()=>this.removefromcart(data)}>
                                <Text>X</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={Styles.container}>
                                <Text>
                                    {data.size}
                                </Text>
                                
                                <Text>
                                    {
                                        data.useMinimumPrice==true?data.minimumprice:data.price
                                    }
                                </Text>
                                </View>
                                <View style={Styles.container}>
                                <Text>
                                    {data.discription}
                                </Text>
                           
                                </View>
                                <View style={{flexDirection:'row',height:'auto'}}>
                                {
                                    data.toppingname.map(toppingname=>{
                                        return(
                                      <View style={{paddingHorizontal:3}}>
                                        <Text>{toppingname},</Text>
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
                    <Text style={{fontSize:20}}>
                        Total
                    </Text>
                <Text>
                   {
                     this.props.addtocart.reduce((total, addtocart) => total + addtocart.minimumprice , 0)
                   }

                    </Text>
                </View>
               <View style={{justifyContent:'flex-end',alignItems:'center',height:60,width:'100%',bottom:0}}>
               <Big_button onPress={this.checkout} >
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