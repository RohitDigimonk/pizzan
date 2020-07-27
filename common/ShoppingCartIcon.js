import React, {Component} from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class ShoppingCartIcon extends Component {
   render(){
    return(
    <View style={Styles.container}>
        {/* <Image
        source={props}
        style={{width:20,height:22,marginLeft:10}}
        />  */}
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
        <View style={{position:'absolute',height:35,width:30,borderRadius:15,top:-3,marginLeft:20,zIndex:9999}}>
    <Text style={{fontSize:18}}>{this.props.addtocart.length}</Text>
        </View>
        <View style={{justifyContent:'flex-end',alignItems:'flex-end',height:30,width:30}}>
       
        <Image
            source={require('../assets/images/cart.png')}
            style={{width:27,height:23,marginBottom:5,marginRight:2}}
        />
       
        </View>
        </TouchableOpacity>
    </View>
    
    )}
}
const Styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent:'center',
        // alignItems:'center'
        // height:22,
        // width:20
    }
})

function mapStateToProps(state){
    // console.log(state.addtocart)
    return {
        addtocart: state.addtocart
    }
}

export default connect(mapStateToProps)(withNavigation(ShoppingCartIcon));