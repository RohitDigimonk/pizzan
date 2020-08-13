import React, {Component} from 'react';
import {View,Text,Image, SafeAreaView,StyleSheet,ImageBackground} from 'react-native';
import Header from '../common/Header';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import stringsoflanguages from './Language';

class Category extends Component{
    render(){
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 title={stringsoflanguages.selectcategory}
                 sideicon={require('../assets/images/menu.png')}
                 menupress={this.props.navigation.toggleDrawer}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
                 profilepress={()=>this.props.navigation.navigate('Delivery')}
               />
               <ImageBackground
                source={require('../assets/images/full_background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >
                <ScrollView>
               <View style={Styles.mainView}>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Lastorder')}>
                   <View style={Styles.maincontainer}>
                        <Image
                        source={require('../assets/images/lastorder.png')}
                        style={Styles.imagestyle}
                        />
                        <Text style={{fontFamily:'Avenir',color:'#E73131',fontSize:18,paddingTop:10}}>{stringsoflanguages.lastorder}</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Offer')}>
                    <View style={Styles.maincontainer}>
                        <Image
                            source={require('../assets/images/offer.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{fontFamily:'Avenir',color:'#E73131',fontSize:18,paddingTop:10}}>{stringsoflanguages.offer}</Text>
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
                            <Text style={{fontFamily:'Avenir',color:'#E73131',fontSize:18,paddingTop:10}}>Pizza</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Sides')}>
                   <View style={Styles.maincontainer}>
                   <Image
                            source={require('../assets/images/sides.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{fontFamily:'Avenir',color:'#E73131',fontSize:18,paddingTop:10}}>Sides</Text>
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
                            <Text style={{fontFamily:'Avenir',color:'#E73131',fontSize:18,paddingTop:10}}>Drinks</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Makeyourown')}>
                   <View style={Styles.maincontainer}>
                   <Image
                            source={require('../assets/images/makeyourown.png')}
                            style={Styles.imagestyle}
                        />
                            <Text style={{fontFamily:'Avenir',color:'#E73131',fontSize:18,paddingTop:10,textAlign:'center'}}>{stringsoflanguages.makeyourownpizza}</Text>
                   </View>
                </TouchableOpacity>
               </View>
               </ScrollView>
               </ImageBackground>
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
        marginTop:30
    },
    maincontainer: {
        borderWidth:1,
        shadowOpacity:0.2,
        borderRadius:5,
        borderColor:'lightgrey',
        justifyContent:'center',
        alignItems:'center',
        height:150,
        width:150,
        margin:10,
        backgroundColor:'#fff'
    },
    imagestyle: {
        width:49,
        height:68,
        resizeMode:'contain'
    }
})

export {Category};