import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../common/Header';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

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
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
                <Header 
                title={'Take away'}
                sideicon={require('../assets/images/menu.png')}
                notificationicon={require('../assets/images/notification.png')}
                carticon={require('../assets/images/cart.png')}
                >
                    
                </Header>
                <ScrollView>
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
                                <View>
                            <Text style={{fontSize:22,fontWeight:'700',letterSpacing:1}}>{data.street}</Text>
                            <Text>{data.town}</Text>
                            <Text>Open {openhour}:{openminute} - {closehour}:{closeminute}</Text>
                            {/* <Text>{data.closingTime}</Text> */}
                                </View>
                                <View style={{justifyContent:'center',alignItems:"center"}}>
                                    <Text style={{fontSize:18,fontWeight:'300'}}>Waiting Time</Text>
                        <Text style={{color:'#E73131',paddingTop:8}}>{data.pickUpWaitingTime}-{data.pickUpWaitingTime+5} min</Text>
                                </View>
                            </View>
                        </View>
                        
                        :null);
                        })
                    }
                </ScrollView>
                
            </View>
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    restaurantview: {
        height:'25%',
        width:'95%',
        borderWidth:1,
        borderColor:'grey',
        backgroundColor:'#ffffff',
        marginVertical:4,
        marginHorizontal:10
    }
})


export default Takeaway;