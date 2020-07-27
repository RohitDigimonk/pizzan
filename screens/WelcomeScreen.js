import React, {Component} from 'react';
import {ImageBackground,View, StyleSheet,Image,AsyncStorage,Text,TouchableWithoutFeedback} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Language from './Language';
import { StackActions, NavigationActions} from 'react-navigation';
import Styles from '../common/CommonStyle';


class WelcomeScreen extends Component{

  state = {language:['Icelandic', 'English']}

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

  selectlanguage=async(value)=>{
    // alert(value)
    if(value==0){
    AsyncStorage.setItem('language','ic')
   
    console.log(await AsyncStorage.getItem('language'))
    Language.setLanguage('ic');
  }else{
    AsyncStorage.setItem('language','en')
    
    console.log(await AsyncStorage.getItem('language'))
    Language.setLanguage('en');
  }
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' })
      ],
    }))
  }

  session=(value)=>{
    AsyncStorage.setItem('language',value)
    this.timeoutHandle=setTimeout(()=>{
        this.props.navigation.navigate('SignIn')
      }, 1000)
  }

  render(){
    
    return(
      <View style={{height:'100%',width:'100%'}}>
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
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('SignIn')}>
        <View style={Styles.languageoption}>
         
            <Image
              source={require('../assets/images/language.png')}
              style={{height:30,width:30,resizeMode:'contain'}}
            />
            <Text style={{fontSize:20,color:'#fff',fontFamily:'Avenir'}}>English</Text>
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