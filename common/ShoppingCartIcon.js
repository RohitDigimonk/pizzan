import React, {Component} from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class ShoppingCartIcon extends Component {
   render(){
    return(
    <View style={[Styles.container,this.props.addtocart.length > 0?{width:40}:null]}>
        {/* <Image
        source={props}
        style={{width:20,height:22,marginLeft:10}}
        />  */}
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
        <View style={{position:'absolute',height:30,width:35,borderRadius:15,marginLeft:20,zIndex:9999}}>
            {this.props.addtocart.length > 0?
            <View style={{backgroundColor:'green',height:20,width:20,borderRadius:20/2,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Avenir',fontSize:14,color:'#fff'}}>{this.props.addtocart.length}</Text>
            </View>
            :null}
        </View>
        <View style={{justifyContent:'flex-end',alignItems:'flex-end',height:30,width:30}}>
       
        <Image
            source={require('../assets/images/cart.png')}
            style={{width:27,height:23,resizeMode:'contain',alignItems:'flex-start',justifyContent:'flex-start'}}
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
        // backgroundColor:'blue',
        width:30,
        height:30,
        top:-5
    }
})

function mapStateToProps(state){
    // console.log(state.addtocart)
    return {
        addtocart: state.addtocart
    }
}

export default connect(mapStateToProps)(withNavigation(ShoppingCartIcon));