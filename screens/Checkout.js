import React, {Component} from 'react';
import {View, Text,SafeAreaView,StyleSheet,TouchableOpacity,Image} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Big_button } from '../common';
import Axios from 'axios';


class Checkout extends Component{

    state = {coupon:false,couponprice:0,totalamount:0,discountamount:0}

    total = this.props.navigation.state.params.total

    componentDidMount=()=>{
        this.setState({totalamount:this.total})
    }

    placeorder2=()=>{
        Axios.post('https://s1-api.pizzan.is/api/v1/orders',{
            phoneNumber: "8985881",
            price: 3590,
            deliveryType: "notSet",
            name: "Rohit Arora",
            address: "Iceland",
            addressNo: "House no. 35A",
            postalCode: "474003",
            city: "Iceland City",
            comments: "asdfasdfasdf",
            branchId: 6,
            couponId: "",
            pizzas: [
            //   {
            //     id: 0,
            //     orderNo: 0,
            //     size: 0,
            //     split: true,
            //     toppings: [
            //       {
            //         keyValue: "string",
            //         name: "string",
            //         originalName: "string",
            //         price: 0,
            //         size: 0,
            //         quantity: 0,
            //         sortOrder: 0
            //       }
            //     ],
            //     toppingsSplit: [
            //       {
            //         keyValue: "string",
            //         name: "string",
            //         originalName: "string",
            //         price: 0,
            //         size: 0,
            //         quantity: 0,
            //         sortOrder: 0
            //       }
            //     ],
            //     quantity: 0,
            //     price: 0,
            //     menuKeyValue: "string",
            //     createdDate: "2020-08-05T10:24:52.911Z",
            //     createdBy: "string",
            //     crust: {
            //       keyValue: "string",
            //       name: "string",
            //       originalName: "string",
            //       price: 0,
            //       size: 0,
            //       quantity: 0,
            //       sortOrder: 0
            //     },
            //     sauce: {
            //       keyValue: "string",
            //       name: "string",
            //       originalName: "string",
            //       price: 0,
            //       size: 0,
            //       quantity: 0,
            //       sortOrder: 0
            //     },
            //     cheese: {
            //       keyValue: "string",
            //       name: "string",
            //       originalName: "string",
            //       price: 0,
            //       size: 0,
            //       quantity: 0,
            //       sortOrder: 0
            //     }
            //   }
            ],
            sideOrders: [
            //   {
            //     id: 0,
            //     orderNo: 0,
            //     keyValue: "string",
            //     name: "string",
            //     originalName: "string",
            //     size: "string",
            //     price: 0,
            //     quantity: 0,
            //     createdDate: "2020-08-05T10:24:52.911Z"
            //   }
            ],
            drinks: [
              {
                id: 0,
                orderNo: 0,
                keyValue: "Appelsin_0_5",
                name: "Appelsín            0,5 l",
                originalName: "Appelsín            0,5 l",
                size: "0,5 l",
                price: 299,
                quantity: 1,
                createdDate: "2020-08-05T10:24:52.911Z"
              }
            ],
            offers: [
            //   {
            //     id: 0,
            //     type: "string",
            //     offerKeyValue: "string",
            //     orderOfferGUID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            //     offerName: "string",
            //     originalName: "string",
            //     offerDescription: "string",
            //     orderNo: 0,
            //     createdDate: "2020-08-05T10:24:52.911Z",
            //     price: 0,
            //     createdBy: "string",
            //     pizzas: [
                //   {
                //     id: 0,
                //     orderNo: 0,
                //     size: 0,
                //     split: true,
                //     toppings: [
                //       {
                //         keyValue: "string",
                //         name: "string",
                //         originalName: "string",
                //         price: 0,
                //         size: 0,
                //         quantity: 0,
                //         sortOrder: 0
                //       }
                //     ],
                //     toppingsSplit: [
                //       {
                //         keyValue: "string",
                //         name: "string",
                //         originalName: "string",
                //         price: 0,
                //         size: 0,
                //         quantity: 0,
                //         sortOrder: 0
                //       }
                //     ],
                //     quantity: 0,
                //     price: 0,
                //     menuKeyValue: "string",
                //     createdDate: "2020-08-05T10:24:52.911Z",
                //     createdBy: "string",
                //     crust: {
                //       keyValue: "string",
                //       name: "string",
                //       originalName: "string",
                //       price: 0,
                //       size: 0,
                //       quantity: 0,
                //       sortOrder: 0
                //     },
                //     sauce: {
                //       keyValue: "string",
                //       name: "string",
                //       originalName: "string",
                //       price: 0,
                //       size: 0,
                //       quantity: 0,
                //       sortOrder: 0
                //     },
                //     cheese: {
                //       keyValue: "string",
                //       name: "string",
                //       originalName: "string",
                //       price: 0,
                //       size: 0,
                //       quantity: 0,
                //       sortOrder: 0
                //     }
                //   }
                // ],
                // sideOrders: [
                //   {
                //     id: 0,
                //     orderNo: 0,
                //     keyValue: "string",
                //     name: "string",
                //     originalName: "string",
                //     size: "string",
                //     price: 0,
                //     quantity: 0,
                //     createdDate: "2020-08-05T10:24:52.911Z"
                //   }
            //     ],
            //     drinks: [
            //       {
            //         id: 0,
            //         orderNo: 0,
            //         keyValue: "string",
            //         name: "string",
            //         originalName: "string",
            //         size: "string",
            //         price: 0,
            //         quantity: 0,
            //         createdDate: "2020-08-05T10:24:52.911Z"
            //       }
            //     ],
            //     isTvennuTilbod: true
            //   }
            ],
            payment: {
              paymentMethod: "OnSite",
              paymentProvider: "string",
              recipient: "string"
            }
        }).then((response)=>{
            console.log(response,'rrr')
        })
    }
    

    

    data = [
        {
          label: 
        <Image
          source={require('../assets/images/aur.png')}  
          style={{width:40,height:34,resizeMode:'contain'}}
        />  
         },
         {
          label: 
          <Image
          source={require('../assets/images/kas.png')}
          style={{width:60,height:34,resizeMode:'contain'}}
        /> 
         },
         {
            label: 
            <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'bold'}}>Simminn Pay</Text>
         },
         {
            label: 
            <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'bold'}}>Upon delivery/pickup</Text>
         }
        ];

        applycoupon=()=>{
            
            this.setState({coupon:!this.state.coupon,couponprice:20})
            if(this.state.coupon==false){
            const discountamount = (this.total * 20) /100
            this.setState({totalamount:this.total-discountamount,discountamount:discountamount})
            }else
            {
                this.setState({totalamount:this.total})
            }
        }

        placeorder=()=>{
            this.props.navigation.navigate('Complete')
        }


    render() {
        // console.log(this.state.coupon)
        const {coupon,couponprice,totalamount,discountamount} = this.state;
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
            <View style={{height:'100%',width:'100%',backgroundColor:'#fff'}}>
            <View style={Styles.mainstyle}>
                   
                    <TouchableOpacity 
                    style={{width:35,height:35,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>this.props.navigation.goBack()}>
                    <Image
                    source={require('../assets/images/back.png')}
                    style={{width:20,height:14,resizeMode:'contain'}}
                    />
                    </TouchableOpacity>
                    <Text style={Styles.Textstyle}>Pay</Text>
            </View>

            <View style={{paddingVertical:20,paddingLeft:30}}>
                <Text style={{
                    fontFamily:'Avenir',
                    fontSize:18,
                    
                }}>
                    HOW DO YOU WANT TO PAY ?
                </Text>
            <View>
            <RadioButtonRN
                data={this.data}
                selectedBtn={(data) => console.log(data.label)}
                boxStyle={Styles.radioboxstyle}
                box={false}
                activeColor={'#E73131'}
                deactiveColor={'#000'}
            />
            </View>
            <View style={{marginVertical:20}}>
        {coupon==false?
            <Text style={{fontSize:18,fontFamily:'Avenir',fontWeight:'bold'}}>COUPON</Text>
            :
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.applycoupon()}>
            <View style={{height:30,width:30,backgroundColor:'#E73131',borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                    <Image
                    source={require('../assets/images/right.png')}
                    style={{width:20,height:14,resizeMode:'contain'}}
                    />
            </View>
            </TouchableOpacity>
            <Text style={{fontSize:18,fontFamily:'Avenir',fontWeight:'bold',paddingLeft:10}}>COUPON APPLIED</Text>
            </View>
      }
            
            <View style={[Styles.inputcontainer,{marginTop:20}]}>
                <TextInput
                    placeholder='Enter your coupon here'
                    style={{height:60,width:'60%',fontFamily:'Avenir',fontSize:18}}
                    maxLength={10}
                />
                {coupon==false?
                     <TouchableOpacity onPress={()=>this.applycoupon()}>
                     <View style={Styles.buttonstyle}>
                         <Text style={{fontFamily:'Avenir',fontSize:20,fontWeight:'bold',color:'#fff'}}>APPLY</Text>
                     </View>
                     </TouchableOpacity>
                :
                    
                     <View style={[Styles.buttonstyle,{backgroundColor:'grey'}]}>
                         <Text style={{fontFamily:'Avenir',fontSize:20,fontWeight:'bold',color:'#fff'}}>APPLIED</Text>
                     </View>
                    
                }
           
            </View>
            </View>
                    
            </View>
            <View style={{paddingTop:'10%'}}>
            
            {coupon==true?
            <View style={[Styles.bigbuttonStyle]}>
            <Text style={Styles.bigtextStyle}>COUPON DISCOUNT [{couponprice} %]</Text>
            <Text style={Styles.bigtextStyle}>{discountamount} Kr.</Text>      
                        
            </View>
            :null}
            <View style={Styles.bigbuttonStyle}>
            <Text style={Styles.bigtextStyle}>TOTAL</Text>
             <Text style={Styles.bigtextStyle}> {totalamount} Kr.</Text>    
                        
            </View>

            <TouchableOpacity onPress={this.placeorder}>
            <View style={[Styles.bigbuttonStyle,{justifyContent:'center'}]}>
            <Text style={[Styles.bigtextStyle]}>PLACE ORDER</Text>          
            </View>
            </TouchableOpacity>
            </View>

            </View>
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create ({
    mainstyle: {
        height:'7%',
        width:'100%',
        backgroundColor:'#E73131',
        flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:5
    },
    Textstyle: {
        color:'#ffffff',
        fontSize:18,
        fontWeight:'500',
        paddingLeft:'42%',
        fontFamily:'Avenir'
    },
    radioboxstyle:{
        height:50,
        borderBottomWidth:0.4,
        width:'90%'
    },
    inputcontainer:{
        borderWidth:0.4,
        height:60,
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        borderRadius:5

    },
    buttonstyle:{
        width:120,
        height:40,
        backgroundColor:'#E73131',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    bigbuttonStyle: {
        width: 360,
        alignSelf: 'center',
        backgroundColor: '#E63C2F',
        flexDirection:'row',
        height:55,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent:'space-between',
        marginBottom:20,
        paddingHorizontal:20
        
    },
    bigtextStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight:'bold',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Avenir',
        color:'#fff'
        
    }
})

export default Checkout;