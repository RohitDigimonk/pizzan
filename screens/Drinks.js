import React, {Component} from 'react';
import {Text,View, SafeAreaView,StyleSheet,Image,ImageBackground,AsyncStorage} from 'react-native';
import Header from '../common/Header';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { drinkslist,addtocart } from '../store/actions';
import LottieView from 'lottie-react-native';
import stringsoflanguages from './Language';
import Modal from 'react-native-modal';
import styles from '../common/CommonStyle';



class Drinks extends Component{

    state= {drinksdata:[],status:'',cartmodal:false}

    imagebaseurl='https://assets.pizzan.is/images/drinks/'

    

    componentDidMount = () => {
        
        this.loadSession();
            
    }

    loadSession = async() => {
        const lang = await AsyncStorage.getItem('language')
        this.setState({
          lang:await AsyncStorage.getItem('language')
        })
        axios.get('https://s1-api.pizzan.is/api/v1/drinks',
        {headers:{'Accept-language':lang}}
        )
        .then((response)=>{
            const data = response['data']
            const status = response.status
            this.setState({drinksdata:data,status:status})
        })
    }

    addtocart = (data) => {
        this.setState({cartmodal:true})
            // console.log(data)
            const name = []
            const size = ''
            const sidesname = []
            const price = data.price
            const keyValue = name+size
            const toppingname = []
            const selecteddrinks = []
            selecteddrinks.push({drinksdetail:data})
            const addpizza = {ownpizza:false,name:name,size:size,price:price,keyValue,toppingname:toppingname,selectedsides:sidesname,
                selecteddrinks:selecteddrinks}
            this.props.addtocart(addpizza)
            this.setState({orderprice:addpizza.price})
            setTimeout(()=>{this.setState({cartmodal: false})}, 2000)
            
    }


    render(){
        // console.log(this.state.drinksdata)
        
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
                <ImageBackground
                source={require('../assets/images/full_background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >
            <View style={{height:'100%',width:'100%'}}>
            <Modal
                isVisible={this.state.cartmodal}
                backdropColor="#000"
                backdropOpacity={0.8}
                animationInTiming={400}
                animationOutTiming={800}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={400}
                onBackdropPress={()=>this.setState({cartmodal:false})}
                >
                <View style={{height:'100%',justifyContent:'flex-end',backgroundColor:'transparent'}}> 
                <View style={styles.cartdesign}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image
                      source={require('../assets/images/cart.png')}
                      style={{width:27,height:23,marginBottom:5,marginRight:2}}
                    />
                   <Text style={{paddingLeft:10,color:'#fff'}}>1 Order Added</Text>
                   </View>
                   <View>
                     <Text style={{color:'#fff'}}>{this.state.orderprice} Kr.</Text>
                   </View>
        
                </View>
                </View>
                </Modal>
               <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={'DRINKS'}
                 sideicon={require('../assets/images/back.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
                 profilepress={()=>this.props.navigation.navigate('Delivery')}
               />
                 
                    {this.state.status==''?
                    <LottieView
                    source={require('../assets/lottie/pizza_loader.json')}
                    autoPlay
                    loop
                    >

                    </LottieView>
               :<ScrollView>
               {

                   this.state.drinksdata.map(drinksdata=>{
                       var drinksname = drinksdata.name.split(' ')
                    //    console.log(drinksdata)
                       return(
                        <View style={{alignItems:'center'}}>
                        <View style={Styles.maincontainer}>
                                <View style={{flexDirection:"row"}}>
                                <View>
                                
                                <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{drinksname[0]+' '+drinksname[1]}</Text>
                             
                                 
                                <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200,paddingTop:10}}>{drinksdata.size}</Text>
                              
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
                                    <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                                    
                                </View>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontFamily:'Avenir',fontWeight:'700'}}>{drinksdata.price} kr.</Text>
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
                    }
               
            </View>
            </ImageBackground>
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

