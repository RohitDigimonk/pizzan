import React, {Component} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../common/Header';
import axios from 'axios';
import {Big_button, Footer} from '../common';
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../common/CommonStyle';
import stringsoflanguages from './Language';

class Takeaway extends Component{
    state = {data:[]}

    componentDidMount=()=>{
        axios.get('https://s1-api.pizzan.is/api/v1/branches')
        .then((response)=>{
            const data = response.data
            this.setState({data:data})
            console.log(data)
        })
    }


    render(){
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
            <View style={{height:'100%',width:'100%',backgroundColor:'#f2f2f2'}}>
                <Header 
                menupress={()=>this.props.navigation.goBack()}
                title={'Take away'}
                sideicon={require('../assets/images/back.png')}
                notificationicon={require('../assets/images/notification.png')}
                carticon={require('../assets/images/cart.png')}
                profileicon={require('../assets/images/profile.png')}
                >
                    
                </Header>
                <ScrollView
                
                >
                    {
                        this.state.data.map(data=>{
                            var opentimesplit = data.openingTime.split('T')
                            var opentime = opentimesplit[1]
                            var timesplit = opentime.split(':')
                            var openhour = timesplit[0]
                            var openminute = timesplit[1]
                            var closetimesplit = data.closingTime.split('T')
                            var closetime = closetimesplit[1]
                            var ctimesplit = closetime.split(':')
                            var closehour = ctimesplit[0]
                            var closeminute = ctimesplit[1]
                            // console.log(openhour,openminute)
                            return(
                             data.isActive==true?   
                        <View style={Styles.restaurantview}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}}>
                                <View style={{width:'60%'}}>
                            <Text style={{fontFamily:'Avenir',fontSize:22,fontWeight:'700',letterSpacing:1}}>{data.street}</Text>
                            <Text style={{fontFamily:'Avenir'}}>{data.town}</Text>
                            <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.open} {openhour}:{openminute} - {closehour}:{closeminute}</Text>
                            {/* <Text>{data.closingTime}</Text> */}
                                </View>
                                <View style={{justifyContent:'center',alignItems:"center"}}>
                                    <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'300'}}>{stringsoflanguages.waitingtime}</Text>
                        <Text style={{fontFamily:'Avenir',color:'#E73131',paddingTop:8}}>{data.pickUpWaitingTime}-{data.pickUpWaitingTime+5} min</Text>
                                </View>
                            </View>
                        </View>
                        
                        :null);
                        })
                    }
                </ScrollView>
                <View>
                    <Footer
                        homepress={()=>this.props.navigation.navigate('Dashboard')}
                        selectionid='location'
                    />
                </View>
            </View>
            </SafeAreaView>
        );
    }
}




export default Takeaway;