import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Footer1 = ({ onPress, children }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        {/* <Text style={styles.textStyle}> */}
            {children}
        {/* </Text> */}
    </TouchableOpacity>
    );

};

const styles = StyleSheet.create ({
    buttonStyle: {
        width: 140,
        alignSelf: 'center',
        backgroundColor: '#E73131',
        // borderRadius: 30,
        height:55,
        alignItems:"center",
        marginLeft: 1,
        marginRight: 1,
        justifyContent: 'center',
        // marginBottom:20
        
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

export {Footer1};