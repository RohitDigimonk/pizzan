import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const Big_button = ({ onPress, children,backgroundColor,textcolor }) => {
    return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle,{backgroundColor:backgroundColor}]}>
        <Text style={[styles.textStyle,{color:textcolor}]}>
            {children}
        </Text>
    </TouchableOpacity>
    );

};

const styles = StyleSheet.create ({
    buttonStyle: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#E63C2F',
        // borderRadius: 30,
        height:50,
        alignItems:"center",
        // marginLeft: 5,
        // marginRight: 5,
        justifyContent: 'center',
        marginBottom:20
        
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Avenir'
        
    }


});

export { Big_button };