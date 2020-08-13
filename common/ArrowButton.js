import React from 'react';
import { Text, TouchableOpacity, StyleSheet,Image } from 'react-native';


const ArrowButton = ({ onPress, children,backgroundColor }) => {
    return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle,{backgroundColor:backgroundColor}]}>
        <Image
        source={require('../assets/images/side_right.png')}
        style={{width:10,height:16}}
        />
    </TouchableOpacity>
    );

};

const styles = StyleSheet.create ({
    buttonStyle: {
        width: 50,
        alignSelf: 'center',
        // backgroundColor: '#E73131',
        borderRadius: 50,
        height:50,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        marginBottom:20
        
    },
    // textStyle: {
    //     textAlign: 'center',
    //     color: '#ffffff',
    //     fontSize: 18,
    //     fontWeight: '600',
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     // fontFamily: 'Poppins'
        
    // }


});

export { ArrowButton };