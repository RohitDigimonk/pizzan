import React from 'react';
import {Text, TouchableOpacity, StyleSheet,Image,View} from 'react-native';
import stringsoflanguages from '../screens/Language';

const Footer = ({ homepress, trackerpress, locationpress,selectionid}) => {
    return (
    <View style={styles.buttonStyle}>
    <TouchableOpacity style={styles.touchablestyle} onPress={homepress}>
       {selectionid=='dashboard'?
       <Image
       source={require('../assets/images/home.png')}
       style={{width:35,height:30,resizeMode:'contain'}}
       />
       :<Image
            source={require('../assets/images/home-inactive.png')}
            style={{width:23,height:22,resizeMode:'contain'}}
            />
       }
            <Text style={[styles.buttontext,selectionid!='dashboard'?{color:'#FF7A70'}:null]}>{stringsoflanguages.home}</Text>
    </TouchableOpacity>
    <View style={{width:1,height:'90%',backgroundColor:'#000'}} />
    <TouchableOpacity style={styles.touchablestyle} onPress={trackerpress}>
    {selectionid=='trackerpress'?
       <Image
       source={require('../assets/images/tracker-active.png')}
       style={{width:35,height:30,resizeMode:'contain'}}
       />
       :<Image
            source={require('../assets/images/tracker-inactive.png')}
            style={{width:23,height:22,resizeMode:'contain'}}
            />
       }
        <Text style={[styles.buttontext,selectionid!='trackerpress'?{color:'#FF7A70'}:null]}>{stringsoflanguages.tracker}</Text>
    </TouchableOpacity>
    <View style={{width:1,height:'90%',backgroundColor:'#000'}} />
    <TouchableOpacity style={styles.touchablestyle} onPress={locationpress}>
    {selectionid=='location'?
       <Image
       source={require('../assets/images/location-active.png')}
       style={{width:35,height:30,resizeMode:'contain'}}
       />
       :<Image
            source={require('../assets/images/location-inactive.png')}
            style={{width:23,height:22,resizeMode:'contain'}}
            />
       }
        <Text style={[styles.buttontext,selectionid!='location'?{color:'#FF7A70'}:null]}>{stringsoflanguages.location}</Text>
    </TouchableOpacity>
    </View>
    );

};

const styles = StyleSheet.create ({
    buttonStyle: {
        width: '100%',
        backgroundColor: '#E73131',
        flexDirection:'row',
        height:55,
        alignItems:"center",
        marginLeft: 1,
        marginRight: 1,
        justifyContent:'space-around',
        paddingHorizontal:5
        
    },
    touchablestyle: {
        alignItems:'center'
    },
    buttontext: {
        fontSize:18,
        color:'#ffffff',
        fontFamily:'Avenir'
        }


});

export {Footer};