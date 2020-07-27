import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, LayoutAnimation, TouchableWithoutFeedback,Image,ScrollView} from 'react-native';
import Header from '../common/Header';
import axios from 'axios';
// import { DropdownMenu } from '../common/DropdownMenu';
import ModalDropdown from 'react-native-modal-dropdown';
import { Big_button } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toppinglist } from '../store/actions';
import CheckBox from 'react-native-check-box';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Toppingpage extends Component{

   size = this.props.navigation.state.params.size

    state={ pizzaname:[],selectedFruits: [], meat:false,secondmeat:false,veg:false,secondveg:false,data:[],selectedpizza:[],
            spice:false,secondspice:false,cheese:false,secondcheese:false,meattopping:[],checkedDefault:[{toppingname:'',qty:''}],secondcheckedDefault:{},
            qty:1,totaltopping:[{topping:'',qty:0}],secondtotaltopping:[{topping:'',qty:0}], split:false,secondhalf:false,firsthalf:true}

    changeLayout = (value) => {
        if(value=='meat'){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ meat: !this.state.meat  });
        }else if(value=='veg'){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ veg: !this.state.veg  });
        }else if(value=='cheese'){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ cheese: !this.state.cheese  });
        }else if(value=='spice'){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ spice: !this.state.spice  });
            }
        
      }
      secondchangeLayout = (value) => {
        if(value=='meat'){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ secondmeat: !this.state.secondmeat  });
        }else if(value=='veg'){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ secondveg: !this.state.secondveg  });
        }else if(value=='cheese'){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ secondcheese: !this.state.secondcheese  });
        }else if(value=='spice'){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ secondspice: !this.state.secondspice  });
            }
        
      }

    

    componentDidMount=()=>{
        axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu')
        .then((response)=>{
            // console.log(response)
            const data = response['data']
            console.log(data)
            const pizzaname = data.map(data=>data.name)
            this.setState({pizzaname:pizzaname,data:data})

            const topping = data.map(data=>data.toppings,data.name)
            this.setState({topping:topping})

        })
                this.props.toppinglist();
                
    }

    selectdropdown=(idx,value)=>{
        console.log(value)
        // this.state.data.map(data=>data.name==value?this.setState({selectedpizza:data}):null)
        const selecteddata = []
        this.state.data.map(data=>data.name==value?selecteddata.push(data):null)
        // const newdata = selecteddata[0]
        const selectedtopping = selecteddata[0].toppings.map(topping=>topping)
        const toppingname = selectedtopping.map(topping=>topping.name)
        this.setState({checkedDefault:toppingname})

        this.setState ({
            totaltopping: [{topping: toppingname}]
          })
        
    }

    // checktopping=(i,toppingname,price)=>{
    //     // console.log(price)
    //     const blankarray = this.state.checkedDefault
    //     if(blankarray.includes(toppingname) ){
    //             const data = blankarray
    //             const index = data.indexOf(toppingname)
    //             data.splice(index, 1);
    //             this.setState({checkedDefault:data})     
    //     }
    //     else{
    //         blankarray.push(toppingname)
    //         this.setState({checkedDefault:blankarray})
    //     }




    //     if(this.state.totaltopping.some(topping=>topping.topping==toppingname)){
    //         this.setState({totaltopping:this.state.totaltopping.splice(toppingname)})
    //     }else{
    //     this.setState(prevState => ({
    //         totaltopping: [...prevState.totaltopping, {topping: toppingname, qty:1}]
    //       }))
    //     }
    // }

    checktopping = (i,toppingname,price)=>{
        // console.log(i,toppingname,price)
        const blankarray = this.state.checkedDefault
        if(blankarray.some(data=>data.toppingname==toppingname)){
                const data = blankarray
                const index = data.findIndex(p => p.toppingname == toppingname)
                //  console.log(index,'asdf')
                 data.splice(index, 1);
                 this.setState({checkedDefault:data})
        }else{
        blankarray.push({toppingname:toppingname,qty:1})
        this.setState({checkedDefault:blankarray})
        }

        
    }


    secondchecktopping=(i,toppingname)=>{
        // console.log(toppingname)
        this.setState(state => {
            const secondcheckedDefault = {...state.secondcheckedDefault};
            secondcheckedDefault[i] = !secondcheckedDefault[i];
            return { secondcheckedDefault }
           
        })
        if(this.state.secondtotaltopping.some(topping=>topping.topping==toppingname)){
            this.setState({secondtotaltopping:this.state.secondtotaltopping.splice(toppingname)})
        }else{
        this.setState(prevState => ({
            secondtotaltopping: [...prevState.secondtotaltopping, {topping: toppingname, qty:1}]
          }))
        }
    }

    // addqty=(i,toppingname)=>{
    //     // console.log(i,toppingname)
    //     if (this.state.qty <= 2 ) {
    //     const topdetail = []
    //     topdetail.push({toppingname:toppingname})
    //     console.log(topdetail,'add')
    //     this.setState({qty:this.state.qty+1})
    //     var joined = this.state.totaltopping.concat(toppingname);
    //     this.setState({totaltopping:joined})
    //     }else{
    //         null
    //     }
        
    // }
    addqty = (i,toppingname)=>{
        // if(this.state.checkedDefault.map(data=>data.qty < 3))
        // {
        const projects = this.state.checkedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname
              ? { ...p, qty: p.qty+1 }
              : p
          );
          this.setState({checkedDefault:newProjects})
        // }
    }

    // lessqty=(toppingname)=>{
    //     if (this.state.qty > 1 ) {
    //         this.setState({qty:this.state.qty-1})
    //         var joined = this.state.totaltopping.concat(toppingname);
    //         this.setState({totaltopping:joined})
    //         }
    //         else{
    //             null
    //         }
    // }
    lessqty=(toppingname)=>{
        const projects = this.state.checkedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname
              ? { ...p, qty: p.qty-1 }
              : p
          );
          this.setState({checkedDefault:newProjects})
    }

    split=()=>{
        this.setState({split:!this.state.split,secondhalf:false,firsthalf:true})
    }

    secondhalf=()=>{
        this.setState({secondhalf:true,firsthalf:false})
    }
    firsthalf=()=>{
        this.setState({secondhalf:false,firsthalf:true})
    }
    
    render(){
       
        console.log(this.state.checkedDefault)
        const { split,checkedDefault } = this.state;
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
               <Header
                 menupress={this.props.navigation.toggleDrawer}
                 title={'MAKE YOUR OWN'}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
            <View style={{width:'100%',justifyContent:'center',paddingLeft:20}}>
            {/* <View> */}
            <View style={{paddingVertical:10,paddingTop:10}}>
                   <Text style={{fontSize:18,fontWeight:'200',height:35}}>
                       NOW IT'S TIME TO CHOOSE YOUR TOPPINGS
                   </Text>
                   </View>
                   <View>
                   <Text style={{fontSize:18,fontWeight:'600'}}>
                       CHOOSE FROM MENU
                   </Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#ffffff',height:40,width:300,justifyContent:'center'}}>
                    <ModalDropdown 
                    options={this.state.pizzaname}
                    dropdownStyle={Styles.dropdown}
                    textStyle={Styles.textstyle}
                    defaultValue='I am going to create my own'
                    dropdownTextStyle={Styles.textstyle}
                    onSelect={(idx, value) => this.selectdropdown(idx, value)}
                    >
                         
                    </ModalDropdown>
                    </View>
                    <TouchableOpacity onPress={()=>this.split()}>
                    <View style={Styles.buttonview}>
                    <Text style={{color:'#ffffff'}}>{split?<Text>Cancel split</Text>:<Text>Split in half</Text>}</Text>
                    </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:30,flexDirection:'row'}}>
                        <View>
                        <TouchableOpacity onPress={()=>this.firsthalf()}>
                        <View>
                        <Text style={Styles.splittext}>FIRST HALF</Text>
                        </View>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>this.secondhalf()}>
                        <View>
                        {split?<Text style={Styles.splittext}>SECOND HALF</Text>:null}
                        </View>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                    <View style={[{height:"55%"},this.state.secondhalf?{display:'flex'}:{display:'none'}]}>
                

                        <ScrollView>
                            
                        <TouchableWithoutFeedback onPress={()=>this.secondchangeLayout('meat')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/meat.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                MEA
                            </Text>
                            </View>
                            <View>
                            
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                           
                            </View>
                        </View>
                    
                        </TouchableWithoutFeedback>
                {this.props.topping?this.props.topping.map((toppings,i)=>
                       toppings.subType=='Kjöt'?
                    <View style={[Styles.expandview, {height: this.state.secondmeat ? null : 0, overflow: 'hidden'} ]}>
                    <View style={{flexDirection:'row',paddingVertical:5}}>
                    <CheckBox
                        
                        onClick={
                            () => this.secondchecktopping(i,toppings.name)
                        }
                        isChecked={this.state.secondcheckedDefault[i]}
                        // leftText={"CheckBox"}
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {this.state.secondcheckedDefault[i]==true?<View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.lessqty(i)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal:8}}>{this.state.qty}</Text>
                        <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                        <Image
                        source={require('../assets/images/plus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                    </View>:null}
                    </View>:null
                ):null}
                        <TouchableWithoutFeedback onPress={()=>this.secondchangeLayout('veg')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/veg.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                VEGETABLES
                            </Text>
                            </View>
                            <View>
                            
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                            </View> 
                        </View>
                        </TouchableWithoutFeedback>
                {this.props.topping.map((toppings,i)=>
                       toppings.subType=='Grænmeti'?
                       <View style={[Styles.expandview, {height: this.state.secondveg ? null : 0, overflow: 'hidden'} ]}>
                       <View style={{flexDirection:'row',paddingVertical:5}}>
                       <CheckBox
                           
                           onClick={
                               () => this.secondchecktopping(i,toppings.name)
                           }
                           isChecked={!!this.state.secondcheckedDefault[i]}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {this.state.secondcheckedDefault[i]==true?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.lessqty(i)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:8}}>{this.state.qty}</Text>
                           <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                           <Image
                           source={require('../assets/images/plus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                       </View>:null}
                       </View>:null
                )}
                        <TouchableWithoutFeedback onPress={()=>this.secondchangeLayout('cheese')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/cheese.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                CHEESE
                            </Text>
                            </View>
                            <View>
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                {this.props.topping.map((toppings,i)=>
                       toppings.subType=="Ostur"?
                       <View style={[Styles.expandview, {height: this.state.secondcheese ? null : 0, overflow: 'hidden'} ]}>
                       <View style={{flexDirection:'row',paddingVertical:5}}>
                       <CheckBox
                           
                           onClick={
                               () => this.secondchecktopping(i,toppings.name)
                           }
                           isChecked={!!this.state.secondcheckedDefault[i]}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {this.state.secondcheckedDefault[i]==true?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.lessqty(i)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:8}}>{this.state.qty}</Text>
                           <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                           <Image
                           source={require('../assets/images/plus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                       </View>:null}
                       </View>:null
                )}
                        <TouchableWithoutFeedback onPress={()=>this.secondchangeLayout('spice')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/spices.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                SPICES & SAUCES
                            </Text>
                            </View>
                            <View>
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                {this.props.topping.map((toppings,i)=>
                        toppings.subType=='Krydd'?
                           <View style={[Styles.expandview, {height: this.state.secondspice ? null : 0, overflow: 'hidden'} ]}>
                    <View style={{flexDirection:'row',paddingVertical:5}}>
                    <CheckBox
                        
                        onClick={
                            () => this.secondchecktopping(i,toppings.name)
                        }
                        isChecked={!!this.state.secondcheckedDefault[i]}
                        // leftText={"CheckBox"}
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {this.state.secondcheckedDefault[i]==true?<View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.lessqty(i)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal:8}}>{this.state.qty}</Text>
                        <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                        <Image
                        source={require('../assets/images/plus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                    </View>:null}
                    </View>:null
                )}
                        </ScrollView>
                        </View>
                        <View style={[{height:"55%"},this.state.firsthalf?{display:'flex'}:{display:'none'}]}>
                

                        <ScrollView>
                            
                        <TouchableWithoutFeedback onPress={()=>this.changeLayout('meat')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/meat.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                MEAT
                            </Text>
                            </View>
                            <View>
                            
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                           
                            </View>
                        </View>
                    
                        </TouchableWithoutFeedback>
                {this.props.topping?this.props.topping.map((toppings,i)=>
               
                       toppings.subType=='Kjöt'?
                    <View style={[Styles.expandview, {height: this.state.meat ? null : 0, overflow: 'hidden'} ]}>
                    <View style={{flexDirection:'row',paddingVertical:5}}>
                    <CheckBox
                        
                        onClick={
                            () => this.checktopping(i,toppings.name,toppings.prices)
                        }
                        isChecked={checkedDefault.some(data=>data.toppingname==toppings.name)}
                        
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {checkedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.lessqty(toppings.name)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal:8}}>
                            {
                                
                                checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)
                            }
                        </Text>
                        <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                        <Image
                        source={require('../assets/images/plus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                    </View>:null}
                    </View>:null
                ):null}
                        <TouchableWithoutFeedback onPress={()=>this.changeLayout('veg')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/veg.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                VEGETABLES
                            </Text>
                            </View>
                            <View>
                            
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                            </View> 
                        </View>
                        </TouchableWithoutFeedback>
                {this.props.topping.map((toppings,i)=>
                       toppings.subType=='Grænmeti'?
                       <View style={[Styles.expandview, {height: this.state.veg ? null : 0, overflow: 'hidden'} ]}>
                       <View style={{flexDirection:'row',paddingVertical:5}}>
                       <CheckBox
                           
                           onClick={
                               () => this.checktopping(i,toppings.name)
                           }
                           isChecked={checkedDefault.some(data=>data.toppingname==toppings.name)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {checkedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.lessqty(i)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:8}}>
                                {checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)}
                           </Text>
                           <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                           <Image
                           source={require('../assets/images/plus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                       </View>:null}
                       </View>:null
                )}
                        <TouchableWithoutFeedback onPress={()=>this.changeLayout('cheese')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/cheese.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                CHEESE
                            </Text>
                            </View>
                            <View>
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                {this.props.topping.map((toppings,i)=>
                       toppings.subType=="Ostur"?
                       <View style={[Styles.expandview, {height: this.state.cheese ? null : 0, overflow: 'hidden'} ]}>
                       <View style={{flexDirection:'row',paddingVertical:5}}>
                       <CheckBox
                           
                           onClick={
                               () => this.checktopping(i,toppings.name)
                           }
                           isChecked={checkedDefault.some(data=>data.toppingname==toppings.name)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {checkedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.lessqty(i)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:8}}>
                                {checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)}
                           </Text>
                           <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                           <Image
                           source={require('../assets/images/plus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                       </View>:null}
                       </View>:null
                )}
                        <TouchableWithoutFeedback onPress={()=>this.changeLayout('spice')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/spices.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text>
                                SPICES & SAUCES
                            </Text>
                            </View>
                            <View>
                            <Image
                            source={require('../assets/images/rightarrow.png')}
                            style={{width:15,height:12}}
                            />
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                {this.props.topping.map((toppings,i)=>
                        toppings.subType=='Krydd'?
                           <View style={[Styles.expandview, {height: this.state.spice ? null : 0, overflow: 'hidden'} ]}>
                    <View style={{flexDirection:'row',paddingVertical:5}}>
                    <CheckBox
                        
                        onClick={
                            () => this.checktopping(i,toppings.name)
                        }
                        isChecked={checkedDefault.some(data=>data.toppingname==toppings.name)}
                        // leftText={"CheckBox"}
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {checkedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.lessqty(i)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal:8}}>
                            {checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)}
                            </Text>
                        <TouchableOpacity onPress={()=>this.addqty(i,toppings.name)}>
                        <Image
                        source={require('../assets/images/plus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                    </View>:null}
                    </View>:null
                )}
                        </ScrollView>
                        </View>
                        <View style={{height:200}}>
                        <View style={{flexDirection:'row'}}>
                            {this.state.totaltopping.map(topping=>
                            
                            <Text>{topping.topping}</Text>
                           
                            )}
                             </View>
                            <View style={{width:'95%',height:1,backgroundColor:'grey'}}/>
                            <View style={{width:300,paddingLeft:10}}>
                            <Text>{this.state.secondtotaltopping.map(topping=><Text>{topping.topping},</Text>)}</Text>
                            </View>
                            <View style={Styles.buttonStyle}>
                                <Text style={Styles.buttontextStyle}>
                                    TOTAL
                                </Text>
                                <Text style={Styles.buttontextStyle}>
                                    KR
                                </Text>
                            </View>
                            <Big_button>
                                ADD TO ORDER
                            </Big_button>
                        </View>
                    
                        
                    </View>
                    
                    </View>
                    
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    dropdown: {
        height:300,
        width:300,
        backgroundColor:'#ffffff',
        
    },
    textstyle: {
        fontSize:20,
        paddingLeft:15
    },
    buttonview: {
        width:80,
        height:40,
        backgroundColor:'#E73131',
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
    },
    container: {
        paddingTop: 30,
        justifyContent:'space-between',
        borderBottomWidth:1,
        height:55,
        flexDirection:'row',
        paddingHorizontal:5
        
    },
    buttonStyle: {
        width: 360,
        alignSelf: 'center',
        backgroundColor: '#E73131',
        height:55,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent:'space-between',
        marginBottom:5,
        flexDirection:'row',
        paddingHorizontal:5
        
    },
    buttontextStyle: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        
    },
    expandview: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
    },
    incdecstyle: {
        flexDirection:'row',
        width:60,
        height:20,
        borderWidth:1,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',

    },
    splittext: {
        fontSize:20,
        fontWeight:'700',
        paddingHorizontal:10
    }
    
})

function mapStateToProps(state){
    // console.log(state.topping)
    return {
        topping: state.topping
    }
}

function mapDispatchToProps(dispatch){
  
    return bindActionCreators({toppinglist},dispatch)
  }


export default connect(mapStateToProps,mapDispatchToProps)(Toppingpage);