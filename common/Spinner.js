import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = ({ size,color,backgroundcolor }) => {
    return (
        <View style={[styles.spinnerStyle,{backgroundColor:backgroundcolor}]}>
                <ActivityIndicator size={size || 'large'} color={color} />
        </View>
    )
}

const styles = {
    spinnerStyle: {
        width: '95%',
        alignSelf: 'center',
        // borderRadius: 30,
        height:50,
        alignItems:"center",
        // marginLeft: 5,
        // marginRight: 5,
        justifyContent: 'center',
        marginBottom: 20
        
    }
}


export {Spinner};