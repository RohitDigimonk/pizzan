import React, {Component} from 'react';
import {View,Text,Image,TextInput,AsyncStorage,ImageBackground,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Styles from '../common/CommonStyle';
import stringsoflanguages from './Language';
import {Big_button} from '../common';
import axios from 'axios';
import {Spinner} from '../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Otppage extends Component{

    state= {modalloading:false,otpsendmodal:true,wrongotpmodal:false}

    username = this.props.navigation.state.params.username

    otpsubmit=async()=>{
     
           this.setState({modalloading:true})
          const {character1,character2,character3,character4} = this.state;
              axios.post('https://s1-api.pizzan.is/api/v1/users/validate_otp',{
                username: this.username,
                otp: character1+character2+character3+character4
              }).then((response)=>{
                console.log(response)
                const data = response['data']
                const success = data['success']
                const token = data['token']
                // console.log(success,token)
                this.setState({success:success,token:token})
                if(success==true){
                  
                  this.setState({modalloading:false})
                  this.session();
                  // Keyboard.dismiss()
                }else{
                  
                  this.setState({modalloading:false,wrongotpmodal:true})
                  
                }
              })
            }

    session=()=>{
          AsyncStorage.setItem('token',this.state.token)
          this.setState({visibleModal:false})
          this.props.navigation.navigate('Dashboard')
        }

        modalButton=()=>{
            if(this.state.modalloading){
              return<Spinner
              color={'#E63C2F'}
              backgroundcolor= {'#fff'}
              />
            }
            return(
            <View style={{width:'100%'}}>
              <Big_button
              backgroundColor={'#fff'}
              textcolor={'#E63C2F'}
              onPress={this.otpsubmit}>CONFIRM</Big_button>
            </View> 
            )
          }

          againotpsend=()=>{
            this.props.navigation.navigate('SignIn')
            this.setState({wrongotpmodal:false})
          }

    render() {
      console.log(this.username,'user')
        return(
          <View style={{height:'100%',width:'100%',alignItems:'center'}}>
            <Modal
                isVisible={this.state.wrongotpmodal}
                backdropColor="#000"
                backdropOpacity={0.8}
                // animationIn="zoomInDown"
                // animationOut="zoomOutUp"
                animationInTiming={400}
                animationOutTiming={400}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={400}
                onBackdropPress={()=>this.setState({wrongotpmodal:false})}
            >

                  <View style={[Styles.modalmainview,{justifyContent:'flex-start'}]}>
                    
                    <Image
                      source={require('../assets/images/logo.png')}
                      style={{height:120,width:120,resizeMode:'contain',paddingTop:'5%'}}
                    />
        
              <View style={{marginVertical:40}}>
              <Text style={{fontFamily:'Avenir',color:'#fff',fontSize:30}}>You have entered wrong OTP</Text>
              </View>
              <Big_button
              backgroundColor={'#fff'}
              textcolor={'#E63C2F'}
              onPress={this.againotpsend}>Resend OTP</Big_button>
                </View>

            </Modal>
            <Modal
                isVisible={this.state.otpsendmodal}
                backdropColor="#000"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={400}
                animationOutTiming={400}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={400}
                onBackdropPress={()=>this.setState({otpsendmodal:false})}
            >

                  <View style={[Styles.modalmainview,{justifyContent:'flex-start'}]}>
                    
                    <Image
                      source={require('../assets/images/logo.png')}
                      style={{height:120,width:120,resizeMode:'contain',paddingTop:'5%'}}
                    />
        
              <View style={{marginVertical:40}}>
              <Text style={{fontFamily:'Avenir',color:'#fff',fontSize:30}}>{stringsoflanguages.otpsendmessage}</Text>
              </View>
              <Big_button
              backgroundColor={'#fff'}
              textcolor={'#E63C2F'}
              onPress={()=>this.setState({otpsendmodal:false})}>CONTINUE</Big_button>
                </View>

            </Modal>
            <ImageBackground
                source={require('../assets/images/welcome_background.jpg')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start',alignItems:'center'}}
                
                
            >
              <View style={{width:'100%'}}>
             <TouchableOpacity style={{width:35,height:35,alignItems:'center',justifyContent:'center',marginTop:40,marginLeft:20}}
                  onPress={()=>this.props.navigation.goBack()}
                >
                <Image
                  source={require('../assets/images/back.png')}
                  style={{width:20,height:22,resizeMode:'contain'}}
                />
                </TouchableOpacity>
                </View>
            <KeyboardAwareScrollView
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{justifyContent:'center'}}
            style={{width:'100%'}}>
                
                      <View style={[Styles.modalmainview,{marginTop:'50%',height:'80%'}]}>
                    
                          <Image
                            source={require('../assets/images/logo.png')}
                            style={{height:120,width:120,resizeMode:'contain'}}
                          />
              
                          <View style={{paddingVertical:"1%"}}>
                            <Text style={{fontSize:24,fontWeight:'600',fontFamily:'Avenir',color:'#fff'}}>{stringsoflanguages.confirmation}</Text>
                          </View>
                          <View style={{alignItems:'flex-start',width:'100%',height:32,alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600',fontFamily:'Avenir',color:'#fff'}}>{stringsoflanguages.enteryourcodehere}</Text>
                          </View>
                          
                          <View style={{flexDirection:'row',paddingVertical:10}}>
                       
                       
                    {/* <View style={{flexDirection:'row',padding:10}}> */}
                    <View style={Styles.boxstyle}>
                        

                   
                        <TextInput
                            autoCorrect={false}
                            style={Styles.inputstyle}
                            ref="input_1"
                            onChangeText={character1 => {this.setState({ character1 })
                                            if(character1) this.refs.input_2.focus()
                                            }}
                            maxLength={1}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={Styles.boxstyle}>

                        {/* for getting the second otp letter form input */}
                        <TextInput
                                autoCorrect={false}
                                style={Styles.inputstyle}
                                ref="input_2"
                                onChangeText={character2 => {this.setState({ character2 })
                                            if(character2)this.refs.input_3.focus()
                                            // else this.refs.input_1.focus()
                                        }}
                                maxLength={1}
                                keyboardType={'number-pad'}
                            />
                    </View>
                    <View style={Styles.boxstyle}>

                        {/* for getting the third otp letter form input */}
                        <TextInput
                                autoCorrect={false}
                                style={Styles.inputstyle}
                                ref="input_3"
                                onChangeText={character3 => {this.setState({ character3 })
                                            if(character3)this.refs.input_4.focus()
                                            // else this.refs.input_2.focus()
                                        }}
                                maxLength={1}
                                keyboardType={'number-pad'}
                            />
                    </View>
                    <View style={Styles.boxstyle}>
                        {/* for getting the fourth otp letter form input */}

                        <TextInput
                                autoCorrect={false}
                                style={Styles.inputstyle}
                                ref="input_4"
                                onChangeText={character4 => {this.setState({ character4 })
                                            // if(character4==false)this.refs.input_3.focus()
                                        }}
                                maxLength={1}
                                keyboardType={'number-pad'}
                            />
                    </View>
                    </View>  
               
                          
                    <View style={{width:'100%'}}>
                    {this.modalButton()}
                    </View> 
                      </View>
                    
            </KeyboardAwareScrollView>
            </ImageBackground>
            </View>
        );
    }
}

export default Otppage;