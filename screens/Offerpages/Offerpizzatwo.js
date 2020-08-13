import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet,ImageBackground, LayoutAnimation, TouchableWithoutFeedback,Image,ScrollView} from 'react-native';
import Header from '../../common/Header';
import axios from 'axios';
// import { DropdownMenu } from '../common/DropdownMenu';
import ModalDropdown from 'react-native-modal-dropdown';
import { Big_button } from '../../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toppinglist,addtocart,sideslist } from '../../store/actions';
import CheckBox from 'react-native-check-box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import styles from '../../common/CommonStyle';

class Offerpizzatwo extends Component{

   size = this.props.navigation.state.params.size
   sizeno = this.props.navigation.state.params.sizeno
   offerdata = this.props.navigation.state.params.offerdata
   price = this.props.navigation.state.params.price

//    price = parseInt(this.props.navigation.state.params.price)

    state={ ownpizzaprice:0, sidessum:0, toppingname:[],selecteddrinks:[],maxprice:0,half:'first',split:false,selectedsides:[],selectoption:'menu',allpizza:[],indicator:0,selectbottom:'',pizzaname:[],selectedFruits: [], meat:false,secondmeat:false,veg:false,secondveg:false,data:[],selectedpizza:[],secondhalfprice:0,firsthalfprice:0,
            spice:false,secondspice:false,cheese:false,secondcheese:false,meattopping:[],checkedDefault:[{toppingname:'',qty:'',price:0}],secondcheckedDefault:[{toppingname:'',qty:'',price:0}],
            qty:1,totaltopping:[{topping:'',qty:0}],secondtotaltopping:[{topping:'',qty:0}], split:false,secondhalf:false,firsthalf:true,checkdefaultbottom:[],cartmodal:false}

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

        const initialtype = this.offerdata.offerDetails[0].type
        const initialismenupizza = this.offerdata.offerDetails[0].isMenuPizza
        this.setState({type:initialtype,isMenuPizza:initialismenupizza})

        axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu')
        .then((response)=>{
            const data = response['data']
            // console.log(data)
            this.setState({allpizza:data})
        })


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
                this.props.toppinglist();
                this.props.sideslist();
                
    }

    // selectdropdown=(idx,value)=>{
        
    //     // this.state.data.map(data=>data.name==value?this.setState({selectedpizza:data}):null)
    //     const selecteddata = []
    //     this.state.data.map(data=>data.name==value?selecteddata.push(data):null)
        
    //     const selectedtopping = selecteddata[0].toppings.map(topping=>topping)
    //     const selectedtoppingwithprice = []
    //     selectedtopping.map(data=>{
    //         data.prices.map(newdata=>{
                
    //             newdata.size==this.size?
    //             selectedtoppingwithprice.push({toppingname:data.name,price:newdata.price,qty:1,discountprice:newdata.discountAmount}):null
    //         })
    //     })
    //     const toppingname = selectedtopping.map(topping=>topping.name)
    //     // const selectedtoppingprice = selectedtopping.map(topping=>topping.prices)
    //     // const fullprice = []
    //     // selectedtoppingprice.map(data=>{
    //     //    data.map(newdata=>{
    //     //        newdata.size==this.size?
    //     //         fullprice.push(newdata.price):null
    //     //    })
    //     // })

    //     // console.log(selectedtoppingwithprice,'rohit')
        
    //     // const blankarray = []
    //     // toppingname.map(data=>blankarray.push({toppingname:data,qty:1}))
    //     this.setState({checkedDefault:selectedtoppingwithprice,firsthalf:true,secondhalf:false})
    //     this.setState ({
    //         totaltopping: [{topping: toppingname}]
    //       })
    //       const pizzadiscountprice = selectedtoppingwithprice.map(data=>data.discountprice)
    //              var discount = pizzadiscountprice.reduce(function(a, b){
    //                  return a + b;
    //              }, 0);


    //       const pizzaprice = selectedtoppingwithprice.map(data=>data.price)
    //              var sum = pizzaprice.reduce(function(a, b){
    //                  return a + b;
    //              }, 0);
    //             //  console.log(pizzadiscountprice,'dicou')
    //              this.setState({fullprice:this.price+sum-discount})
        
        
    // }

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

    checktopping = (i,toppingname,toppingprice,indicator)=>{
        // console.log(indicator)
        this.setState({selectedpizza:[],maxprice:0})
        var price = ""
        const totalprice = toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.sizeno){
                price = toppingprice.price
            }
            
            
        })
       
        // console.log(price,'sdf')
        const blankarray = this.state.checkedDefault
        if(blankarray.some(data=>data.toppingname==toppingname&&data.index==indicator)){
                const data = blankarray
                const index = data.findIndex(p => p.toppingname == toppingname && p.index==indicator)
                //  console.log(index,'asdf')
                 data.splice(index, 1);
                 this.setState({checkedDefault:data})

                 const pizzaprice = this.state.checkedDefault.map(data=>data.price)
                 var sum = pizzaprice.reduce(function(a, b){
                     return a + b;
                 }, 0);
                 this.setState({firsthalfprice:sum})
        }
        else
        {
        blankarray.push({index:indicator,toppingname:toppingname,qty:1,price:price})
        this.setState({checkedDefault:blankarray})

        // const pizzaprice = this.state.checkedDefault.map(data=>data.price)
        // var sum = pizzaprice.reduce(function(a, b){
        //     return a + b;
        // }, 0);
        // this.setState({firsthalfprice:sum})
        }
        var ownpizzapriceone = []
        var ownpizzapricetwo = []
        this.state.checkedDefault.map(data=>{
            if(data.index==0){
                ownpizzapriceone.push(data.price)
            }else{
                ownpizzapricetwo.push(data.price)
            }
        }) 
            
            var ownpizzaone = ownpizzapriceone.reduce(function(a, b){
                return a + b;
            }, 0);
            var ownpizzatwo = ownpizzapricetwo.reduce(function(a, b){
                return a + b;
            }, 0);
            this.setState({ownpizzaone,ownpizzatwo})
            if(ownpizzaone > ownpizzatwo){
                this.setState({ownpizzaprice:ownpizzaone})
            }else{
                this.setState({ownpizzaprice:ownpizzatwo})
            }
        
        
    }


    secondchecktopping=(i,toppingname,toppingprice,indicator)=>{
        // console.log(toppingname,toppingprice)
        this.setState({selectedpizza:[]})
        var price = ""
        const totalprice = toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.sizeno){
                price = toppingprice.price
            }
            })
            const blankarray = this.state.secondcheckedDefault
            if(blankarray.some(data=>data.toppingname==toppingname&&data.index==indicator)){
                    const data = blankarray
                    const index = data.findIndex(p => p.toppingname == toppingname && p.index==indicator)
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
            blankarray.push({index:indicator,toppingname:toppingname,qty:1,price:price})
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
    addqty = (i,toppingname,toppingprice,indicator)=>{
        
        
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.sizeno)
            {price = toppingprice.price}
            
        })
        const projects = this.state.checkedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname && p.index==indicator && p.qty < 3
              ? { ...p, qty: p.qty+1, price:(p.qty+1)*price }
              
              : p
          );

          this.setState({checkedDefault:newProjects})

          projects.map(p=>
            p.toppingname === toppingname && p.qty < 3
            ?this.setState({firsthalfprice:this.state.firsthalfprice+price})
            :null
        );
        // console.log(indicator,price,'rt')
        // if(indicator==0){
        //     this.setState({ownpizzaone:this.state.ownpizzaone+price})
        // }else{
        //     this.setState({ownpizzatwo:this.state.ownpizzatwo+price})
        // }
        // if(this.state.ownpizzaone > this.state.ownpizzapricetwo){
        //     this.setState({ownpizzaprice:this.state.ownpizzapriceone+this.state.ownpizzaone})
        // }else{
        //     this.setState({ownpizzaprice:this.state.ownpizzatwo})
        // }
          
    }
    
    secondaddqty = (i,toppingname,toppingprice,indicator)=>{
  
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.sizeno)
            {price = toppingprice.price}
            
        })
        const projects = this.state.secondcheckedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname  && p.index==indicator && p.qty < 3
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
    lessqty=(toppingname,toppingprice,indicator)=>{
        
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.sizeno)
            {price = toppingprice.price}
            
        })
        const projects = this.state.checkedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname && p.index==indicator && p.qty > 1
              ? { ...p, qty: p.qty-1 }
              : p
          );
          this.setState({checkedDefault:newProjects})

          projects.map(p=>
            p.toppingname === toppingname && p.qty > 1
            ?this.setState({firsthalfprice:this.state.firsthalfprice-price})
            :null
        );
           
    }

    secondlessqty=(toppingname,toppingprice,indicator)=>{
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.sizeno)
            {price = toppingprice.price}
            
        })
        const projects = this.state.secondcheckedDefault
        const newProjects = projects.map(p =>
            p.toppingname === toppingname && p.index==indicator && p.qty > 1
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

    selectindicator=(index,offerDetails)=>{
        console.log(offerDetails)
        const isMenuPizza = offerDetails.isMenuPizza
        const type = offerDetails.type
        
        this.setState({indicator:index,offerDetails:offerDetails,type:type,isMenuPizza:isMenuPizza,selectoption:'menu'})
        // console.log(offerDetails)
    }

    bottomvalue=(bottom)=>{
        this.setState({selectbottom:bottom})

        const blankarray = this.state.checkdefaultbottom
        const arrayindex = blankarray.map(data=>data.index)
        
        if(arrayindex.includes(this.state.indicator) ){

            
                // let people = [{"Name":"Bob","Age":"45"},{"Name":"Jim","Age":"45"}]
                const data = blankarray
                data.splice(data.findIndex(({index}) => index == this.state.indicator), 1);
              
                data.push({index:this.state.indicator,bottom:bottom})
                this.setState({checkdefaultbottom:data})
        
              
        }
       
        // }
        else{
            blankarray.push({index:this.state.indicator,bottom:bottom})
            this.setState({checkdefaultbottom:blankarray})
        }
}
    selectpizza=(indicator,pizzadetail,bottom)=>{
        
        this.setState({checkedDefault:[],secondcheckedDefault:[],secondhalfprice:0})
        const price = this.size=='Small'?pizzadetail.minimumAmountSmall:this.size=='Medium'?pizzadetail.minimumAmountMedium:this.size=='Large'?pizzadetail.minimumAmountLarge:null
        // console.log(price)
        const size = this.size
        const blankarray = this.state.selectedpizza
        const arrayindex = blankarray.map(data=>data.index)
        
        if(arrayindex.includes(indicator) ){

            
                // let people = [{"Name":"Bob","Age":"45"},{"Name":"Jim","Age":"45"}]
                const data = blankarray
                data.splice(data.findIndex(({index}) => index == indicator), 1);
              
                data.push({index:indicator, pizzadetail:pizzadetail,price:price,size:size,bottom:bottom})
                this.setState({selectedpizza:data})
        
              
        }
       
        // }
        else{
            blankarray.push({index:indicator, pizzadetail:pizzadetail,price:price,size:size,bottom:bottom})
            this.setState({selectedpizza:blankarray})
        }
        const newprice = blankarray.map(data=>data.price)
        const maxprice = newprice.reduce(function(a,b){
            return Math.max(a,b)
        })
        this.setState({maxprice:maxprice})
    }

    selectoption=(option)=>{
        this.setState({selectoption:option})
    }

    selectsides=(indicator,sidedetail)=>{
        // console.log(sidedetail,indicator)
        var price = ""
        this.props.sidesname.map(sides=>{
            if(sides.keyValue==sidedetail){
                price = sides.price
            }
            
            
        })
        // console.log(price,'sides price')
        const blankarray = this.state.selectedsides
        const arrayindex = blankarray.map(data=>data.index)

        if(arrayindex.includes(indicator)){
            const data = blankarray
            data.splice(data.findIndex(({index}) => index == indicator), 1);
            data.push({index:indicator, sidedetail:sidedetail,price:price})
            this.setState({selectedsides:data})

            const sidesprice = blankarray.map(data=>data.price)
                 var sidessum = sidesprice.reduce(function(a, b){
                     return a + b;
                 }, 0);
                this.setState({sidessum:sidessum})

        }
        else{
            blankarray.push({index:indicator, sidedetail:sidedetail, price:price})
            this.setState({selectedsides:blankarray})

            const sidesprice = blankarray.map(data=>data.price)
                 var sidessum = sidesprice.reduce(function(a, b){
                     return a + b;
                 }, 0);
               this.setState({sidessum:sidessum})
        }
        
        
    }

    addtocart=()=>{
        this.setState({cartmodal:true})
        if(this.state.selectedpizza.length > 0){
            const selectedpizza = this.state.selectedpizza
            // const selectedsides = this.state.selectedsides
            const pizzaname = selectedpizza.map(data=>data.pizzadetail.name)
            const pizzaprice = this.state.maxprice
            const sidesprice = this.state.sidessum
            const totalprice = pizzaprice+sidesprice
            const size = selectedpizza.size
            const toppingname = this.state.toppingname
            const sidesname = this.state.selectedsides
            const selecteddrinks = this.state.selecteddrinks
            const useMinimumPrice = this.offerdata.useMinimumPrice
            const minimumprice = 0
            const bottom = []
            const ownpizza = false
            // console.log(sidesprice,'asdf')
           const keyValue = pizzaname+size
           const addpizza = {bottom:bottom,ownpizza:ownpizza,name:selectedpizza,size:size,price:totalprice,keyValue:keyValue,toppingname:toppingname,
                               selecteddrinks:selecteddrinks,selectedsides:sidesname,minimumprice,useMinimumPrice}
        //    console.log(selectedpizza,'si')
           this.props.addtocart(addpizza)
           this.setState({orderprice:addpizza.price})
        setTimeout(()=>{this.setState({cartmodal: false})}, 2000)

           
       }else{
        var halftopping = []
        this.state.checkedDefault.map(data=>{
            halftopping.push({index:data.index,toppingname:data.toppingname,qty:data.qty,price:data.price})
        })

        var secondtopping = []
        this.state.secondcheckedDefault.map(data=>{
            secondtopping.push({index:data.index,toppingname:data.toppingname,qty:data.qty,price:data.price})
        })
        const ownselectedpizza = []
        const ownpizza = true
        const sidesname = this.state.selectedsides
        const selecteddrinks = this.state.selecteddrinks
        const useMinimumPrice = this.offerdata.useMinimumPrice
        const minimumprice = 0
        const price = this.price+this.state.ownpizzaprice+this.state.sidessum
        const halftoppingone = halftopping
        const bottom = this.state.checkdefaultbottom
        const toppingname = this.state.toppingname
        const halftoppingtwo = secondtopping
        const addpizza = {bottom:bottom,price:price,secondfreepizza:true,ownpizza:ownpizza,name:ownselectedpizza,selectedsides:sidesname,
            halftoppingone:halftoppingone,halftoppingtwo:halftoppingtwo,
            selecteddrinks:selecteddrinks,minimumprice,useMinimumPrice,toppingname:toppingname,
            // size:size,price:totalprice,keyValue:keyValue,
            
        }
        this.props.addtocart(addpizza)
        this.setState({orderprice:addpizza.price})
        setTimeout(()=>{this.setState({cartmodal: false})}, 2000)
    }
    }
    
    render(){
       
        // console.log(this.state.indicator,'ppp',this.offerdata)
        const { split,checkedDefault,secondcheckedDefault,selectedpizza,indicator,selectoption,
                selectedsides,half,selectbottom } = this.state;
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
                <ImageBackground
                source={require('../../assets/images/background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >
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
                      source={require('../../assets/images/cart.png')}
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

               <Header
                 menupress={()=>this.props.navigation.goBack()}
                 title={'Offer'}
                 sideicon={require('../../assets/images/back.png')}
                 notificationicon={require('../../assets/images/notification.png')}
                 carticon={require('../../assets/images/cart.png')}
                 profileicon={require('../../assets/images/profile.png')}
               />
           
                <View style={{paddingTop:20,paddingLeft:20}}>
                   <Text style={{fontFamily:'Avenir',fontSize:18,fontWeight:'200'}}>
                       {this.offerdata.description}
                   </Text>
                </View>

                   <View style={{paddingTop:5, width:'100%',flexDirection:'row',paddingLeft:20}}>
                    <ScrollView horizontal={true} style={{height:50}} showsHorizontalScrollIndicator={false}>
                    {this.offerdata.offerDetails.map((offerDetails,index)=>
                    <TouchableWithoutFeedback onPress={()=>this.selectindicator(index,offerDetails)}>
                    
                    <View style={[Styles.pageindicatorstyle,this.state.indicator==index?{backgroundColor:'red'}:null]}>
                    <Text style={{fontFamily:'Avenir'}}>{index}</Text>
                    
                    </View>
                    
                    </TouchableWithoutFeedback>
                    )}
                    </ScrollView>
                    
                </View>
        {
            this.state.type=="PIZZA"?
                <View style={{width:'100%',flexDirection:'row'}}>

                        
                        <View>
                        <TouchableOpacity
                            onPress={()=>this.bottomvalue('normal')}
                        >
                              {this.state.selectbottom=='normal'?
                            <Image
                                source={require('../../assets/images/normal_black.png')}
                                style={Styles.imageview}
                            />
                            :
                            <Image
                                source={require('../../assets/images/normal_white.png')}
                                style={Styles.imageview}
                            />
                            }
                            </TouchableOpacity> 
                        </View>
                        
                        <View>
                            <TouchableOpacity
                            onPress={()=>this.bottomvalue('thin')}
                            >
                             {this.state.selectbottom=='thin'?
                            <Image
                                source={require('../../assets/images/thin_black.png')}
                                style={Styles.imageview}
                            />
                            :
                            <Image
                                source={require('../../assets/images/thin_white.png')}
                                style={Styles.imageview}
                            />
                            }
                            </TouchableOpacity>
                            
                        </View>
                        <View>
                        <TouchableOpacity
                            onPress={()=>this.bottomvalue('garlic')}
                        >
                             {this.state.selectbottom=='garlic'?
                            <Image
                                source={require('../../assets/images/garlic_black.png')}
                                style={Styles.imageview}
                            />
                            :
                            <Image
                                source={require('../../assets/images/garlic_white.png')}
                                style={Styles.imageview}
                            />
                            }
                            </TouchableOpacity> 
                        </View>
                
               </View>
               
        :null}
        <View style={{flexDirection:'row',width:'100%',alignItems:'center',paddingHorizontal:20}}>
        <View>
        <TouchableOpacity onPress={()=>this.selectoption('menu')}>
        <Text style={{fontFamily:'Avenir',fontSize:20}}>Menu</Text>
        </TouchableOpacity>
        {selectoption=='menu'?<View style={{width:'100%',height:2,backgroundColor:'#E73131'}} />:null}
        </View>
        <View>
        <TouchableOpacity onPress={()=>this.selectoption('yourself')}>
        {this.state.type=='PIZZA'?<Text style={{fontFamily:'Avenir',fontSize:20,paddingLeft:20}}>Choose Yourself</Text>:null}
        </TouchableOpacity>
        {selectoption=='yourself'?<View style={{width:'100%',height:2,backgroundColor:'#E73131',marginLeft:10}} />:null}
        </View>
        </View>
        <View style={[Styles.splitview,this.state.split?{justifyContent:'space-between'}:null]}>
    {this.state.split && selectoption=='yourself'?
        <View style={{flexDirection:'row'}}>
            <View>
            <TouchableOpacity onPress={()=>this.setState({half:'first'})}>
            <Text style={{fontFamily:'Avenir'}}>First Half</Text>
            </TouchableOpacity>
            {half=='first'?<View style={{width:'100%',height:2,backgroundColor:'#E73131'}} />:null}
            </View>
            <View>
            <TouchableOpacity onPress={()=>this.setState({half:'second'})}>
            <Text style={{fontFamily:'Avenir',paddingLeft:20}}>Second Half</Text>
            </TouchableOpacity>
            {half=='second'?<View style={{width:'100%',height:2,backgroundColor:'#E73131',marginLeft:10}} />:null}
            </View>
        </View>
    :null}
        {selectoption=='yourself'?
        <TouchableOpacity onPress={()=>this.setState({split:!this.state.split})}>
        <View style={{width:100,height:30,backgroundColor:'#E73131',alignItems:'center',justifyContent:'center'}}>
       <Text style={{fontFamily:'Avenir',color:'#fff',fontFamily:'Avenir'}}>{this.state.split?'Cancel Split':'Split In Half'}</Text>
        </View>
        </TouchableOpacity>
        :null}
        </View>
        <ScrollView>
        {this.state.type=="PIZZA" && selectoption=='menu' ? 
            this.state.allpizza.map(pizzadetail=>{
                        //  console.log(pizzadetail,'asdf')
                         return(
                           this.size=='Small'&&pizzadetail.availableSmall==true
                           ||this.size=='Medium'&&pizzadetail.availableMedium==true
                           ||this.size=='Large'&&pizzadetail.availableLarge==true?
                             <View>
                                 <View style={Styles.maintype}>
                                 <View style={{width:'75%'}}>
                                 <Text style={Styles.namestyle}>{pizzadetail.name}</Text>
                                 <Text style={{fontFamily:'Avenir'}} >{pizzadetail.toppingsSummary}</Text>
                                 
                                 </View>
                                 <TouchableOpacity onPress={()=>this.selectpizza(indicator,pizzadetail,selectbottom)}>
                                 <View style={{width:'15%',marginHorizontal:10}}>
                                 <View style={[Styles.selectionbox,selectedpizza.map(data=>data.index==indicator && data.pizzadetail.keyValue == pizzadetail.keyValue?{backgroundColor:'red'}:null)]}>
                                 <Text style={{fontFamily:'Avenir'}}>Select</Text>
                                 
                                 </View>
                                 </View>
                                 </TouchableOpacity>
                                 </View>
                             </View>
                        :null)
                     })
            
            :this.state.type=='PIZZA'&&selectoption=='yourself'?
            <View>
            <View style={[{height:"55%"},this.state.half=='second'?{display:'flex'}:{display:'none'}]}>
            <TouchableWithoutFeedback onPress={()=>this.secondchangeLayout('meat')}>
            <View style={Styles.container}>
                <View style={{flexDirection:'row'}}>
                <Image
                source={require('../../assets/images/meat.png')}
                style={{width:15,height:12,marginRight:15}}
                />
                <Text style={{fontFamily:'Avenir'}}>
                    MEAT
                </Text>
                </View>
                <View>
                
                <Image
                source={require('../../assets/images/rightarrow.png')}
                style={{width:15,height:12}}
                />
               
                </View>
            </View>
        
            </TouchableWithoutFeedback>
            {
                this.props.topping?this.props.topping.map((toppings,i)=>
                    toppings.subType=='Kjöt'?
                 <View style={[Styles.expandview, {height: this.state.secondmeat ? null : 0, overflow: 'hidden'} ]}>
                 <View style={{flexDirection:'row',paddingVertical:5}}>
                 <CheckBox
                     
                     onClick={
                         () => this.secondchecktopping(i,toppings.name,toppings.prices,this.state.indicator)
                     }
                     isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                     // leftText={"CheckBox"}
                 />
                 <Text style={Styles.text}>
                     {toppings.name}
                 </Text>
                 </View>
                 {secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?
                 <View style={Styles.incdecstyle}>
                     <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices,this.state.indicator)}>
                     <Image
                     source={require('../../assets/images/minus.png')}
                     style={{width:15,height:12}}
                     />
                     </TouchableOpacity>
                     <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                     {
                         secondcheckedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)
                     }
                     </Text>
                     <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                     <Image
                     source={require('../../assets/images/plus.png')}
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
                            source={require('../../assets/images/veg.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text style={{fontFamily:'Avenir'}}>
                                VEGETABLES
                            </Text>
                            </View>
                            <View>
                            
                            <Image
                            source={require('../../assets/images/rightarrow.png')}
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
                               () => this.secondchecktopping(i,toppings.name,toppings.prices,this.state.indicator)
                           }
                           isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices,this.state.indicator)}>
                           <Image
                           source={require('../../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                           {
                            secondcheckedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)
                            }
                           </Text>
                           <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                           <Image
                           source={require('../../assets/images/plus.png')}
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
                            source={require('../../assets/images/cheese.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text style={{fontFamily:'Avenir'}}>
                                CHEESE
                            </Text>
                            </View>
                            <View>
                            <Image
                            source={require('../../assets/images/rightarrow.png')}
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
                               () => this.secondchecktopping(i,toppings.name,toppings.prices,this.state.indicator)
                           }
                           isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                           // leftText={"CheckBox"}
                       />
                       <Text style={Styles.text}>
                           {toppings.name}
                       </Text>
                       </View>
                       {secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?<View style={Styles.incdecstyle}>
                           <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices,this.state.indicator)}>
                           <Image
                           source={require('../../assets/images/minus.png')}
                           style={{width:15,height:12}}
                           />
                           </TouchableOpacity>
                           <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                           {
                            secondcheckedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)
                        }  
                           </Text>
                           <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                           <Image
                           source={require('../../assets/images/plus.png')}
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
                            source={require('../../assets/images/spices.png')}
                            style={{width:15,height:12,marginRight:15}}
                            />
                            <Text style={{fontFamily:'Avenir'}}>
                                SPICES & SAUCES
                            </Text>
                            </View>
                            <View>
                            <Image
                            source={require('../../assets/images/rightarrow.png')}
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
                            () => this.secondchecktopping(i,toppings.name,toppings.prices,this.state.indicator)
                        }
                        isChecked={secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                        // leftText={"CheckBox"}
                    />
                    <Text style={Styles.text}>
                        {toppings.name}
                    </Text>
                    </View>
                    {secondcheckedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?<View style={Styles.incdecstyle}>
                        <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices,this.state.indicator)}>
                        <Image
                        source={require('../../assets/images/minus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                        <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                        {
                            secondcheckedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)
                        }
                        </Text>
                        <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                        <Image
                        source={require('../../assets/images/plus.png')}
                        style={{width:15,height:12}}
                        />
                        </TouchableOpacity>
                    </View>:null}
                    </View>:null
                )}
                </View>
                 <View style={[{height:"55%"},this.state.half=='first'?{display:'flex'}:{display:'none'}]}>
                

                {/* <ScrollView> */}
                    
                <TouchableWithoutFeedback onPress={()=>this.changeLayout('meat')}>
                <View style={Styles.container}>
                    <View style={{flexDirection:'row'}}>
                    <Image
                    source={require('../../assets/images/meat.png')}
                    style={{width:15,height:12,marginRight:15}}
                    />
                    <Text style={{fontFamily:'Avenir'}}>
                        MEAT
                    </Text>
                    </View>
                    <View>
                    
                    <Image
                    source={require('../../assets/images/rightarrow.png')}
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
                    () => this.checktopping(i,toppings.name,toppings.prices,this.state.indicator)
                }
                isChecked={checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                
            />
            <Text style={Styles.text}>
                {toppings.name}
            </Text>
            </View>
            {checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?<View style={Styles.incdecstyle}>
                <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices,this.state.indicator)}>
                <Image
                source={require('../../assets/images/minus.png')}
                style={{width:15,height:12}}
                />
                </TouchableOpacity>
                <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                    {
                        
                        checkedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)
                    }
                </Text>
                <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                <Image
                source={require('../../assets/images/plus.png')}
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
                    source={require('../../assets/images/veg.png')}
                    style={{width:15,height:12,marginRight:15}}
                    />
                    <Text style={{fontFamily:'Avenir'}}>
                        VEGETABLES
                    </Text>
                    </View>
                    <View>
                    
                    <Image
                    source={require('../../assets/images/rightarrow.png')}
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
                       () => this.checktopping(i,toppings.name,toppings.prices,this.state.indicator)
                   }
                   isChecked={checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                   // leftText={"CheckBox"}
               />
               <Text style={Styles.text}>
                   {toppings.name}
               </Text>
               </View>
               {checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?<View style={Styles.incdecstyle}>
                   <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices,this.state.indicator)}>
                   <Image
                   source={require('../../assets/images/minus.png')}
                   style={{width:15,height:12}}
                   />
                   </TouchableOpacity>
                   <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                        {checkedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)}
                   </Text>
                   <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                   <Image
                   source={require('../../assets/images/plus.png')}
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
                    source={require('../../assets/images/cheese.png')}
                    style={{width:15,height:12,marginRight:15}}
                    />
                    <Text style={{fontFamily:'Avenir'}}>
                        CHEESE
                    </Text>
                    </View>
                    <View>
                    <Image
                    source={require('../../assets/images/rightarrow.png')}
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
                       () => this.checktopping(i,toppings.name,toppings.prices,this.state.indicator)
                   }
                   isChecked={checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                   // leftText={"CheckBox"}
               />
               <Text style={Styles.text}>
                   {toppings.name}
               </Text>
               </View>
               {checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?<View style={Styles.incdecstyle}>
                   <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices,this.state.indicator)}>
                   <Image
                   source={require('../../assets/images/minus.png')}
                   style={{width:15,height:12}}
                   />
                   </TouchableOpacity>
                   <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                        {checkedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)}
                   </Text>
                   <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                   <Image
                   source={require('../../assets/images/plus.png')}
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
                    source={require('../../assets/images/spices.png')}
                    style={{width:15,height:12,marginRight:15}}
                    />
                    <Text style={{fontFamily:'Avenir'}}>
                        SPICES & SAUCES
                    </Text>
                    </View>
                    <View>
                    <Image
                    source={require('../../assets/images/rightarrow.png')}
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
                    () => this.checktopping(i,toppings.name,toppings.prices,this.state.indicator)
                }
                isChecked={checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)}
                // leftText={"CheckBox"}
            />
            <Text style={Styles.text}>
                {toppings.name}
            </Text>
            </View>
            {checkedDefault.some(data=>data.toppingname==toppings.name&&data.index==this.state.indicator)?<View style={Styles.incdecstyle}>
                <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices,this.state.indicator)}>
                <Image
                source={require('../../assets/images/minus.png')}
                style={{width:15,height:12}}
                />
                </TouchableOpacity>
                <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                    {checkedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)}
                    </Text>
                <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices,this.state.indicator)}>
                <Image
                source={require('../../assets/images/plus.png')}
                style={{width:15,height:12}}
                />
                </TouchableOpacity>
            </View>:null}
            </View>:null
        )}
                {/* </ScrollView> */}
                </View>
            </View>
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
        :null}
        </ScrollView>
                     <View style={{bottom:-15}}>
                            <View style={Styles.buttonStyle}>
                                <Text style={Styles.buttontextStyle}>
                                    TOTAL
                                </Text>
                                <Text style={Styles.buttontextStyle}>
                                    
                                   {this.state.maxprice > 0?
                                       this.state.maxprice+this.state.sidessum
                                    :this.price+this.state.ownpizzaprice+this.state.sidessum} KR
                                </Text>
                            </View>
                            {this.state.indicator+1 < this.offerdata.offerDetails.length?
                            <Big_button
                            backgroundColor={'grey'}
                            textcolor={'#fff'}
                            >Add to cart
                            
                                
                            </Big_button>
                           :
                            <Big_button
                            backgroundColor={'#E73131'}
                            textcolor={'#fff'}
                            onPress={()=>this.addtocart()}
                            >
                                Add to cart
                            </Big_button>
                            }
                        </View>
                    
                        
                    </View>
                    
                  
                    </ImageBackground>  
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
    pageindicatorstyle: {
        backgroundColor:'grey',
        height:40,
        width:40,
        borderRadius:40/2,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5
    },
    diamondView: {
        width: 100,
        height: 100,
        backgroundColor: '#ffffff',
        marginHorizontal:20,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',   
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
    selectionbox: {
        height:40,
        width:60,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    splitview:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingHorizontal:20,
        alignItems:'center'
    },
    imageview:{
        height:100,
        width:100,
        resizeMode:'contain',
        marginHorizontal:10
    }

    
})

function mapStateToProps(state){
    // console.log(state,'sid')
    return {
        topping: state.topping,
        sidesname: state.sides

    }
}

function mapDispatchToProps(dispatch){
  
    return bindActionCreators({toppinglist,addtocart,sideslist},dispatch)
  }


export default connect(mapStateToProps,mapDispatchToProps)(Offerpizzatwo);