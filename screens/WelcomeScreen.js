import React, {Component} from 'react';
import {ImageBackground,View, StyleSheet,Image,AsyncStorage,Text,TouchableWithoutFeedback} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Language from './Language';
import { StackActions, NavigationActions} from 'react-navigation';
import Styles from '../common/CommonStyle';
import Axios from 'axios';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';


class WelcomeScreen extends Component{

  state = {languagemodal:false,language:''}

  componentDidMount(){
  //   this.timeoutHandle = setTimeout(()=>{
  //     this.props.navigation.navigate('SignIn')
  // }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timeoutHandle);
  }

  // selectlanguage=(value)=>{
  //   if(value==0){
  //     // this.setState({value:'Icelandic'})
  //     this.session('Icelandic');
  //   }else{
  //     // this.setState({value:'English'})
  //     this.session('English');
  //   }
  // }

  selectlanguage=()=>{
    this.setState({languagemodal:!this.state.languagemodal})
  //   if(value==0){
  //   AsyncStorage.setItem('language','is-IS')
   
   
  //   Language.setLanguage('is-IS');
  // }else{
  //   AsyncStorage.setItem('language','en-US')
    
   
  //   Language.setLanguage('en-US');
  // }
  //   this.props.navigation.dispatch(StackActions.reset({
  //     index: 0,
  //     actions: [
  //       NavigationActions.navigate({ routeName: 'SignIn' })
  //     ],
  //   }))
  }

  setlanguage=async(language)=>{
    Language.setLanguage(language)
    AsyncStorage.setItem('language',language)
    this.setState({languagemodal:false})
    this.props.navigation.navigate('SignIn')
    
  }

  

  // callapi=()=>{
  //   Axios.get('https://s1-api.pizzan.is/api/v1/referencedata/languages',
  //   {headers:{language:'en-us'}}
  // ).then((response)=>{
  //   console.log(response,'sdf')
  // })}

  session=(value)=>{
    AsyncStorage.setItem('language',value)
    this.timeoutHandle=setTimeout(()=>{
        this.props.navigation.navigate('SignIn')
      }, 1000)
  }

  render(){
    
    return(
      <View style={{height:'100%',width:'100%'}}>
        <Modal
                  
                    isVisible={this.state.languagemodal}
                    backdropColor="#000"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={400}
                    animationOutTiming={400}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={400}
                    onBackdropPress={()=>this.setState({languagemodal:false})}
                    >
                  
                      <View style={[Styles.modalmainview,{justifyContent:'flex-start'}]}>
                    
                          <Image
                            source={require('../assets/images/logo.png')}
                            style={{height:120,width:120,resizeMode:'contain',paddingTop:'5%'}}
                          />
              
                          <View style={{paddingTop:'8%'}}>
                            <Text style={{fontSize:24,fontWeight:'600',fontFamily:'Avenir',color:'#fff'}}>Select Language</Text>
                          </View>
                          <View style={{alignItems:'flex-start',width:'100%',alignItems:'center',paddingTop:20}}>
                            <TouchableOpacity onPress={()=>this.setlanguage('is-IS')}>
                            <Text style={{fontSize:20,fontWeight:'600',fontFamily:'Avenir',color:'#fff'}}>Icelandic</Text>
                            </TouchableOpacity>
                            
                          </View>
                          <View style={{alignItems:'flex-start',width:'100%',alignItems:'center',paddingTop:20}}>
                            <TouchableOpacity onPress={()=>this.setlanguage('en-US')}>
                            <Text style={{fontSize:20,fontWeight:'600',fontFamily:'Avenir',color:'#fff'}}>English</Text>
                            </TouchableOpacity>
                            </View>
                          
                          <View style={{flexDirection:'row',paddingVertical:10}}>
                       
                       
                  
                   
                   
                  
                   
                    </View>  

                      </View>
                   
                </Modal>
      <ImageBackground
      source={require('../assets/images/welcome_background.jpg')}
      style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'space-around'}}
      >

        <View style={Styles.logocontainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{height:120,width:120,resizeMode:'contain'}}
            />
        </View>
        <TouchableWithoutFeedback 
        onPress={()=>this.selectlanguage()}
        >
        <View style={Styles.languageoption}>
         
            <Image
              source={require('../assets/images/language.png')}
              style={{height:30,width:30,resizeMode:'contain'}}
            />
            <Text style={{fontSize:20,color:'#fff',fontFamily:'Avenir'}}>Select Language</Text>
            <Image
              source={require('../assets/images/arrowdown.png')}
              style={{height:22,width:20,resizeMode:'cover'}}
            />
           
        </View>
        </TouchableWithoutFeedback>
        
      </ImageBackground>
      </View>

    
    );
  }
}




export {WelcomeScreen};