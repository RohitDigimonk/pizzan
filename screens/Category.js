import React, {Component} from 'react';
import {View,Text,Image, SafeAreaView,StyleSheet} from 'react-native';
import Header from '../common/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Category extends Component{
    render(){
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 title={'SELECT CATEGORY'}
                 sideicon={require('../assets/images/back.png')}
                 menupress={()=>this.props.navigation.goBack()}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
               <View style={Styles.mainView}>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Lastorder')}>
                   <View style={Styles.maincontainer}>
                        <Image
                        source={require('../assets/images/lastorder.png')}
                        style={Styles.imagestyle}
                        />
                        <Text style={{color:'#E73131',fontSize:18,paddingTop:10}}>Last Order</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Offer')}>
                    <View style={Styles.maincontainer}>
                        <Image
                            source={require('../assets/images/offer.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{color:'#E73131',fontSize:18,paddingTop:10}}>Offer</Text>
                    </View>
                </TouchableOpacity>
               </View>
               <View style={Styles.mainView}>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Pizza')}>
                   <View style={Styles.maincontainer}>
                        <Image
                            source={require('../assets/images/pizza.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{color:'#E73131',fontSize:18,paddingTop:10}}>Pizza</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Sides')}>
                   <View style={Styles.maincontainer}>
                   <Image
                            source={require('../assets/images/sides.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{color:'#E73131',fontSize:18,paddingTop:10}}>Sides</Text>
                   </View>
                </TouchableOpacity>
               </View>
               <View style={Styles.mainView}>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Drinks')}>
                   <View style={Styles.maincontainer}>
                   <Image
                            source={require('../assets/images/drink.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{color:'#E73131',fontSize:18,paddingTop:10}}>Drinks</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Makeyourown')}>
                   <View style={Styles.maincontainer}>
                   <Image
                            source={require('../assets/images/makeyourown.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{color:'#E73131',fontSize:18,paddingTop:10}}>Make your own pizza</Text>
                   </View>
                </TouchableOpacity>
               </View>

            </View>
            </SafeAreaView>
        );
    }
}

const Styles=StyleSheet.create({
    mainView: {
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:50
    },
    maincontainer: {
        borderWidth:1,
        shadowOpacity:0.2,
        borderRadius:5,
        borderColor:'lightgrey',
        justifyContent:'center',
        alignItems:'center',
        height:160,
        width:180,
        margin:10
    },
    imagestyle: {
        width:49,
        height:68,
        resizeMode:'contain'
    }
})

export {Category};