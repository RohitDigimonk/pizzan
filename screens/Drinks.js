import React, {Component} from 'react';
import {Text,View, SafeAreaView,StyleSheet,Image} from 'react-native';
import Header from '../common/Header';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { drinkslist,addtocart } from '../store/actions';



class Drinks extends Component{

    state= {drinksdata:[]}

    imagebaseurl='https://assets.pizzan.is/images/drinks/'

    

    componentDidMount = () => {
        axios.get('https://s1-api.pizzan.is/api/v1/drinks')
        .then((response)=>{
            const data = response['data']
            this.setState({drinksdata:data})
        })
        
            
    }

    addtocart = (data) => {
            // console.log(data)
            const name = []
            name.push(data.name)
            const size = ''
            const sidesname = []
            const price = data.price
            const keyValue = name+size
            const toppingname = []
            const selecteddrinks = []
            const addpizza = {name:name,size:size,price:price,keyValue,toppingname:toppingname,selectedsides:sidesname,
                selecteddrinks:selecteddrinks}
            this.props.addtocart(addpizza)
            
    }


    render(){
        // console.log(this.props)
        
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'DRINKS'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
               <ScrollView>
               {

                   this.state.drinksdata.map(drinksdata=>{
                       var drinksname = drinksdata.name.split(' ')
                    //    console.log(drinksdata)
                       return(
                        <View style={{alignItems:'center'}}>
                        <View style={Styles.maincontainer}>
                                <View style={{flexDirection:"row"}}>
                                <View>
                                
                                <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>{drinksname[0]+' '+drinksname[1]}</Text>
                             
                                 
                                <Text style={{paddingLeft:10,width:200,paddingTop:10}}>{drinksdata.size}</Text>
                              
                              </View>
                              <View>
                            
                              <Image
                                source={{uri:this.imagebaseurl+drinksdata.imageName}}
                                style={{width:150,height:160,resizeMode:'contain'}}
                              />
                              </View>
                              </View>
                              <View style={Styles.bottomview}>
                                <TouchableOpacity onPress={()=>this.addtocart(drinksdata)}>
                                <View>
                                    <Text>Add to order</Text>
                                    
                                </View>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontWeight:'700'}}>{drinksdata.price} kr.</Text>
                                    <Image
                                    source={require('../assets/images/rightarrow.png')}
                                    style={{width:10,height:16,marginLeft:10}}
                                    />
                                </View>
                              </View>
                        </View>
                        </View>
                       );
                   })
               }
               </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

const Styles=StyleSheet.create({
   
    maincontainer: {
        borderWidth:1,
        // shadowOpacity:0.2,
        borderRadius:5,
        borderColor:'lightgrey',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        height:180,
        width:370,
        margin:10,
        backgroundColor:'#ffffff'
    },
    bottomview: {
        height:30,
        backgroundColor:'lightgrey',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        bottom:0
    }
})

function mapStateToProps(state){
    // console.log(state.drinks)
    return {
        drinks: state.drinks
    }
}

function mapDispatchToProps(dispatch){
        return bindActionCreators({drinkslist,addtocart},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Drinks);

