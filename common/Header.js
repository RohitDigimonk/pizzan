import React from 'react';
import {Text,View,StyleSheet,Image, TouchableOpacity} from 'react-native';
import ShoppingCartIcon from './ShoppingCartIcon';
import { withNavigation } from 'react-navigation';



const Header = ({title,sideicon,notificationicon,carticon,profileicon, menupress,profilepress}) => {
    // console.log(userimage)

    

    return(
    <View style={Styles.mainstyle}>
        <TouchableOpacity style={{width:35,height:35,alignItems:'center',justifyContent:'center'}} onPress={menupress}>
        <Image
        source={sideicon}
        style={{width:20,height:14,resizeMode:'contain'}}
        />
        </TouchableOpacity>
        <Text style={Styles.Textstyle}>{title}</Text>
        <View style={{flexDirection:'row'}}>
        <Image
        source={notificationicon}
        style={{width:20,height:22,resizeMode:'contain'}}
        />
         {/* <Image
        source={carticon}
        style={{width:20,height:22,marginLeft:10}}
        /> */}
       
        <ShoppingCartIcon />
        <TouchableOpacity onPress={profilepress}>
       {profileicon!=''?
        <Image
        source={profileicon}
        style={{width:20,height:22,marginLeft:10,resizeMode:'contain'}}
        />:null
        }
        </TouchableOpacity>
        </View>
    </View>
    );
}

const Styles = StyleSheet.create ({
    mainstyle: {
        height:'7%',
        width:'100%',
        backgroundColor:'#E73131',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:5
    },
    Textstyle: {
        color:'#ffffff',
        fontSize:18,
        fontWeight:'500',
        paddingLeft:50,
        fontFamily:'Avenir'
    }
})

export default withNavigation(Header);