import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, LayoutAnimation,ImageBackground, TouchableWithoutFeedback,Image,ScrollView} from 'react-native';
import Header from '../common/Header';
import axios from 'axios';
// import { DropdownMenu } from '../common/DropdownMenu';
import ModalDropdown from 'react-native-modal-dropdown';
import { Big_button } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toppinglist,addtocart } from '../store/actions';
import CheckBox from 'react-native-check-box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import stringsoflanguages from './Language';
import styles from '../common/CommonStyle';

class Toppingpage extends Component{

   size = this.props.navigation.state.params.size
   selectsize = this.props.navigation.state.params.selectpizza
   price = parseInt(this.props.navigation.state.params.price)
   bottom = this.props.navigation.state.params.bottom

    state={ selectedname:'',pizzaname:[],selectedFruits: [], meat:false,secondmeat:false,veg:false,secondveg:false,data:[],selectedpizza:[],secondhalfprice:0,
            spice:false,secondspice:false,cheese:false,secondcheese:false,meattopping:[],checkedDefault:[],secondcheckedDefault:[],pizzalistmodal:false,
            qty:1,totaltopping:[{topping:'',qty:0}],secondtotaltopping:[{topping:'',qty:0}], split:false,secondhalf:false,firsthalf:true,bottom:[]}

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
            // console.log(data)
            const pizzaname = data.map(data=>data.name)
            this.setState({pizzaname:pizzaname,data:data})

            const topping = data.map(data=>data.toppings,data.name)
            this.setState({topping:topping,fullprice:this.price})

        })
        const databottom = []
        databottom.push({index:0,bottom:this.bottom})
        this.setState({bottom:databottom})
                this.props.toppinglist();
                
    }

    selectdropdown=(value)=>{
        this.setState({pizzalistmodal:false,selectedname:value})
        // this.state.data.map(data=>data.name==value?this.setState({selectedpizza:data}):null)
        const selecteddata = []
        this.state.data.map(data=>data.name==value?selecteddata.push(data):null)
        
        const selectedtopping = selecteddata[0].toppings.map(topping=>topping)
        const selectedtoppingwithprice = []
        selectedtopping.map(data=>{
            data.prices.map(newdata=>{
                
                newdata.size==this.size?
                selectedtoppingwithprice.push({index:0,toppingname:data.name,price:newdata.price,qty:1,discountprice:newdata.discountAmount}):null
            })
        })
        const toppingname = selectedtopping.map(topping=>topping.name)
       
        this.setState({checkedDefault:selectedtoppingwithprice,firsthalf:true,secondhalf:false})
        this.setState ({
            totaltopping: [{topping: toppingname}]
          })
          const pizzadiscountprice = selectedtoppingwithprice.map(data=>data.discountprice)
                 var discount = pizzadiscountprice.reduce(function(a, b){
                     return a + b;
                 }, 0);


          const pizzaprice = selectedtoppingwithprice.map(data=>data.price)
                 var sum = pizzaprice.reduce(function(a, b){
                     return a + b;
                 }, 0);
                //  console.log(pizzadiscountprice,'dicou')
                 this.setState({fullprice:this.price+sum-discount})
        
        
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

    checktopping = (i,toppingname,toppingprice)=>{
        
        var price = ""
        const totalprice = toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.size){
                price = toppingprice.price
            }
            
            
        })
       
        // console.log(price,'sdf')
        const blankarray = this.state.checkedDefault
        if(blankarray.some(data=>data.toppingname==toppingname)){
                const data = blankarray
                const index = data.findIndex(p => p.toppingname == toppingname)
                //  console.log(index,'asdf')
                 data.splice(index, 1);
                 this.setState({checkedDefault:data})

                 const pizzaprice = this.state.checkedDefault.map(data=>data.price)
                 var sum = pizzaprice.reduce(function(a, b){
                     return a + b;
                 }, 0);
                 this.setState({fullprice:this.price+sum})
        }
        else
        {
        blankarray.push({index:0,toppingname:toppingname,qty:1,price:price})
        this.setState({checkedDefault:blankarray})

        const pizzaprice = this.state.checkedDefault.map(data=>data.price)
        var sum = pizzaprice.reduce(function(a, b){
            return a + b;
        }, 0);
        this.setState({fullprice:this.price+sum})

        }
        
    }


    secondchecktopping=(i,toppingname,toppingprice)=>{
        // console.log(toppingname,toppingprice)
        var price = ""
        const totalprice = toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.size){
                price = toppingprice.price
            }
            })
            const blankarray = this.state.secondcheckedDefault
            if(blankarray.some(data=>data.toppingname==toppingname)){
                    const data = blankarray
                    const index = data.findIndex(p => p.toppingname == toppingname)
                    //  console.log(index,'asdf')
                     data.splice(index, 1);
                     this.setState({secondcheckedDefault:data})
    
                     const pizzaprice = this.state.secondcheckedDefault.map(data=>data.price)
                     var sum = pizzaprice.reduce(function(a, b){
                         return a + b;
                     }, 0);
                     this.setState({secondhalfprice:sum})
            }
            else
            {
            blankarray.push({index:0,toppingname:toppingname,qty:1,price:price})
            this.setState({secondcheckedDefault:blankarray})
    
            const pizzaprice = this.state.secondcheckedDefault.map(data=>data.price)
            var sum = pizzaprice.reduce(function(a, b){
                return a + b;
            }, 0);
            this.setState({secondhalfprice:sum})
    
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
    addqty = (i,toppingname,toppingprice)=>{
        // if(this.state.checkedDefault.map(data=>data.qty < 3))
        // {
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.size)
            {price = toppingprice.price}
            
        })
        const projects = this.state.checkedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname && p.qty < 3
              ? { ...p, qty: p.qty+1, price:(p.qty+1)*price }
              : p
          );
          this.setState({checkedDefault:newProjects})

          projects.map(p=>
            p.toppingname === toppingname && p.qty < 3
            ?this.setState({fullprice:this.state.fullprice+price})
            :null
        );     
    }
    
    secondaddqty = (i,toppingname,toppingprice)=>{
  
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.size)
            {price = toppingprice.price}
            
        })
        const projects = this.state.secondcheckedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname && p.qty < 3
              ? { ...p, qty: p.qty+1, price:(p.qty+1)*price }
              : p
          );
          this.setState({secondcheckedDefault:newProjects})

          projects.map(p=>
            p.toppingname === toppingname && p.qty < 3
            ?this.setState({secondhalfprice:this.state.secondhalfprice+price})
            :null
        );     
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
    lessqty=(toppingname,toppingprice)=>{
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.size)
            {price = toppingprice.price}
            
        })
        const projects = this.state.checkedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname && p.qty > 1
              ? { ...p, qty: p.qty-1 }
              : p
          );
          this.setState({checkedDefault:newProjects})

          projects.map(p=>
            p.toppingname === toppingname && p.qty > 1
            ?this.setState({fullprice:this.state.fullprice-price})
            :null
        ); 
    }

    secondlessqty=(toppingname,toppingprice)=>{
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.size)
            {price = toppingprice.price}
            
        })
        const projects = this.state.secondcheckedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname && p.qty > 1
              ? { ...p, qty: p.qty-1 }
              : p
          );
          this.setState({secondcheckedDefault:newProjects})

          projects.map(p=>
            p.toppingname === toppingname && p.qty > 1
            ?this.setState({secondhalfprice:this.state.secondhalfprice-price})
            :null
        ); 
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

    addtocart = () => {
        this.setState({cartmodal:true})
        var halftopping = []
        this.state.checkedDefault.map(data=>{
            halftopping.push({index:data.index,toppingname:data.toppingname,qty:data.qty,price:data.price})
        })
        var secondtopping = []
        this.state.secondcheckedDefault.map(data=>{
            secondtopping.push({index:data.index,toppingname:data.toppingname,qty:data.qty,price:data.price})
        })
        const ownselectedpizza = this.state.checkedDefault
        const ownselectedpizza2 = this.state.secondcheckedDefault
        const ownpizza = true
        const sidesname = []
        const selecteddrinks = []
        const bottom = this.state.bottom
        const size = this.selectsize
        const halftoppingone = halftopping
        const halftoppingtwo = secondtopping
        const useMinimumPrice = true
        const minimumprice = this.state.fullprice+this.state.secondhalfprice
        const toppingname = []
        const price = this.state.fullprice+this.state.secondhalfprice
        const addpizza = {bottom:bottom,size:size,price:price,halftoppingtwo:halftoppingtwo,halftoppingone:halftoppingone,ownpizza:ownpizza,name:ownselectedpizza,name2:ownselectedpizza2,selectedsides:sidesname,bottom:bottom,
                        selecteddrinks:selecteddrinks,minimumprice,useMinimumPrice,toppingname:toppingname,
           
            
        }
        this.props.addtocart(addpizza)
        this.setState({checkedDefault:[],secondcheckedDefault:[],fullprice:''})

        this.setState({orderprice:addpizza.price})
            setTimeout(()=>{this.setState({cartmodal: false})}, 2000)
        
}

    openmodal=()=>{
        this.setState({pizzalistmodal:!this.state.pizzalistmodal})
    }
    
    render(){
        // console.log(this.state.pizzaname,'sdr')
       const firsttoppingname = []
        this.state.checkedDefault.map(data=>{
            firsttoppingname.push({index:data.index,toppingname:data.toppingname,qty:data.qty,price:data.price})
        })
        const secondtoppingname = []
        this.state.secondcheckedDefault.map(data=>{
            secondtoppingname.push({index:data.index,toppingname:data.toppingname,qty:data.qty,price:data.price})
        })
        // console.log(firsttoppingname,'sdf')
        const { split,checkedDefault,secondcheckedDefault } = this.state;
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
            <View style={{height:'100%',width:'100%'}}>
            <Modal
                isVisible={this.state.cartmodal}
                backdropColor="#000"
                backdropOpacity={0.8}
                animationInTiming={400}
                animationOutTiming={800}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={400}
                onBackdropPress={()=>this.setState({cartmodal:false})}
                >
                <View style={{height:'100%',justifyContent:'flex-end',backgroundColor:'transparent'}}> 
                <View style={styles.cartdesign}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image
                      source={require('../assets/images/cart.png')}
                      style={{width:27,height:23,marginBottom:5,marginRight:2}}
                    />
                   <Text style={{paddingLeft:10,color:'#fff'}}>1 Order Added</Text>
                   </View>
                   <View>
                     <Text style={{color:'#fff'}}>{this.state.orderprice} Kr.</Text>
                   </View>
        
                </View>
                </View>
                </Modal>
                    <Modal
                        isVisible={this.state.pizzalistmodal}
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={800}
                        backdropTransitionOutTiming={800}
                        onBackdropPress={()=>this.setState({pizzalistmodal:false})}
                            
                    >
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                       <ImageBackground
                        source={require('../assets/images/background.png')}
                        style={[Styles.Pizzamodal,{justifyContent:'center'}]}
                        >
                        <ScrollView style={{width:'100%',paddingHorizontal:20}}>
                        {
                            this.state.pizzaname.map(pizzaname=>{
                                return(
                                    <TouchableOpacity onPress={()=>this.selectdropdown(pizzaname)}>
                                    <View style={{width:'100%',height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <Text style={{fontSize:20,fontFamily:'Avenir'}}>
                                            {pizzaname}
                                        </Text>
                                        {this.state.selectedname==pizzaname?
                                        <Image
                                            source={require('../assets/images/right2.png')}
                                            style={{width:30,height:24,resizeMode:'contain'}}
                                        />
                                        :null}
                                        
                                    </View>
                                    <View style={{width:'100%',height:0.4,backgroundColor:'#000'}} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </ScrollView>
                        </ImageBackground>
                    </View>
                </Modal>
               <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={stringsoflanguages.makeyourown}
                 sideicon={require('../assets/images/back.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
                <ImageBackground
                source={require('../assets/images/background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >
            <View style={{width:'100%',justifyContent:'center',paddingTop:'15%'}}>
            {/* <View> */}
            <ImageBackground
                 source={require('../assets/images/background_white2.png')}
                 style={{width:'100%',height:150}}
                 resizeMode={'contain'}
                 
               >
                    <View style={{paddingTop:20}}>
                   <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'200',height:35}}>
                   {stringsoflanguages.nowchosseyourtoppings}
                   </Text>
                   </View>
                   <View>
                   <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'600',paddingTop:20}}>
                   {stringsoflanguages.choosefrommenu}
                   </Text>
                   </View>
                   </ImageBackground>
                   <View style={{flexDirection:'row',paddingLeft:10}}>
                    <TouchableOpacity onPress={this.openmodal}>
                    <View style={{backgroundColor:'#ffffff',height:40,width:'100%',flexDirection:'row',paddingHorizontal:5,alignItems:'center'}}>
                    
                    <Text style={{fontFamily:'Avenir',fontSize:18}}>{stringsoflanguages.iamcreatemyown}</Text>
                    <Image
                        source={require('../assets/images/down.png')}
                        style={{width:20,height:20,resizeMode:'contain'}}
                    />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.split()}>
                    <View style={Styles.buttonview}>
                    <Text style={{fontFamily:'Avenir',color:'#ffffff'}}>{split?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.cancelsplit}</Text>:<Text>{stringsoflanguages.splitinhalf}</Text>}</Text>
                    </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:30,flexDirection:'row'}}>
                        <View>
                        <TouchableOpacity onPress={()=>this.firsthalf()}>
                        <View style={{width:'100%',alignItems:'center'}}>
                        <Text style={Styles.splittext}>{stringsoflanguages.firsthalf}</Text>
                       {this.state.firsthalf==true?<View style={{width:'100%',height:2,backgroundColor:'#E73131'}} />:null}
                        </View>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>this.secondhalf()}>
                        <View>
                        {split?<Text style={Styles.splittext}>{stringsoflanguages.secondhalf}</Text>:null}
                        {this.state.secondhalf==true?<View style={{width:'100%',height:2,backgroundColor:'#E73131'}} />:null}
                        </View>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                    <View style={[{height:"50%"},this.state.secondhalf?{display:'flex'}:{display:'none'}]}>
                

                        <ScrollView>
                            
                        <TouchableWithoutFeedback onPress={()=>this.secondchangeLayout('meat')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/meat.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text style={{fontFamily:'Avenir'}}>
                            {stringsoflanguages.meat}
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
                            () => this.secondchecktopping(i,toppings.name,toppings.prices)
                        }
                        isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name)}
                        // leftText={"CheckBox"}
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {secondcheckedDefault.some(data=>data.toppingname==toppings.name)?
                    <View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                        {
                            secondcheckedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)
                        }
                        </Text>
                        <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
                            <Text style={{fontFamily:'Avenir'}}>
                            {stringsoflanguages.vegetables}
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
                               () => this.secondchecktopping(i,toppings.name,toppings.prices)
                           }
                           isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {secondcheckedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                           {
                            secondcheckedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)
                            }
                           </Text>
                           <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
                            <Text style={{fontFamily:'Avenir'}}>
                            {stringsoflanguages.cheese}
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
                               () => this.secondchecktopping(i,toppings.name,toppings.prices)
                           }
                           isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {secondcheckedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                           {
                            secondcheckedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)
                        }  
                           </Text>
                           <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
                            <Text style={{fontFamily:'Avenir'}}>
                            {stringsoflanguages.spicesauses}
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
                            () => this.secondchecktopping(i,toppings.name,toppings.prices)
                        }
                        isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name)}
                        // leftText={"CheckBox"}
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {secondcheckedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                        {
                            secondcheckedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)
                        }
                        </Text>
                        <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
                        <View style={[{height:"50%"},this.state.firsthalf?{display:'flex'}:{display:'none'}]}>
                

                        <ScrollView>
                            
                        <TouchableWithoutFeedback onPress={()=>this.changeLayout('meat')}>
                        <View style={Styles.container}>
                            <View style={{flexDirection:'row'}}>
                            <Image
                            source={require('../assets/images/meat.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text style={{fontFamily:'Avenir'}}>
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
                        <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                            {
                                
                                checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)
                            }
                        </Text>
                        <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
                            <Text style={{fontFamily:'Avenir'}}>
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
                               () => this.checktopping(i,toppings.name,toppings.prices)
                           }
                           isChecked={checkedDefault.some(data=>data.toppingname==toppings.name)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {checkedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                                {checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)}
                           </Text>
                           <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
                            <Text style={{fontFamily:'Avenir'}}>
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
                               () => this.checktopping(i,toppings.name,toppings.prices)
                           }
                           isChecked={checkedDefault.some(data=>data.toppingname==toppings.name)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {checkedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
                           <Image
                           source={require('../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                                {checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)}
                           </Text>
                           <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
                            <Text style={{fontFamily:'Avenir'}}>
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
                            () => this.checktopping(i,toppings.name,toppings.prices)
                        }
                        isChecked={checkedDefault.some(data=>data.toppingname==toppings.name)}
                        // leftText={"CheckBox"}
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {checkedDefault.some(data=>data.toppingname==toppings.name)?<View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
                        <Image
                        source={require('../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                            {checkedDefault.map(data=>data.toppingname==toppings.name?data.qty:null)}
                            </Text>
                        <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
                    <View>
                        <View style={{width:350,height:35,marginLeft:30,flexDirection:'row',marginRight:30}}>
                        <Text style={{fontFamily:'Avenir',color:'#000'}}>
                            {firsttoppingname.map(topping=>{
                                return(
                               
                                    topping.toppingname+ ", "  
                              
                                );
                            })}
                        </Text>
                        </View>
                        {[secondtoppingname.length > 0?<View style={{width:'90%',height:0.4,backgroundColor:'#000',marginLeft:30}}/>:null]}
                        <View style={{width:350,height:35,marginLeft:30,flexDirection:'row',marginRight:30}}>
                        <Text style={{fontFamily:'Avenir',color:'#000'}}>
                            {secondtoppingname.map(topping=>{
                                return(
                               
                                    topping.toppingname+ ", "  
                              
                                );
                            })}
                        </Text>
                        </View>
                    </View>

                        <View style={{top:'-5%'}}> 
                            <View style={Styles.buttonStyle}>
                                <Text style={Styles.buttontextStyle}>
                                {stringsoflanguages.total}
                                </Text>
                                <Text style={Styles.buttontextStyle}>
                                   {this.state.fullprice+this.state.secondhalfprice} KR
                                </Text>
                            </View>
                            <Big_button
                                backgroundColor={'#E63C2F'}
                                textcolor={'#fff'}
                                onPress={()=>this.addtocart()}>
                                    {stringsoflanguages.addtocart}
                            </Big_button>
                        </View>
                    
                        
                    </View>
                    </ImageBackground>
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
        paddingLeft:15,
        fontFamily:'Avenir'
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
        width: '95%',
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
        fontFamily:'Avenir'
        
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
        paddingHorizontal:10,
        fontFamily:'Avenir'
    },
    Pizzamodal: {
        top:20,
        height:'100%',
        width:'110%',
        alignItems:'flex-start',
        backgroundColor:'#fff',
        paddingHorizontal:1,
        paddingTop:5,
        borderRadius:10
    },
    
})

function mapStateToProps(state){
    // console.log(state.topping)
    return {
        topping: state.topping
    }
}

function mapDispatchToProps(dispatch){
  
    return bindActionCreators({toppinglist,addtocart},dispatch)
  }


export default connect(mapStateToProps,mapDispatchToProps)(Toppingpage);