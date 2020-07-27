import React, {Component} from 'react';
import {View,Text,StyleSheet, SafeAreaView, Image} from 'react-native';
import { connect } from 'react-redux';
import { pizzamenu,toppinglist, drinkslist } from '../../store/actions';
import {bindActionCreators} from 'redux';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

class MainDetail extends Component{

    state = {pizza0:'',pizza1:'',pizza2:'',pizza3:'',sides4:'',sides5:'',sides6:'',sides7:'',sides8:'',sides9:'',drinks10:'',drinks11:'',sort0:'',sort1:'',sort2:'',sort3:'',sort4:'',sort5:'',sort6:'',sort7:'',sort8:'',sort9:'',sort10:'',sort11:'',
    select0:false,select1:false,select2:false,select3:false,select4:false,select5:false,select6:false,select7:false,select8:false,select9:false,select10:false,select11:false,
    selectsort0:'',selectsort1:'',selectsort2:'',selectsort3:'',selectsort4:'',selectsort5:'',selectsort6:'',selectsort7:'',selectsort8:'',selectsort9:'',selectsort10:'',selectsort11:'',selectedtopping:[]}

    offerdata = this.props.navigation.state.params.offerdata
    offername = this.offerdata['name']
    offerdesc = this.offerdata['description']
    
    componentDidMount=()=>{
        this.props.pizzamenu();
        this.props.toppinglist();
        this.props.drinkslist();
    }

    pizzaselect=(selectedpizza,offerdetail)=>{
        // console.log(selectedpizza)
        const selectedname = selectedpizza.name
        const sortorder = offerdetail.sortOrder
        // this.setState({selectedname:selectedname,sortorder:sortorder})
        console.log(selectedpizza,offerdetail)
        if(sortorder==0){
        this.setState({pizza0:selectedname,sort0:sortorder})
        }else if(sortorder==1){
            this.setState({pizza1:selectedname,sort1:sortorder})
        }else if(sortorder==2){
            this.setState({pizza2:selectedname,sort2:sortorder})
        }else if(sortorder==3){
            this.setState({pizza3:selectedname,sort3:sortorder})
        }
    }

    selectheading=(selectsort)=>{
        console.log(selectsort)
        if(selectsort==0){
            this.setState({select0:!this.state.select0,selectsort0:selectsort})
        }else if(selectsort==1){
            this.setState({select1:!this.state.select1,selectsort1:selectsort})
        }else if(selectsort==2){
            this.setState({select2:!this.state.select2,selectsort2:selectsort})
        }else if(selectsort==3){
            this.setState({select3:!this.state.select3,selectsort3:selectsort})
        }else if(selectsort==4){
            this.setState({select4:!this.state.select4,selectsort4:selectsort})
        }else if(selectsort==5){
            this.setState({select5:!this.state.select5,selectsort5:selectsort})
        }else if(selectsort==6){
            this.setState({select6:!this.state.select6,selectsort6:selectsort})
        }else if(selectsort==7){
            this.setState({select7:!this.state.select7,selectsort7:selectsort})
        }else if(selectsort==8){
            this.setState({select8:!this.state.select8,selectsort8:selectsort})
        }else if(selectsort==9){
            this.setState({select9:!this.state.select9,selectsort9:selectsort})
        }else if(selectsort==10){
            this.setState({select10:!this.state.select10,selectsort10:selectsort})
        }else if(selectsort=11){
            this.setState({select11:!this.state.select11,selectsort11:selectsort})
        }
    }

    sideselect=(sidesname,offerdetail)=>{
        // console.log(sidesname,offerdetail)

         
         const sortorder = offerdetail.sortOrder

        //  console.log(sortorder,sidesname)
         if(sortorder==4){
         this.setState({sides4:sidesname,sort4:sortorder})
         }else if(sortorder==5){
             this.setState({sides5:sidesname,sort5:sortorder})
         }else if(sortorder==6){
             this.setState({sides6:sidesname,sort6:sortorder})
         }else if(sortorder==7){
             this.setState({sides7:sidesname,sort7:sortorder})
         }else if(sortorder==8){
            this.setState({sides8:sidesname,sort8:sortorder})
        }else if(sortorder==9){
            this.setState({sides9:sidesname,sort9:sortorder})
        }
    }

    drinksselect=(selecteddrinks,offerdetail)=>{
        // console.log(selectedpizza)
        
        const sortorder = offerdetail.sortOrder
        // console.log(selecteddrinks)
        // console.log(selecteddrinks,offerdetail)
        if(sortorder==10){
        this.setState({drinks10:selecteddrinks,sort10:sortorder})
        }else if(sortorder==11){
            this.setState({drinks11:selecteddrinks,sort11:sortorder})
        }
    }

    toppingselect=(toppingname,offerdetail)=>{
        // console.log(toppingname)
        // const selectedtopping = []
        // selectedtopping.push(toppingname)
        this.setState({
            selectedtopping: this.state.selectedtopping.concat(toppingname)
          })
    }
    

    render(){
        console.log(this.state.selectedtopping)
        const {pizza0,pizza1,pizza2,pizza3,sides4,sides5,sides6,sides7,sides8,sides9,drinks10,drinks11,sort0,sort1,sort2,sort3,sort4,sort5,sort6,sort7,sort8,sort9,select0,sort10,sort11,select1,select2,select3,select4,select5,select6,select7,select8,select9,select10,select11,
                selectsort0,selectsort1,selectsort2,selectsort3,selectsort4,selectsort5,selectsort6,selectsort7,selectsort8,selectsort9,selectsort10,selectsort11} = this.state;
        return(
            <SafeAreaView>
            <View style={{width:'100%',height:'100%',paddingLeft:20,paddingTop:20}}>
                <View>
                <Text style={Styles.headingstyle}>{this.offername}</Text>
                <Text style={Styles.descstyle}>{this.offerdesc}</Text>
                </View>
                <ScrollView>
        {this.props.pizzaname?
        this.offerdata.offerDetails.map(offerDetails=>{
                    
                    return(
                        
                    <View style={{height:"auto",width:"100%"}}>
                         {  
                             offerDetails.isMenuPizza==true?
                             <View>
                                 <TouchableWithoutFeedback onPress={()=>this.selectheading(offerDetails.sortOrder)}>
                                 <View style={Styles.maintype}>
                                 <Text style={Styles.maintext}>Select Pizza</Text>
                                {select0 && selectsort0 == offerDetails.sortOrder
                                || select1 && selectsort1==offerDetails.sortOrder
                                || select2 && selectsort2==offerDetails.sortOrder
                                || select3 && selectsort3==offerDetails.sortOrder?
                                 <Image
                                 source={require('../../assets/images/arrowdown.png')}
                                 style={{width:16,height:10}}
                                 />:
                                 <Image
                                 source={require('../../assets/images/arrow.png')}
                                 style={{width:10,height:16}}
                                 />}
                                 </View>
                                 </TouchableWithoutFeedback>
                             {
                             this.props.pizzaname.map(pizzaname=>
                                <View style={[Styles.expandview, {height: select0 && selectsort0==offerDetails.sortOrder
                                            || select1 && selectsort1==offerDetails.sortOrder
                                            || select2 && selectsort2==offerDetails.sortOrder
                                            || select3 && selectsort3==offerDetails.sortOrder
                                            ? null : 0, overflow: 'hidden'} ]}>
                                <View style={{flexDirection:'row',padding:5}}>
                                <View style={{width:'80%'}}>  
                                <Text style={Styles.pizzanamelist}>{pizzaname.name}</Text>
                                <Text style={Styles.toppingstyle}>{pizzaname.toppingsSummary}</Text>
                                </View>
                                <TouchableOpacity onPress={()=>this.pizzaselect(pizzaname,offerDetails)}>
                                <View style={[Styles.selectionstyle,pizza0==pizzaname.name && sort0==offerDetails.sortOrder 
                                                || pizza1==pizzaname.name && sort1==offerDetails.sortOrder
                                                || pizza2==pizzaname.name && sort2==offerDetails.sortOrder
                                                || pizza3==pizzaname.name && sort3==offerDetails.sortOrder
                                                ?
                                                
                                    {backgroundColor:'#E73131'}:null]}>
                                    <Text>Select</Text>
                                </View>
                                </TouchableOpacity>
                                </View>
                                </View>
                                )
                             }</View>:offerDetails.isMenuPizza==false?<View>
                                 <View style={Styles.maintype}>
                                 <Text style={Styles.maintext}>Select toppings</Text>
                                 </View>
                             {
                             this.props.toppingname.map(toppingname=>
                            <View style={{flexDirection:'row',padding:5}}>
                            <View style={{width:'80%'}}> 
                            <Text style={Styles.pizzanamelist}>{toppingname.name}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>this.toppingselect(toppingname.name,offerDetails)}>
                                <View style={[Styles.selectionstyle, 
                                    //             || pizza1==pizzaname.name && sort1==offerDetails.sortOrder
                                    //             || pizza2==pizzaname.name && sort2==offerDetails.sortOrder
                                    //             || pizza3==pizzaname.name && sort3==offerDetails.sortOrder
                                    //             ?
                                                
                                    // {backgroundColor:'#E73131'}:null
                                ]}>
                                    <Text>Select</Text>
                                </View>
                                </TouchableOpacity>
                            </View>
                            )
                            }</View>:offerDetails.type=='SIDES'?
                             <View>
                                 <TouchableWithoutFeedback onPress={()=>this.selectheading(offerDetails.sortOrder)}>
                                 <View style={Styles.maintype}>
                                 <Text style={Styles.maintext}>select sides</Text>
                                 {select4 && selectsort4 == offerDetails.sortOrder
                                || select5 && selectsort5==offerDetails.sortOrder
                                || select6 && selectsort6==offerDetails.sortOrder
                                || select7 && selectsort7==offerDetails.sortOrder
                                || select8 && selectsort8==offerDetails.sortOrder
                                || select9 && selectsort9==offerDetails.sortOrder?
                                 <Image
                                 source={require('../../assets/images/arrowdown.png')}
                                 style={{width:16,height:10}}
                                 />:
                                 <Image
                                 source={require('../../assets/images/arrow.png')}
                                 style={{width:10,height:16}}
                                 />}
                                 </View>
                                 </TouchableWithoutFeedback>
                                 <View style={[Styles.expandview, {height: select4 && selectsort4==offerDetails.sortOrder
                                            || select5 && selectsort5==offerDetails.sortOrder
                                            || select6 && selectsort6==offerDetails.sortOrder
                                            || select7 && selectsort7==offerDetails.sortOrder
                                            || select8 && selectsort8==offerDetails.sortOrder
                                            || select9 && selectsort9==offerDetails.sortOrder
                                            ? null : 0, overflow: 'hidden'} ]}>
                                {
                                 offerDetails.allowedKeys.map(allowedKeys=>
                                <View style={{flexDirection:'row',padding:5}}>
                                <View style={{width:'80%'}}>
                                 <Text style={Styles.pizzanamelist}>{allowedKeys}</Text>
                                 </View>
                                 <TouchableOpacity onPress={()=>this.sideselect(allowedKeys,offerDetails)}>
                                {/* <View> */}
                                    <View style={[Styles.selectionstyle,sides4==allowedKeys && sort4==offerDetails.sortOrder 
                                                || sides5==allowedKeys && sort5==offerDetails.sortOrder
                                                || sides6==allowedKeys && sort6==offerDetails.sortOrder
                                                || sides7==allowedKeys && sort7==offerDetails.sortOrder
                                                || sides8==allowedKeys && sort8==offerDetails.sortOrder
                                                || sides9==allowedKeys && sort9==offerDetails.sortOrder
                                                ?
                                                
                                    {backgroundColor:'#E73131'}:null]}>
                                    <Text>Select</Text>
                                    </View>
                                {/* </View> */}
                                </TouchableOpacity>
                                 </View>)
                                 }</View>
                                </View>:offerDetails.type=='DRINKS'?
                                <View>
                                <TouchableWithoutFeedback onPress={()=>this.selectheading(offerDetails.sortOrder)}>
                                <View style={Styles.maintype}>
                                <Text style={Styles.maintext}>Select Drinks</Text>
                                {select10 && selectsort10 == offerDetails.sortOrder
                                || select11 && selectsort11==offerDetails.sortOrder?
                                 <Image
                                 source={require('../../assets/images/arrowdown.png')}
                                 style={{width:16,height:10}}
                                 />:
                                 <Image
                                 source={require('../../assets/images/arrow.png')}
                                 style={{width:10,height:16}}
                                 />}
                                </View>
                                </TouchableWithoutFeedback>
                                 {this.props.drinksname?
                                     this.props.drinksname.map(drinks=>
                                        <View style={[Styles.expandview, {height: select10 && selectsort10==offerDetails.sortOrder
                                            || select11 && selectsort11==offerDetails.sortOrder
                                            ? null : 0, overflow: 'hidden'} ]}>
                                        <View style={{flexDirection:'row',padding:5}}>
                                        <View style={{width:'80%'}}> 
                                        <Text style={Styles.pizzanamelist}>{drinks.name}</Text> 
                                        </View>
                                        
                                        <TouchableOpacity onPress={()=>this.drinksselect(drinks.name,offerDetails)}>
                                        <View style={[Styles.selectionstyle,drinks10==drinks.name && sort10==offerDetails.sortOrder 
                                                || drinks11==drinks.name && sort11==offerDetails.sortOrder
                                               
                                                ?
                                                
                                    {backgroundColor:'#E73131'}:null]}>
                                    <Text>Select</Text>
                                </View>
                                </TouchableOpacity>
                                        </View>
                                        </View>
                                     )
                                 :null}
                                 </View>
                         :null}

                    </View>
                    )
        }):null}
            {/* {this.offerdata.offerDetails.map(offerDetails=>offerDetails.isMenuPizza!=false?
               this.props.pizzaname?
                   this.props.pizzaname.map(pizzaname=>{
                    
                        return(
                            
                            <View style={{paddingVertical:10,width:'70%'}}>
                            <Text style={Styles.pizzanamelist}>{pizzaname.name}</Text>
                            <Text style={Styles.toppingstyle}>{pizzaname.toppingsSummary}</Text>
                            </View>
                            
                       )
                       
                   })
               :null
            :this.props.toppingname?
                this.props.toppingname.map(toppingname=><Text>{toppingname.name}</Text>)
            :null)} */}
                </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    headingstyle: {
        fontSize:28,
        fontWeight:'800',
        letterSpacing:2,
        textTransform:'uppercase',
        paddingVertical:5
    },
    descstyle: {
        fontSize:20,
        fontWeight:'500',
        letterSpacing:2,
        textTransform:'uppercase'
    },
    pizzanamelist: {
        fontSize: 20,
        fontWeight:'700',

    },
    toppingstyle: {
        fontSize:16,
        fontWeight:'300'
    },
    maintype: {
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#E73131',
        marginVertical:5,
        flexDirection:'row',
        paddingHorizontal:5
        
    },
    maintext: {
        textTransform:'uppercase',
        fontSize:20
    },
    selectionstyle: {
        width:70,
        alignItems:'center',
        // backgroundColor:'#E73131',
        height:40,
        borderWidth:1,
        borderColor:'#E73131',
        justifyContent:'center',
        
    },
    expandview: {
        // flexDirection:'row',
        // justifyContent:'space-between',
        // paddingHorizontal:10,
        width:"100%",
        height:100
    },

})

function mapStateToProps(state){
    // console.log(state)
    return {
        pizzaname: state.pizzamenu,
        toppingname:state.topping,
        drinksname:state.drinks
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({pizzamenu,toppinglist,drinkslist},dispatch)
}



export default connect(mapStateToProps,mapDispatchToProps)(MainDetail);