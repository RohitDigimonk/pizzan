import React, {Component} from 'react';
import {ImageBackground, TextInput, Text, View, StyleSheet,Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {Big_button} from '../common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Modal from 'react-native-modal';
import stringsoflanguages from './Language';
import {Spinner} from '../common';
import Styles from '../common/CommonStyle';


class SignIn extends Component{

    state = {username:'',otpSent:true,visibleModal:false,loading:false,modalloading:false,character1:'',character2:'',character3:'',character4:''}

    
    submit = () => {
        this.setState({loading:true})
        axios.post('https://s1-api.pizzan.is/api/v1/users/generate_otp',{
          username: this.state.username
        }).then((response)=>{
          console.log(response)
          const data = response['data']
          var otpSent = data['otpSent']
         
          if(otpSent==false){
            this.setState({visibleModal:true,loading:false})
          }
          
            
          
        })
         
    }

    toggleModal = () => {
      this.setState({visibleModal: !this.state.visibleModal});
    };

   otpsubmit=async()=>{
     this.setState({modalloading:true})
    const {character1,character2,character3,character4} = this.state;
        axios.post('https://s1-api.pizzan.is/api/v1/users/validate_otp',{
          username: this.state.username,
          otp: character1+character2+character3+character4
        }).then((response)=>{
          // console.log(response)
          const data = response['data']
          const success = data['success']
          const token = data['token']
          // console.log(success,token)
          this.setState({success:success,token:token})
          if(success==true){
            this.session();
            this.setState({modalloading:false})
          }else{
            alert('Something went wrong')
            this.setState({modalloading:false})
          }
        })
         
   }
        session=()=>{
          AsyncStorage.setItem('token',this.state.token)
          this.setState({visibleModal:false})
          this.props.navigation.navigate('Dashboard')
        }

        renderButton=()=>{
          if(this.state.loading){
              return <Spinner
              color={'#fff'}
              backgroundcolor={'#E63C2F'}
              />;
          }
          return (
            <Big_button 
            backgroundColor={'#E63C2F'}
            onPress={this.submit}><Text style={{color:'#fff'}}>{stringsoflanguages.submit}</Text></Big_button>
          )
        }

        modalButton=()=>{
          if(this.state.modalloading){
            return<Spinner
            color={'#E63C2F'}
            backgroundcolor= {'#fff'}
            />
          }
          return(
          <View>
            <Big_button
            backgroundColor={'#fff'}
            textcolor={'#E63C2F'}
            onPress={this.otpsubmit}>CONFIRM</Big_button>
          </View> 
          )
        }
  
            render(){
              // console.log(this.state.token)
              const {language} = this.state;
              return(
                <SafeAreaView style={{backgroundColor:'#E63C2F'}}>
                <View style={{height:'100%',width:'100%'}}>
                
                <Modal
                    testID={'modal'}
                    isVisible={this.state.visibleModal}
                    backdropColor="#000"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={400}
                    animationOutTiming={400}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={400}
                    onBackdropPress={()=>this.setState({visibleModal:false})}
                    >
                    <KeyboardAwareScrollView 
                    contentContainerStyle={{alignItems:'center',justifyContent:'center',height:'100%',top:-25}}
                    keyboardShouldPersistTaps='handled'
                    >
                      <View style={[Styles.modalmainview]}>
                    
                          <Image
                            source={require('../assets/images/logo.png')}
                            style={{height:120,width:120,resizeMode:'contain'}}
                          />
              
                          <View style={{paddingVertical:"1%"}}>
                            <Text style={{fontSize:24,fontWeight:'600',fontFamily:'Avenir',color:'#fff'}}>CONFIRMATION</Text>
                          </View>
                          <View style={{alignItems:'flex-start',width:'100%',height:32,alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600',fontFamily:'Avenir',color:'#fff'}}>Enter Your Code Here</Text>
                          </View>
                          
                          <View style={{flexDirection:'row'}}>
                    <View style={Styles.otpvalue}>
                        <TextInput
                            maxLength={1}
                            ref='input_1'
                            style={Styles.otpinput}
                            keyboardType='numeric'
                            value={this.state.character1}
                            onChangeText={character1 => {this.setState({ character1 })
                            if(character1) this.refs.input_2.focus()
                            }}
                        />
                    </View>
                       
                    <View style={Styles.otpvalue}>
                        <TextInput
                            maxLength={1}
                            ref='input_2'
                            style={Styles.otpinput}
                            keyboardType='numeric'
                            value={this.state.character2}
                            onChangeText={character2 => {this.setState({ character2 })
                            if(character2) this.refs.input_3.focus()
                            }}
                        />
                    </View>

                    <View style={Styles.otpvalue}>
                        <TextInput
                            maxLength={1}
                            ref='input_3'
                            style={Styles.otpinput}
                            keyboardType='numeric'
                            value={this.state.character3}
                            onChangeText={character3 => {this.setState({ character3 })
                            if(character3) this.refs.input_4.focus()
                            }}
                        />
                    </View>

                    <View style={Styles.otpvalue}>
                        <TextInput
                            maxLength={1}
                            ref='input_4'
                            style={Styles.otpinput}
                            keyboardType='numeric'
                            value={this.state.character4}
                            onChangeText={character4 => {this.setState({ character4 })
                            // if(character4) this.refs.input_4.focus()
                            }}
                        />
                    </View>

                   
                </View>
                          
                           {this.modalButton()}
                      </View>
                      </KeyboardAwareScrollView>
                </Modal>
                <ImageBackground
                source={require('../assets/images/welcome_background.jpg')}
                style={{width:'100%',height:"100%"}}
                >
                <KeyboardAwareScrollView contentContainerStyle={{alignItems:'center',justifyContent:'space-around',height:'100%'}} keyboardShouldPersistTaps='handled'>
                
                
              
                <View style={Styles.logocontainer}>
                  <Image
                    source={require('../assets/images/logo.png')}
                    style={{height:120,width:120,resizeMode:'contain'}}
                  />
                </View>
                <View style={{marginTop:"40%"}}>
                <View style={Styles.container}>
                <Image
                style={{width:15,height:25}}
                source={require('../assets/images/phone.png')}
                />
              
                <TextInput
                    style={{height:40,width:370,paddingLeft:10,fontSize:20,color:'#fff',fontWeight:'700'}}
                    placeholder='GSM Number'
                    placeholderTextColor='#fff'
                    onChangeText={username=>this.setState({ username })}
                    keyboardType={'numeric'}
                    maxLength={8}
                />
                </View>
                
             
               
               {this.renderButton()}
            
               </View>
                
                </KeyboardAwareScrollView>
                
                </ImageBackground>
                </View>
                </SafeAreaView>
              );
            }
          }

// const Styles = StyleSheet.create({
//   container: {
//     height:40,
//     width:300,
//     borderBottomWidth:3,
//     borderBottomColor:'#ffffff',
//     flexDirection:'row',
//     alignItems:'center',
//     marginBottom:50
    
//   },
  

// })



export default SignIn;