import React,{Component} from 'react';
import {View,Text, StyleSheet,ImageBackground,TouchableWithoutFeedback,ScrollView,TouchableOpacity,LayoutAnimation,SafeAreaView,Image} from 'react-native';
import Header from '../../common/Header';
import { connect } from 'react-redux';
import {pizzamenu,drinkslist,toppinglist, addtocart} from '../../store/actions';
import { bindActionCreators } from 'redux';
import { Big_button } from '../../common';
import CheckBox from 'react-native-check-box';
import Axios from 'axios';
import Modal from 'react-native-modal';
import styles from '../../common/CommonStyle';

class Offerpizza extends Component{

    state = {half:'first',allpizza:[],drinksdata:[],toppingdata:[], indicator:0,offerDetails:'',type:'',half:'first',
            isMenuPizza:'',selectedpizza:[],toppingname:[],meat:false,secondmeat:false,veg:false,secondveg:false,
            selectedsides:[],selecteddrinks:[],selectedtopping:[{index:'',toppingname:''}],secondcheckedDefault:[{toppingname:'',qty:'',price:0}],
            checkedDefault:[{toppingname:'',qty:'',price:0}],cartmodal:false}

    offerlength = this.props.navigation.state.params.length
    offerdata = this.props.navigation.state.params.offerdata

    componentDidMount=()=>{

        const initialtype = this.offerdata.offerDetails[0].type
        const initialismenupizza = this.offerdata.offerDetails[0].isMenuPizza
        const offerDetailssize = this.offerdata.offerDetails[0].size
        this.setState({type:initialtype,isMenuPizza:initialismenupizza,offerDetailssize})


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

        this.props.toppinglist();

    }

    changeLayout = (value) => {
        // console.log(value)
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

    selectindicator=(index,offerDetails)=>{
        const isMenuPizza = offerDetails.isMenuPizza
        const type = offerDetails.type
        
        this.setState({indicator:index,offerDetails:offerDetails,type:type,isMenuPizza:isMenuPizza})
        // console.log(offerDetails)
    }

    selectpizza=(indicator,pizzadetail)=>{
        // console.log(this.state.offerDetailssize)
        const price = this.offerdata['minimumPrice']
        var pizzasize = ''
        if(this.state.offerDetailssize==9){
            pizzasize = 'small'
        }else if (this.state.offerDetailssize==12){
            pizzasize = 'Medium'
        }else if(this.state.offerDetailssize==16){
            pizzasize = 'Large'
        }
        // console.log(pizzasize)
        const blankarray = this.state.selectedpizza
        const arrayindex = blankarray.map(data=>data.index)
        // console.log(pizzasize,'sdf')
        if(arrayindex.includes(indicator) ){

            
                // let people = [{"Name":"Bob","Age":"45"},{"Name":"Jim","Age":"45"}]
                const data = blankarray
                data.splice(data.findIndex(({index}) => index == indicator), 1);
                // this.setState({images:data})
                data.push({index:indicator, pizzadetail:pizzadetail,price:price,size:pizzasize})
                this.setState({selectedpizza:data})
              
        }
       
        // }
        else{
            blankarray.push({index:indicator, pizzadetail:pizzadetail,price:price,size:pizzasize})
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

    secondchecktopping=(i,toppingname,toppingprice,indicator)=>{
        // console.log(toppingname,toppingprice)
        this.setState({selectedpizza:[]})
        var price = ""
        const totalprice = toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.offerdata.offerDetails[0].size){
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
            blankarray.push({index:indicator,toppingname:toppingname,qty:1,price:price})
            this.setState({secondcheckedDefault:blankarray})
           
           
            // const toppingprice = this.state.secondcheckedDefault.map(data=>data.price)
            // const pizzaprice = this.state.secondcheckedDefault.map(data=>data.price)
            // var sum = pizzaprice.reduce(function(a, b){
            //     return a + b;
            // }, 0);
            // this.setState({secondhalfprice:sum})
            this.setState({totaltopprice:toppingprice})
            }
    }

    checktopping = (i,toppingname,toppingprice,indicator)=>{
        // console.log(indicator,toppingprice)
        this.setState({selectedpizza:[]})
        var price = ""
        const totalprice = toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.offerdata.offerDetails[0].size){
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

                 const toppingprice = this.state.checkedDefault.map(data=>data.price)
                //  var sum = pizzaprice.reduce(function(a, b){
                //      return a + b;
                //  }, 0);
                //  this.setState({maxprice:this.price+sum})
                
        }
        else
        {
        blankarray.push({index:indicator,toppingname:toppingname,qty:1,price:price})
        this.setState({checkedDefault:blankarray})

        const toppingprice = this.state.checkedDefault.map(data=>data.price)
        
        const second = toppingprice.sort(function(a,b){
            return b-a;
        });
        var sum = toppingprice.reduce(function(a,b){return a+b},0);
        var max1 = second[0]
        var max2 = second[1]

        this.setState({maxprice:sum-(max1+max2)})
        // console.log(toppingprice)
        }
        
    }

    addqty = (i,toppingname,toppingprice)=>{
        // if(this.state.checkedDefault.map(data=>data.qty < 3))
        // {
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.offerdata.offerDetails[0].size)
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
            if(toppingprice.size==this.offerdata.offerDetails[0].size)
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

    lessqty=(toppingname,toppingprice)=>{
        var price = ''
        toppingprice.map(toppingprice=>{
            if(toppingprice.size==this.offerdata.offerDetails[0].size)
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
            if(toppingprice.size==this.offerdata.offerDetails[0].size)
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

    bottomvalue=(bottom)=>{
        this.setState({selectbottom:bottom})
    }

    addtocart=()=>{
        this.setState({cartmodal:true})
        if(this.state.selectedpizza.length > 0){
         const selectedpizza = this.state.selectedpizza
         const pizzaname = selectedpizza
         const price = selectedpizza[0].price
         const size = selectedpizza.size
         const toppingname = this.state.toppingname
         const sidesname = this.state.selectedsides
         const selecteddrinks = this.state.selecteddrinks
         const useMinimumPrice = this.offerdata.useMinimumPrice
         const minimumprice = this.offerdata.minimumPrice
        const ownpizza = false
        const keyValue = pizzaname+size
        const addpizza = {ownpizza:ownpizza,name:pizzaname,size:size,price:price,keyValue:keyValue,toppingname:toppingname,
                            selecteddrinks:selecteddrinks,selectedsides:sidesname,useMinimumPrice,minimumprice}
        // console.log(pizzaname,'si')
        this.props.addtocart(addpizza)
        this.setState({selectedpizza:[]})
        this.setState({orderprice:addpizza.price})
            setTimeout(()=>{this.setState({cartmodal: false})}, 2000)
    }else{
        const selectedpizza = this.offerdata

         const pizzaname = []
         pizzaname.push({pizzadetail:selectedpizza})
         const price = selectedpizza.minimumPrice
         const size = 0
         const toppingname = this.state.toppingname
         const sidesname = this.state.selectedsides
         const selecteddrinks = this.state.selecteddrinks
         const useMinimumPrice = this.offerdata.useMinimumPrice
         const minimumprice = this.offerdata.minimumPrice
         const ownpizza = false
        const keyValue = pizzaname+size
        const addpizza = {ownpizza:ownpizza,name:pizzaname,size:size,price:price,keyValue:keyValue,toppingname:toppingname,
                            selecteddrinks:selecteddrinks,selectedsides:sidesname,useMinimumPrice,minimumprice}
        this.props.addtocart(addpizza)
        this.setState({selectedpizza:[]})
        this.setState({orderprice:addpizza.price})
            setTimeout(()=>{this.setState({cartmodal: false})}, 2000)
    }
        // console.log(selectedpizza)

        
    }

    split=()=>{
        this.setState({split:!this.state.split,half:'first',secondcheckedDefault:[]})
    }

    render(){
        // console.log(this.state.selectedpizza)
        const {indicator,selectedpizza,selectedsides,selecteddrinks,selectedtopping,isMenuPizza,
                toppingname,secondcheckedDefault,checkedDefault,half} = this.state;
        
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
                <ImageBackground
                source={require('../../assets/images/background.png')}
                style={{width:'100%',height:'100%',justifyContent:'flex-start'}}
                >
            <View style={{height:'100%',width:'100%',backgroundColor:'#f2f2f2'}}>
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
                    <Text style={{fontFamily:'Avenir'}}>{index}</Text>
                    
                    </View>
                    
                    </TouchableWithoutFeedback>
                    )}
                    </ScrollView>
                    
                </View>
                <Text style={{fontFamily:'Avenir'}}>{this.offerdata.description}</Text>
            <ScrollView>
                {
                    this.state.type=='PIZZA' && isMenuPizza==true?
                    this.state.allpizza.map(pizzadetail=>{
                         
                        return(
                            <View>
                                <View style={Styles.maintype}>
                                <View style={{width:'75%'}}>
                                <Text style={Styles.namestyle}>{pizzadetail.name}</Text>
                                <Text style={{fontFamily:'Avenir'}} >{pizzadetail.toppingsSummary}</Text>
                                
                                </View>
                                <TouchableOpacity onPress={()=>this.selectpizza(indicator,pizzadetail)}>
                                <View style={{width:'15%',marginHorizontal:10}}>
                                <View style={[Styles.selectionbox,selectedpizza.map(data=>data.index==indicator && data.pizzadetail.keyValue == pizzadetail.keyValue?{backgroundColor:'red'}:null)]}>
                                <Text style={{fontFamily:'Avenir'}}>Select</Text>
                                
                                </View>
                                </View>
                                </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                    
                    :this.state.type=='PIZZA' && isMenuPizza==false?
                    
                <View>
                    <View style={{width:'100%',flexDirection:'row'}}>
                            
                                                    
                            <View style={[ Styles.diamondView,this.state.selectbottom=='normal'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                                onPress={()=>this.bottomvalue('normal')}
                            >
                                <Image
                                    source={require('../../assets/images/normal.png')}
                                    style={Styles.imageview}
                                />
                                </TouchableOpacity> 
                            </View>
                            
                            <View style={[ Styles.diamondView,this.state.selectbottom=='thin'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                                <TouchableOpacity
                                onPress={()=>this.bottomvalue('thin')}
                                >
                                <Image
                                    source={require('../../assets/images/thin.png')}
                                    style={Styles.imageview}
                                />
                                </TouchableOpacity>
                                
                            </View>
                            <View style={[ Styles.diamondView,this.state.selectbottom=='garlic'?{backgroundColor:'grey'}:{backgroundColor:'#ffffff'}]}>
                            <TouchableOpacity
                                onPress={()=>this.bottomvalue('garlic')}
                            >
                                <Image
                                    source={require('../../assets/images/garlic.png')}
                                    style={Styles.imageview}
                                />
                                </TouchableOpacity> 
                            </View>
                </View>
                <View style={[Styles.splitview,this.state.split?{justifyContent:'space-between'}:null]}>
    {this.state.split?
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
        {
        <TouchableOpacity onPress={this.split}>
        <View style={{width:100,height:30,backgroundColor:'#E73131',alignItems:'center',justifyContent:'center'}}>
       <Text style={{color:'#fff',fontFamily:'Avenir'}}>{this.state.split?'Cancel Split':'Split In Half'}</Text>
        </View>
        </TouchableOpacity>
        }
        </View>
                           
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
                this.props.toppingdetail?this.props.toppingdetail.map((toppings,i)=>
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
                     <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
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
                     <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
                        {this.props.toppingdetail.map((toppings,i)=>
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
                           <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
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
                           <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
                        {this.props.toppingdetail.map((toppings,i)=>
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
                           <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
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
                           <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
                {this.props.toppingdetail.map((toppings,i)=>
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
                        <TouchableOpacity onPress={()=>this.secondlessqty(toppings.name,toppings.prices)}>
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
                        <TouchableOpacity onPress={()=>this.secondaddqty(i,toppings.name,toppings.prices)}>
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
        {this.props.toppingdetail?this.props.toppingdetail.map((toppings,i)=>
       
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
                <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
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
                <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
        {this.props.toppingdetail.map((toppings,i)=>
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
                   <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
                   <Image
                   source={require('../../assets/images/minus.png')}
                   style={{width:15,height:12}}
                   />
                   </TouchableOpacity>
                   <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                        {checkedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)}
                   </Text>
                   <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
        {this.props.toppingdetail.map((toppings,i)=>
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
                   <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
                   <Image
                   source={require('../../assets/images/minus.png')}
                   style={{width:15,height:12}}
                   />
                   </TouchableOpacity>
                   <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                        {checkedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)}
                   </Text>
                   <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
        {this.props.toppingdetail.map((toppings,i)=>
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
                <TouchableOpacity onPress={()=>this.lessqty(toppings.name,toppings.prices)}>
                <Image
                source={require('../../assets/images/minus.png')}
                style={{width:15,height:12}}
                />
                </TouchableOpacity>
                <Text style={{fontFamily:'Avenir',paddingHorizontal:8}}>
                    {checkedDefault.map(data=>data.toppingname==toppings.name&&data.index==this.state.indicator?data.qty:null)}
                    </Text>
                <TouchableOpacity onPress={()=>this.addqty(i,toppings.name,toppings.prices)}>
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
                        </View>
                    // )
                // })
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
                                <Text style={{fontFamily:'Avenir'}}>Select</Text>
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
                                <Text style={{fontFamily:'Avenir'}}>Select</Text>
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
            {this.state.indicator+1 < this.offerlength?
            <Big_button
            backgroundColor={'grey'}
            textcolor={'#fff'}
            >Add to cart
            
                
            </Big_button>
            :<Big_button
            backgroundColor={'#E63C2F'}
            textcolor={'#fff'}
            onPress={()=>this.addtocart()}>Add to cart
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
    container: {
        paddingTop: 30,
        justifyContent:'space-between',
        borderBottomWidth:1,
        height:55,
        flexDirection:'row',
        paddingHorizontal:5   
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
    splitview:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingHorizontal:20,
        alignItems:'center',
        marginTop:10
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