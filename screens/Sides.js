import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet,Image,ImageBackground, TouchableOpacity,AsyncStorage} from 'react-native';
import Header from '../common/Header';
import axios from'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sideslist,addtocart } from '../store/actions';
import LottieView from 'lottie-react-native';
import stringsoflanguages from './Language';
import Modal from 'react-native-modal';
import styles from '../common/CommonStyle';

class Sides extends Component{

    state={lang:'',sidesdata:[],status:'',cartmodal:false}

   

    imagebaseurl='https://assets.pizzan.is/images/sides/'

    

    componentDidMount=()=>{
       
        this.loadSession();
       
    }

    loadSession = async() => {
        const lang = await AsyncStorage.getItem('language')
        this.setState({
          lang:await AsyncStorage.getItem('language')
        })

        axios.get('https://s1-api.pizzan.is/api/v1/sideorders',
        {headers:{'Accept-language':lang}}
        )
        .then((response)=>{
            console.log(response)
            const data = response['data']
            const status = response.status
            this.setState({sidesdata:data,status:status})
        })

        // console.log(this.state.lang)
      }

      addtocart=(sidesdata)=>{
        // console.log(sidesdata)
        this.setState({cartmodal:true})
        const name = []
        const sidesname = []
        sidesname.push({sidedetail:sidesdata.name})
        const selecteddrinks = []
        const price = sidesdata.price
        const size = sidesdata.size
        const keyValue = name+size
        const toppingname = []
       
        const addpizza = {ownpizza:false,name:name,size:size,price:price,keyValue:keyValue,toppingname:toppingname,selectedsides:sidesname
                          ,selecteddrinks:selecteddrinks}
        this.props.addtocart(addpizza)
        this.setState({orderprice:addpizza.price})
        setTimeout(()=>{this.setState({cartmodal: false})}, 2000)
       
      
     }

    render(){
        // console.log(this.state.lang)
        const {lang} = this.state;
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
                 title={'SIDES'}
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
                       this.state.sidesdata.map(sidesdata=>{
                        //    console.log(sidesdata)
                        
                           return(
                            sidesdata.sortOrder > 0 ?
                        <View style={{alignItems:'center'}}>
                        <View style={Styles.maincontainer}>
                                <View style={{flexDirection:"row"}}>
                                <View style={{width:'60%'}}>
                                
                                <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>
                                    {/* {lang=='en'?sidesdata.name:sidesdata.originalName} */}
                                    {sidesdata.name}
                                    </Text>
                             
                                 
                                <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{sidesdata.description}</Text>
                              
                              </View>
                              <View>
                            
                              <Image
                                source={{uri:this.imagebaseurl+sidesdata.imageName}}
                                style={{width:150,height:160,resizeMode:'contain'}}
                              />
                              </View>
                              </View>
                              
                              <View style={Styles.bottomview}>
                                <TouchableOpacity onPress={()=>this.addtocart(sidesdata)}>
                                <View>
                                    <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                                    
                                </View>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontFamily:'Avenir',fontWeight:'700'}}>{sidesdata.price} kr.</Text>
                                    <Image
                                    source={require('../assets/images/rightarrow.png')}
                                    style={{width:10,height:16,marginLeft:10}}
                                    />
                                </View>
                              </View>
                        </View>
                        </View>
                        :null)
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

// function mapStateToProps(state){
//     console.log(state.sides)
//     return {
//         sides: state.sides
//     }
// }

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({sideslist,addtocart},dispatch)
// }


// export default connect(mapStateToProps,mapDispatchToProps)(Sides);

function mapStateToProps(state){
    // console.log(state.pizza)
  return {
    sides: state.sides
  }
}

function mapDispatchToProps(dispatch){
  
  return bindActionCreators({sideslist,addtocart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Sides);
// export default Sides;