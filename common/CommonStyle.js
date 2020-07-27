import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    logocontainer: {
        backgroundColor:'#E63C2F',
        width:160,
        height:160,
        justifyContent:'center',
        alignItems:'center',

    },
    languageoption: {
        flexDirection:'row',
        width:150,
        height:40,
        backgroundColor:'#E63C2F',
        alignItems:'center',
        paddingHorizontal:5,
        justifyContent:'space-around'
    },
    container: {
        height:40,
        width:370,
        borderBottomWidth:3,
        borderBottomColor:'#ffffff',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:30
    
  },
    modalmainview: {
        height:"50%",
        width:"100%",
        justifyContent:'center',
        backgroundColor:'#E63C2F',
        alignItems:"center",
        borderRadius:20
    },
    otpvalue: {
        borderWidth:1,
        borderColor:'#fff',
        height:70,
        width:60,
        borderRadius:5,
        marginHorizontal:8,
        marginTop:30,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center'
    },
    otpinput:{
        fontSize:35,
        color:'#fff',
        height:"100%",
        alignItems:'center'
    },
    buttontext: {
        fontSize:18,
        color:'#ffffff',
        }
})

export default Styles;