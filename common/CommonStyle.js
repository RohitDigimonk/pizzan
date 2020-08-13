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
        width:220,
        height:40,
        backgroundColor:'#E63C2F',
        alignItems:'center',
        paddingHorizontal:5,
        justifyContent:'space-around'
    },
    container: {
        height:40,
        width:'90%',
        borderBottomWidth:3,
        borderBottomColor:'#ffffff',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:30
    
  },
  restaurantview: {
    minHeight:'15%',
    maxHeight:'auto',
    width:'95%',
    borderWidth:1,
    borderColor:'grey',
    backgroundColor:'#ffffff',
    marginVertical:4,
    marginHorizontal:10
},
    modalmainview: {
        height:"50%",
        width:"100%",
        justifyContent:'center',
        backgroundColor:'#E63C2F',
        alignItems:"center",
        borderRadius:20
    },
    boxstyle:{
        height:70,
        width:60,
        borderRadius:5,
        backgroundColor:'#fff',
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    },
    inputstyle:{
        fontSize:26,
        color:"#000000",
        height:70,
        width:60,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:25,
        fontFamily:'Avenir'
    },
    postadmainview: {
        height:420,
        width:'90%',
        alignItems:'flex-start',
        backgroundColor:'#fff',
        paddingHorizontal:1,
        paddingTop:5,
        borderRadius:10
    },
    // otpvalue: {
    //     borderWidth:1,
    //     borderColor:'#fff',
    //     height:70,
    //     width:60,
    //     borderRadius:5,
    //     marginHorizontal:8,
    //     marginTop:30,
    //     marginBottom:20,
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    // otpinput:{
    //     fontSize:35,
    //     color:'#fff',
    //     height:"100%",
    //     alignItems:'center'
    // },
    buttontext: {
        fontSize:18,
        color:'#ffffff',
        fontFamily:'Avenir'
        },
    cartdesign:{
        width:'100%',
        height:'5%',
        backgroundColor:'#E73131',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20
    },
    gsmstyle:{
        height:40,
        width:'100%',
        paddingLeft:10,
        fontSize:20,
        color:'#fff',
        fontWeight:'700'
    }
})

export default Styles;