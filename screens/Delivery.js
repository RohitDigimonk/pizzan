import React, {Component} from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Big_button} from '../common'
import axios from 'axios';

class Delivery extends Component{

    state={fullname:'',address:'',location:'',comments:''}

    next=()=>{
        if(this.state.fullname==''){
            alert('Please enter a full name')
        }
        else if(this.state.address==''){
            alert('Please enter your address')
        }
        else if(this.state.location==''){
            alert('Please enter your location')
        }
        else {
            this.props.navigation.navigate('Category')
        }
        
    }
    
    render(){
        console.log(this.state.fullname)
        return(
    <SafeAreaView>
    <View style={{height:'100%',width:'100%'}}>
            <View style={Styles.mainstyle}>
        <Image
        source={require('../assets/images/menu.png')}
        style={{width:20,height:14}}
        />
        <Text style={Styles.Headerext}>Delivery</Text>
        <View style={{flexDirection:'row'}}>
        
        </View>
            </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <View style={{height:'93%',width:"100%"}}>
            <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>FULL NAME</Text>
            </View>
            <View style={Styles.maincontainer}>
            <TextInput
                placeholder={"Type your name here"}
                value={this.state.fullname}
                autoCorrect={false}
                onChangeText={fullname=>this.setState({fullname:fullname})}
            />
            </View>
             <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>ADDRESS</Text>
            </View>
            <View style={Styles.maincontainer}>
            <TextInput
                placeholder={"Type your complete address"}
                value={this.state.address}
                autoCorrect={false}
                onChangeText={address=>this.setState({address:address})}
            />
            </View>
             <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>LOCATION</Text>
            </View>
            <View style={Styles.maincontainer}>
            <TextInput
                placeholder='Type your location'
                value={this.state.location}
                autoCorrect={false}
                onChangeText={location=>this.setState({location:location})}
            />
            </View>
             <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>COMMENTS ?</Text>
            </View>
            <View style={Styles.maincontainer2}>
            <TextInput
                placeholder={"Type your comments here"}
                value={this.state.comments}
                autoCorrect={false}
                style={{textAlignVertical:'top',height:160,textAlign:'justify',width:'95%'}}
                multiline={true}
                onChangeText={comments=>this.setState({comments:comments})}

            />
            </View>
            <View style={Styles.inputboxcontainer}>
            <Text style={{fontSize:18}}>Save detail for next order</Text>
            </View>
            <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>WAITING TIME: 35-45 MIN.</Text>
            </View>
            <View style={{paddingTop:20}}>
            <Big_button
            backgroundColor={'#E63C2F'}
            textcolor={'#fff'}
            onPress={()=>this.next()}>NEXT</Big_button>
            </View>
        </View>
        </KeyboardAwareScrollView>
    </View>
    </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create ({
    mainstyle: {
        height:'7%',
        width:'100%',
        backgroundColor:'#E63C2F',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    Headerext: {
        color:'#ffffff',
        fontSize:18,
        fontWeight:'500'
    },
    Textstyle: {
        color: '#000000',
        fontSize:20,
        fontWeight:'700'
        
    },
    inputboxcontainer: {
        justifyContent:'center',
        paddingLeft:22,
        marginTop:25
    },
    
    maincontainer: {
        height: 60,
        width:"90%",
        borderWidth: 2,
        borderColor: 'lightgrey',
        // alignItems:'center',
        justifyContent:'center',
        marginHorizontal:20,
        marginTop:10,
        paddingLeft:10,
        borderRadius:5
    },
    maincontainer2: {
        height: 160,
        width:"90%",
        borderWidth: 2,
        borderColor: 'lightgrey',
        // alignItems:'center',
        justifyContent:'center',
        marginHorizontal:20,
        marginTop:10,
        paddingLeft:10,
        borderRadius:5
    }
   
})

export {Delivery};