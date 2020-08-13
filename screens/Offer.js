import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';
import Header from '../common/Header';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { offerlist,pizzalist } from '../store/actions';
import LottieView from 'lottie-react-native';
import stringsoflanguages from './Language';

class Offer extends Component{
    state={day:'',hours:'',min:'',offerlength:'',offerdata:[],status:''}

    

    imagebaseurl='https://assets.pizzan.is/images/offers/'

    componentDidMount=()=>{
       
        this.currentdatetime();
        axios.get('https://s1-api.pizzan.is/api/v1/offers?onlyActive=true')
        .then((response)=>{
            console.log(response)
            const data = response.data
            const status = response.status
            this.setState({offerdata:data,status:status})
        })
    }

    currentdatetime=()=>{
        var now = new Date();
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var day = days[ now.getDay() ];
        var month = months[ now.getMonth() ];
        var hours = now.getHours(); 
        var min = now.getMinutes(); 
        var sec = now.getSeconds(); 
        this.setState({day:day,hours:hours,min:min})

        // console.log(hours,min,sec)
    }

    selectoffer=(offerdata)=>{
        if(offerdata.useMinimumPrice==false){
            this.props.navigation.navigate('Pizzasize',{offerdata})
        }
        else if(offerdata.keyValue=="TILBOD_1"||offerdata.keyValue=="TILBOD_2"||offerdata.keyValue=="TILBOD_3"||offerdata.keyValue=='TILBOD_TUESDAY'){
            // console.log(offerdata,'rohit')
            const length = offerdata.offerDetails.length
            this.setState({offerlength:length})
            this.props.navigation.navigate('Tilbodoffer',{length,offerdata})
        }
        else if(offerdata.keyValue=="TILBOD_C"){
            // console.log(offerdata)
            const price = offerdata.minimumPrice
            const sizeno = 16
            const length = offerdata.offerDetails.length
            this.props.navigation.navigate('Tilbodcoffer',{length,offerdata,price,sizeno})
        }
        else if(offerdata.keyValue=="TILBOD_FAM"){
            // console.log(offerdata)
            const length = offerdata.offerDetails.length
            this.props.navigation.navigate('Fjolskyoffer',{length,offerdata})
        }
        
        else{
            // console.log(offerdata,'situ')
            const length = offerdata.offerDetails.length
            this.setState({offerlength:length})
            this.props.navigation.navigate('Offerpizza',{length,offerdata})
         const data = offerdata.offerDetails[0]
        }
        
    }

    render(){
        // console.log(this.state.offerdata)
        const {day,hours,min} = this.state;
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
                 <ImageBackground
                source={require('../assets/images/full_background.png')}
                style={{width:'100%',height:'100%'}}
               
                >
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={stringsoflanguages.offer}
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
                        <View style={{justifyContent:'center',alignItems:'center',paddingTop:20}}>
                        <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'600',color:'#E73131'}}>{stringsoflanguages.takeaway}</Text>
                        </View>
              {
                  this.state.offerdata.map(offerdata=>{
                      const timefrom = offerdata.timeActiveFrom
                      const timefromsplit  = timefrom.split(':') 
                      const timefromhour = timefromsplit[0]
                      const timefromminute = timefromsplit[1]

                      const timeto = offerdata.timeActiveTo
                      const timetosplit  = timeto.split(':') 
                      const timetohour = timetosplit[0]
                      const timetominute = timetosplit[1]

                    //   console.log(timefromhour,timefromminute,hours,min)


                      const detail = offerdata.summary.split('<br />')
                      
                        
                      return(
                       offerdata.deliveryMethodId==2 && offerdata.activeDays.includes(day) && hours >= timefromhour && hours <= timetohour ?
                <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.selectoffer(offerdata)}>
                <View style={Styles.maincontainer}>
                        <View style={{flexDirection:"row"}}>
                        <View>
                        <ImageBackground
                        source={require('../assets/images/offer-tag.png')}
                        style={{width:95,height:28,justifyContent:'center',alignItems:'center'}}
                        >
                            <Text style={{fontFamily:'Avenir'}}>{offerdata.deliveryMethodName}</Text>
                        </ImageBackground>
                        <View style={{width:'70%'}}>
                        <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{offerdata.name}</Text>
                        </View>
                      {
                          detail.map(detail=>
                            <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{detail}</Text>
                            )
                      }
                      </View>
                      <View>
                      {/* <Text>{this.imagebaseurl+offerdata.imageName}</Text> */}
                      <Image
                        source={{uri:this.imagebaseurl+offerdata.imageName}}
                        style={{width:150,height:160,resizeMode:'contain'}}
                      />
                      </View>
                      </View>
                      <View style={Styles.bottomview}>
                        <View>
                            <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                            
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:'Avenir',fontWeight:'700'}}>{offerdata.minimumPrice} kr.</Text>
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:10,height:16,marginLeft:10}}
                            />
                        </View>
                      </View>
                </View>
                </TouchableOpacity>
                </View>

                
                        
                      :null)}
                  )
              }
              <View style={{justifyContent:'center',alignItems:'center',paddingTop:40}}>
                        <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'600',color:'#E73131'}}>{stringsoflanguages.delivery}</Text>
                        </View>
              {
                  this.state.offerdata.map(offerdata=>{
                      const timefrom = offerdata.timeActiveFrom
                      const timefromsplit  = timefrom.split(':') 
                      const timefromhour = timefromsplit[0]
                      const timefromminute = timefromsplit[1]

                      const timeto = offerdata.timeActiveTo
                      const timetosplit  = timeto.split(':') 
                      const timetohour = timetosplit[0]
                      const timetominute = timetosplit[1]

                    //   console.log(timefromhour,timefromminute,hours,min)


                      const detail = offerdata.summary.split('<br />')
                      
                        
                      return(
                       offerdata.deliveryMethodId==3 && offerdata.activeDays.includes(day) && hours >= timefromhour  && hours <= timetohour ? 
                <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.selectoffer(offerdata)}>
                <View style={Styles.maincontainer}>
                        <View style={{flexDirection:"row"}}>
                        <View>
                        <ImageBackground
                        source={require('../assets/images/offer-tag.png')}
                        style={{width:95,height:28,justifyContent:'center',alignItems:'center'}}
                        >
                            <Text style={{fontFamily:'Avenir'}}>{offerdata.deliveryMethodName}</Text>
                        </ImageBackground>
                        <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{offerdata.name}</Text>
                      {
                          detail.map(detail=>
                            <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{detail}</Text>
                            )
                      }
                      </View>
                      <View>
                      {/* <Text>{this.imagebaseurl+offerdata.imageName}</Text> */}
                      <Image
                        source={{uri:this.imagebaseurl+offerdata.imageName}}
                        style={{width:150,height:160,resizeMode:'contain'}}
                      />
                      </View>
                      </View>
                      <View style={Styles.bottomview}>
                        <View>
                            <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                            
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:'Avenir',fontWeight:'700'}}>{offerdata.minimumPrice} kr.</Text>
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:10,height:16,marginLeft:10}}
                            />
                        </View>
                      </View>
                </View>
                </TouchableOpacity>
                </View>

                
                        
                      :null)}
                  )
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
        paddingHorizontal:20
    }
})

function mapStateToProps(state){
    // console.log(state.offer)
    return {
        offer: state.offer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({offerlist,pizzalist},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Offer);

