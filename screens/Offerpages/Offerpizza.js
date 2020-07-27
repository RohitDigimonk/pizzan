import React,{Component} from 'react';
import {View,Text, StyleSheet,TouchableWithoutFeedback,ScrollView,TouchableOpacity, SafeAreaView} from 'react-native';
import Header from '../../common/Header';
import { connect } from 'react-redux';
import {pizzamenu,drinkslist,toppinglist, addtocart} from '../../store/actions';
import { bindActionCreators } from 'redux';
import { Big_button } from '../../common';
import Axios from 'axios';

class Offerpizza extends Component{

    state = {allpizza:[],drinksdata:[],toppingdata:[], indicator:0,offerDetails:'',type:'',isMenuPizza:'',selectedpizza:[],toppingname:[],
            selectedsides:[],selecteddrinks:[],selectedtopping:[{index:'',toppingname:''}]}

    offerlength = this.props.navigation.state.params.length
    offerdata = this.props.navigation.state.params.offerdata

    componentDidMount=()=>{

        const initialtype = this.offerdata.offerDetails[0].type
        const initialismenupizza = this.offerdata.offerDetails[0].isMenuPizza
        this.setState({type:initialtype,isMenuPizza:initialismenupizza})


        Axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu')
        .then((response)=>{
            const data = response['data']
            // console.log(data)
            this.setState({allpizza:data})
        })
        Axios.get('https://s1-api.pizzan.is/api/v1/drinks')
        .then((response)=>{
            const data = response['data']
            this.setState({drinksdata:data})
        })
        Axios.get('https://s1-api.pizzan.is/api/v1/toppings')
        .then((response)=>{
            const data = response['data']
            this.setState({toppingdata:data})
        })



    }

    selectindicator=(index,offerDetails)=>{
        const isMenuPizza = offerDetails.isMenuPizza
        const type = offerDetails.type
        
        this.setState({indicator:index,offerDetails:offerDetails,type:type,isMenuPizza:isMenuPizza})
        // console.log(offerDetails)
    }

    selectpizza=(indicator,pizzadetail)=>{
        // console.log(pizzadetail)
        const price = this.offerdata['minimumPrice']
        const size = this.state.offerDetails.size
        const blankarray = this.state.selectedpizza
        const arrayindex = blankarray.map(data=>data.index)
        
        if(arrayindex.includes(indicator) ){

            
                // let people = [{"Name":"Bob","Age":"45"},{"Name":"Jim","Age":"45"}]
                const data = blankarray
                data.splice(data.findIndex(({index}) => index == indicator), 1);
                // this.setState({images:data})
                data.push({index:indicator, pizzadetail:pizzadetail,price:price,size:size})
                this.setState({selectedpizza:data})
              
        }
       
        // }
        else{
            blankarray.push({index:indicator, pizzadetail:pizzadetail,price:price,size:size})
            this.setState({selectedpizza:blankarray})
        }
        // console.log(arrayindex,'arrayindex')

        
    }

    selectsides=(indicator,sidedetail)=>{
        // console.log(sidedetail,indicator)
        const blankarray = this.state.selectedsides
        const arrayindex = blankarray.map(data=>data.index)

        if(arrayindex.includes(indicator)){
            const data = blankarray
            data.splice(data.findIndex(({index}) => index == indicator), 1);
            data.push({index:indicator, sidedetail:sidedetail})
            this.setState({selectedsides:data})

        }
        else{
            blankarray.push({index:indicator, sidedetail:sidedetail})
            this.setState({selectedsides:blankarray})
        }
        
    }

    selectdrinks=(indicator,drinksdetail)=>{
        // console.log(drinksdetail,indicator)
        const blankarray = this.state.selecteddrinks
        const arrayindex = blankarray.map(data=>data.index)

        if(arrayindex.includes(indicator)){
            const data = blankarray
            data.splice(data.findIndex(({index})=>index == indicator),1);
            data.push({index:indicator,drinksdetail:drinksdetail})
            this.setState({selecteddrinks:data})
        }

        else{
            blankarray.push({index:indicator, drinksdetail:drinksdetail})
            this.setState({selecteddrinks:blankarray})
        }
    }

    selecttopping=(indicator,toppingname)=>{
        // var blackarray = this.state.toppingname
        // blackarray.splice(toppingname)
        // console.log(blackarray)
        
        
        // this.setState(prevstate => ({
        //     toppingname: [...prevstate.toppingname,toppingname]
        // }))

        

       
        this.state.toppingname.includes(toppingname)?this.remove(toppingname):this.setState(prevstate => ({
            toppingname: [...prevstate.toppingname,toppingname]
        }))
        
        

        // this.setState(prevState => ({
        //     selectedtopping: [...prevState.selectedtopping, {index:indicator, toppingname:toppingname}]
        //   }))
        // console.log(indicator,toppingname)
          
    }

    remove=(toppingname)=>{
        // alert(toppingname)
        const checked = this.state.toppingname
        checked.splice(checked.indexOf(toppingname),1)
        // console.log(checked)
        this.setState({toppingname:checked})
        
    }

    addtocart=()=>{
        if(this.state.selectedpizza.length > 0){
         const selectedpizza = this.state.selectedpizza
         const pizzaname = selectedpizza.map(data=>data.pizzadetail.name)
         const price = selectedpizza.price
         const size = selectedpizza.deliveryMethodId
         const toppingname = this.state.toppingname
         const sidesname = this.state.selectedsides
         const selecteddrinks = this.state.selecteddrinks
         const useMinimumPrice = this.offerdata.useMinimumPrice
         const minimumprice = this.offerdata.minimumPrice

        const keyValue = pizzaname+size
        const addpizza = {name:pizzaname,size:size,price:price,keyValue:keyValue,toppingname:toppingname,
                            selecteddrinks:selecteddrinks,selectedsides:sidesname,useMinimumPrice,minimumprice}
        // console.log(pizzaname,'si')
        this.props.addtocart(addpizza)
        this.setState({selectedpizza:[]})
    }else{
        const selectedpizza = this.offerdata

         const pizzaname = []
         pizzaname.push(selectedpizza.name)
         const price = selectedpizza.minimumPrice
         const size = selectedpizza.deliveryMethodId
         const toppingname = this.state.toppingname
         const sidesname = this.state.selectedsides
         const selecteddrinks = this.state.selecteddrinks
         const useMinimumPrice = this.offerdata.useMinimumPrice
         const minimumprice = this.offerdata.minimumPrice

        const keyValue = pizzaname+size
        const addpizza = {name:pizzaname,size:size,price:price,keyValue:keyValue,toppingname:toppingname,
                            selecteddrinks:selecteddrinks,selectedsides:sidesname,useMinimumPrice,minimumprice}
        this.props.addtocart(addpizza)
        this.setState({selectedpizza:[]})
    }
        // console.log(selectedpizza)
        
    }

    render(){
        console.log(this.offerdata.useMinimumPrice)
        const {indicator,selectedpizza,selectedsides,selecteddrinks,selectedtopping,isMenuPizza,toppingname} = this.state;
        
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
                  <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={'OFFER'}
                 sideicon={require('../../assets/images/back.png')}
                 notificationicon={require('../../assets/images/notification.png')}
                 carticon={require('../../assets/images/cart.png')}
                 profileicon={require('../../assets/images/profile.png')}
               />
              
                <View style={{paddingTop:20, width:'100%',flexDirection:'row',justifyContent:'flex-end'}}>
                    <ScrollView horizontal={true} style={{height:50}} showsHorizontalScrollIndicator={false}>
                    {this.offerdata.offerDetails.map((offerDetails,index)=>
                    <TouchableWithoutFeedback onPress={()=>this.selectindicator(index,offerDetails)}>
                    
                    <View style={[Styles.pageindicatorstyle,this.state.indicator==index?{backgroundColor:'red'}:null]}>
                    <Text>{index}</Text>
                    
                    </View>
                    
                    </TouchableWithoutFeedback>
                    )}
                    </ScrollView>
                    
                </View>
                <Text>{this.offerdata.description}</Text>
            <ScrollView>
                {
                    this.state.type=='PIZZA' && isMenuPizza==true?
                    this.state.allpizza.map(pizzadetail=>{
                         
                        return(
                            <View>
                                <View style={Styles.maintype}>
                                <View style={{width:'75%'}}>
                                <Text style={Styles.namestyle}>{pizzadetail.name}</Text>
                                <Text >{pizzadetail.toppingsSummary}</Text>
                                
                                </View>
                                <TouchableOpacity onPress={()=>this.selectpizza(indicator,pizzadetail)}>
                                <View style={{width:'15%',marginHorizontal:10}}>
                                <View style={[Styles.selectionbox,selectedpizza.map(data=>data.index==indicator && data.pizzadetail.keyValue == pizzadetail.keyValue?{backgroundColor:'red'}:null)]}>
                                <Text>Select</Text>
                                
                                </View>
                                </View>
                                </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                    
                    :this.state.type=='PIZZA' && isMenuPizza==false?
                    this.state.toppingdata.map(toppingdetail=>{
                        // console.log(pizzadetail)
                    return(
                        <View>
                            <View style={Styles.maintype}>
                            <View style={{width:'75%'}}>
                            <Text style={Styles.namestyle}>{toppingdetail.name}</Text>
                            {/* <Text >{pidetail.toppingsSummary}</Text> */}
                            
                            </View>
                            <TouchableOpacity onPress={()=>this.selecttopping(indicator,toppingdetail.name)}>
                            <View style={{width:'15%',marginHorizontal:10}}>
                            <View style={[Styles.selectionbox,toppingname.includes(toppingdetail.name)?{backgroundColor:'red'}:null]}>
                            <Text>Select</Text>
                    
                            </View>
                            </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
                    :this.state.type=='SIDES'?
                    
                    this.state.offerDetails.allowedKeys.map(allowedKeys=>{
                        return(
                            
                            <View style={Styles.maintype}>
                                <View style={{width:'75%'}}>
                                <Text style={Styles.namestyle}>{allowedKeys}</Text>
                                </View>
                                <TouchableOpacity onPress={()=>this.selectsides(indicator,allowedKeys)}>
                                <View style={{width:'15%',marginHorizontal:10}}>
                                <View style={[Styles.selectionbox,selectedsides.map(sides=>sides.index==indicator && sides.sidedetail==allowedKeys?{backgroundColor:'red'}:null)]}>
                                <Text>Select</Text>
                                </View>
                                </View>
                                </TouchableOpacity>
                            </View>

                        )
                    })
                    
                    :this.state.type=='DRINKS'?
                    this.state.drinksdata.map(drinksdetail=>{
                        return(
                            <View style={Styles.maintype}>
                                <View style={{width:'75%'}}>
                                <Text style={Styles.namestyle}>{drinksdetail.name}</Text>
                                </View>
                                <TouchableOpacity onPress={()=>this.selectdrinks(indicator,drinksdetail)}>
                                <View style={{width:'15%',marginHorizontal:10}}>
                                <View style={[Styles.selectionbox,selecteddrinks.map(drinks=>drinks.index==indicator && drinks.drinksdetail.keyValue==drinksdetail.keyValue?{backgroundColor:'red'}:null)]}>
                                <Text>Select</Text>
                                </View>
                                </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                    
                    :null
                }
                
            </ScrollView>
            <View style={{paddingTop:10}}>
            <Big_button
            backgroundColor={'#E63C2F'}
            textcolor={'#fff'}
            onPress={()=>this.addtocart()}>Add to cart</Big_button>
            </View>
            </View>
            
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    pageindicatorstyle: {
        backgroundColor:'grey',
        height:40,
        width:40,
        borderRadius:40/2,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5
    },
    maintype: {
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'#E73131',
        marginVertical:5,
        flexDirection:'row',
        paddingHorizontal:5
        
    },
    namestyle:{
        fontSize:24,
        fontWeight:'bold',
    },
    toppingstyle: {
        fontSize:18,
        fontWeight:'500'
    },
    selectionbox: {
        height:40,
        width:60,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    }
   
})

function mapStateToProps(state){
    // console.log(state)
    return {
        pizzadetail: state.pizzamenu,
        drinksdetail: state.drinks,
        toppingdetail: state.topping
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({pizzamenu,drinkslist,toppinglist,addtocart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Offerpizza);

// export default Offerpizza;