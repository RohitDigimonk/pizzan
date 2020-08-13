import React, {Component} from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Big_button} from '../common'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stringsoflanguages from './Language';
import CheckBox from 'react-native-check-box'

class Delivery extends Component{

    state={fullname:'',address:'',location:'',comments:'',waitingboxchecked:true}

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
        // console.log(this.state.fullname)
        return(
    <SafeAreaView style={{backgroundColor:'#E63C2F'}}>
    <View style={{height:'100%',width:'100%',backgroundColor:'#f2f2f2'}}>
            <View style={Styles.mainstyle}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
        <Image
        source={require('../assets/images/back.png')}
        style={{width:20,height:22,resizeMode:'contain'}}
        />
        </TouchableOpacity>
        <Text style={Styles.Headerext}>{stringsoflanguages.delivery}</Text>
        <View style={{flexDirection:'row'}}>
        
        </View>
            </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <View style={{height:'93%',width:"100%"}}>
            <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>{stringsoflanguages.fullname}</Text>
            </View>
            <View style={Styles.maincontainer}>
            <TextInput
                placeholder={stringsoflanguages.typeyournamehere}
                value={this.state.fullname}
                autoCorrect={false}
                onChangeText={fullname=>this.setState({fullname:fullname})}
            />
            </View>
             <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>{stringsoflanguages.address}</Text>
            </View>
            <View style={Styles.maincontainer}>
            <TextInput
                placeholder={stringsoflanguages.typeyourcompleteaddress}
                value={this.state.address}
                autoCorrect={false}
                onChangeText={address=>this.setState({address:address})}
            />
            </View>
             <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>{stringsoflanguages.Location}</Text>
            </View>
            <View style={Styles.maincontainer}>
            <TextInput
                placeholder={stringsoflanguages.typeyourlocation}
                value={this.state.location}
                autoCorrect={false}
                onChangeText={location=>this.setState({location:location})}
            />
            </View>
             <View style={Styles.inputboxcontainer}>
            <Text style={Styles.Textstyle}>{stringsoflanguages.comments} ?</Text>
            </View>
            <View style={Styles.maincontainer2}>
            <TextInput
                placeholder={stringsoflanguages.typeyourcommentshere}
                value={this.state.comments}
                autoCorrect={false}
                style={{textAlignVertical:'top',height:160,textAlign:'justify',width:'95%',fontFamily:'Avenir'}}
                multiline={true}
                onChangeText={comments=>this.setState({comments:comments})}

            />
            </View>
            <View style={Styles.inputboxcontainer}>
            <Text style={{fontFamily:'Avenir',fontSize:18}}>{stringsoflanguages.savedetailfornextorder}</Text>
            </View>
            <View style={[Styles.inputboxcontainer,{flexDirection:'row',justifyContent:'flex-start'}]}>
            <CheckBox
                
                onClick={()=>{
                this.setState({
                    waitingboxchecked:!this.state.waitingboxchecked
                })
                }}
                isChecked={this.state.waitingboxchecked}
                
            />
            <Text style={Styles.Textstyle}>{stringsoflanguages.waitingtime}: 35-45 MIN.</Text>
            </View>
            
            
        </View>
        </KeyboardAwareScrollView>
        <View style={{paddingTop:5}}>
            <Big_button
            backgroundColor={'#E63C2F'}
            textcolor={'#fff'}
            onPress={()=>this.next()}>{stringsoflanguages.next}</Big_button>
            </View>
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
        fontWeight:'500',
        fontFamily:'Avenir'
    },
    Textstyle: {
        color: '#000000',
        fontSize:20,
        fontWeight:'700',
        fontFamily:'Avenir'
        
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