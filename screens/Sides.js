import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet,Image, TouchableOpacity,AsyncStorage} from 'react-native';
import Header from '../common/Header';
import axios from'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sideslist,addtocart } from '../store/actions';

class Sides extends Component{

    state={lang:'',sidesdata:[]}

   

    imagebaseurl='https://assets.pizzan.is/images/sides/'

    componentDidMount=()=>{
        axios.get('https://s1-api.pizzan.is/api/v1/sideorders')
        .then((response)=>{
            // console.log(response)
            const data = response['data']
            this.setState({sidesdata:data})
        })
        this.loadSession();
       
    }

    loadSession = async() => {
        this.setState({
          lang:await AsyncStorage.getItem('language')
        })

        // console.log(this.state.lang)
      }

      addtocart=(sidesdata)=>{
        console.log(sidesdata)
        const name = []
        name.push(sidesdata.name)
        const sidesname = []
        const selecteddrinks = []
        const price = sidesdata.price
        const size = sidesdata.size
        const keyValue = name+size
        const toppingname = []
       
        const addpizza = {name:name,size:size,price:price,keyValue:keyValue,toppingname:toppingname,selectedsides:sidesname
                          ,selecteddrinks:selecteddrinks}
        this.props.addtocart(addpizza)
       
      
     }

    render(){
        // console.log(this.state.lang)
        const {lang} = this.state;
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'SIDES'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
               <ScrollView>
                   {
                       this.state.sidesdata.map(sidesdata=>{
                        //    console.log(sidesdata)
                        
                           return(
                            sidesdata.sortOrder > 0 ?
                        <View style={{alignItems:'center'}}>
                        <View style={Styles.maincontainer}>
                                <View style={{flexDirection:"row"}}>
                                <View style={{width:'60%'}}>
                                
                                <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>
                                    {/* {lang=='en'?sidesdata.name:sidesdata.originalName} */}
                                    {sidesdata.name}
                                    </Text>
                             
                                 
                                <Text style={{paddingLeft:10,width:200}}>{sidesdata.description}</Text>
                              
                              </View>
                              <View>
                            
                              <Image
                                source={{uri:this.imagebaseurl+sidesdata.imageName}}
                                style={{width:150,height:160,resizeMode:'contain'}}
                              />
                              </View>
                              </View>
                              
                              <View style={Styles.bottomview}>
                                <TouchableOpacity onPress={()=>this.addtocart(sidesdata)}>
                                <View>
                                    <Text>Add to order</Text>
                                    
                                </View>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontWeight:'700'}}>{sidesdata.price} kr.</Text>
                                    <Image
                                    source={require('../assets/images/rightarrow.png')}
                                    style={{width:10,height:16,marginLeft:10}}
                                    />
                                </View>
                              </View>
                        </View>
                        </View>
                        :null)
                       })
                   }
               </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

const Styles=StyleSheet.create({
   
    maincontainer: {
        borderWidth:1,
        // shadowOpacity:0.2,
        borderRadius:5,
        borderColor:'lightgrey',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        height:180,
        width:370,
        margin:10,
        backgroundColor:'#ffffff'
    },
    bottomview: {
        height:30,
        backgroundColor:'lightgrey',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        bottom:0
    }
})

// function mapStateToProps(state){
//     console.log(state.sides)
//     return {
//         sides: state.sides
//     }
// }

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({sideslist,addtocart},dispatch)
// }


// export default connect(mapStateToProps,mapDispatchToProps)(Sides);

function mapStateToProps(state){
    // console.log(state.pizza)
  return {
    sides: state.sides
  }
}

function mapDispatchToProps(dispatch){
  
  return bindActionCreators({sideslist,addtocart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Sides);
// export default Sides;