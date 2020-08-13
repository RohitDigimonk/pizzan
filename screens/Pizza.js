import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet,Image,ScrollView,AsyncStorage, TouchableOpacity,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Header from '../common/Header';
import Axios from 'axios';
import FlipCard from 'react-native-flip-card';
import styles from '../common/CommonStyle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pizzalist,addtocart } from '../store/actions';
import LottieView from 'lottie-react-native';
import stringsoflanguages from './Language';
import Modal from 'react-native-modal';



class Pizza extends Component{

    state = {cartmodal:false,status:'',categorypizza:[],pizzasize:'',flip:false,bottom:'',display:'flex',keyValue:'',selectedpizza:[],allpizza:[]}

    imagebaseurl='https://assets.pizzan.is/images/pizzas/'

    // callapi=()=>{
  //   Axios.get('https://s1-api.pizzan.is/api/v1/referencedata/languages',
  //   {headers:{language:'en-us'}}
  // ).then((response)=>{
  //   console.log(response,'sdf')
  // })}

    componentDidMount=()=>{
        this.loadSession();
      }

    loadSession = async() => {
      const lang = await AsyncStorage.getItem('language')
      this.setState({
        lang:await AsyncStorage.getItem('language')
      })
      Axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu/categories/pizza',
        {headers:{'Accept-language':lang}}
        )
        .then((response)=>{
            const data = response['data']
            const status = response.status
            // console.log(response)
            this.setState({allpizza:data,status:status})
        })

    }

    categorylist(){
        // axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu/categories/pizza')
        // .then((response)=>{
        //     const categorydata=response['data']
        //     // console.log(categorydata)
        //     this.setState({categorypizza:categorydata})
        // })
    }

    selectsize=(size)=>{
        this.setState({pizzasize:size})
        
    }

    selectbottom=(value)=>{
      this.setState({bottom:value})
    }
   
   pizzadetail=(pizzadetail)=>{
        // console.log(pizzadetail)
        
        const keyvalue = pizzadetail['keyValue']
        // console.log(keyvalue)
        this.setState({keyValue:keyvalue,selectedpizza:pizzadetail})    
   }

   addtocart=(pizzadata,name,size,bottom)=>{
      this.setState({cartmodal:true})
      
      const pizzaname = []
      pizzaname.push({pizzadetail:pizzadata})
      const sidesname = []
      const selecteddrinks = []
      const keyValue = name+size
      const toppingname = []
      // const bottom = bottom
      const addpizza = {bottom:bottom,ownpizza:false,name:pizzaname,size:size,price:this.state.price,keyValue,toppingname:toppingname,
                        selectedsides:sidesname,selecteddrinks:selecteddrinks}
      this.setState({bottom:''})
      this.setState({orderprice:addpizza.price})
      this.props.addtocart(addpizza)
      this.setState({bottom:''})
      setTimeout(()=>{this.setState({cartmodal: false})}, 2000)
   }
    
    render(){
        // console.log(this.state.bottom)
        const {pizzasize,bottom} = this.state;
        // console.log(this.state.allpizza)
        return(
            <SafeAreaView style={{backgroundColor:'#E73131'}}>
               <ImageBackground
                source={require('../assets/images/full_background.png')}
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
               <Header
                 profilepress={()=>this.props.navigation.navigate('Delivery')}
                 title={'PIZZA'}
                 menupress={()=>this.props.navigation.goBack()}
                 sideicon={require('../assets/images/back.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
                
        {this.state.status==''?
        <LottieView
        source={require('../assets/lottie/pizza_loader.json')}
        autoPlay
        loop
    >

    </LottieView>:
               <ScrollView>
                    <View style={{justifyContent:"center",alignItems:'center'}}>
                    <Text style={{fontFamily:'Avenir', fontSize:20,color:'#E73131'}}>Þær Vinsælustu</Text>
                    </View>
                   {
                       this.state.allpizza.map(categorypizza=>
                            categorypizza.name=='Þær Vinsælustu'?
                            categorypizza.pizzas.map(allpizza=>{
                                // console.log(allpizza) 
                    return(
                                
                        <View style={{alignItems:'center'}}>
                            {/* <FlipCard 
                            flip={this.state.flip}
                            flipHorizontal={false}
                            flipVertical={true}
                            friction={15}
                            clickable={false}
                            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                            // perspective={1000}
                            > */}
                            <View style={Styles.maincontainer}>
                                    {this.state.keyValue==allpizza.keyValue?
                                    
                                     <View>
                                       <View style={{width:360,height:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                       <TouchableOpacity onPress={()=>this.setState({keyValue:''})}>
                                       <Image
                                        source={require('../assets/images/cross.png')}
                                        style={{width:20,height:20,resizeMode:'contain'}}
                                      />
                                      </TouchableOpacity>
                                      </View>
                                     <View style={[Styles.backsizeview]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {stringsoflanguages.choosesize}
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {allpizza.availableSmall==true?<Text>{stringsoflanguages.small}</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {allpizza.availableMedium==true?<Text>{stringsoflanguages.medium}</Text>:null}
                                     </Text>
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {allpizza.availableLarge==true?<Text>{stringsoflanguages.large}</Text>:null}
                                     </Text>
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                      {stringsoflanguages.choosebottom}
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <TouchableOpacity onPress={()=>this.selectbottom('normal')}>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={()=>this.selectbottom('Þykkbotna')}>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      
                                      {pizzasize=='large'?null:<Text style={{fontFamily:'Avenir'}}>Þykkbotna</Text>}
                                      
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,bottom)}>
                                    <View>
                                        
                                        <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700',fontFamily:'Avenir'}}>
                                          {
                                          pizzasize=='small'&&this.state.bottom=='keto'?this.state.selectedpizza['minimumAmountSmall']+700:
                                          pizzasize=='small'?this.state.selectedpizza['minimumAmountSmall']:
                                          pizzasize=='medium'?this.state.selectedpizza['minimumAmountMedium']:
                                          pizzasize=='large'?this.state.selectedpizza['minimumAmountLarge']:null
                                          } kr.</Text>
                                        <Image
                                        source={require('../assets/images/rightarrow.png')}
                                        style={{width:10,height:16,marginLeft:10}}
                                        />
                                    </View>
                                    
                                  </View>
                                  </View>
                                    :null}
                                    <TouchableOpacity onPress={()=>this.pizzadetail(allpizza)}>
                                    <View style={[this.state.keyValue==allpizza.keyValue?{display:'none'}:{display:'flex'}]}>
                                    <View style={{flexDirection:"row"}}>
                                    <View>

                                    
                                    <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 
                                     
                                    
                                     
                                      
                                      <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                      
                                      
                                  
                                  </View>
                                  <View>
                                  
                                  <Image
                                    source={{uri:this.imagebaseurl+allpizza.imageName}}
                                    style={{width:150,height:140,resizeMode:'contain'}}
                                  />
                                 
                                  </View>
                                  </View>
                                  <View style={Styles.bottomview}>
                                        <View>
                                          
                                          <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.selectsize}</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                
                                 
                                  </View>
                                  </TouchableOpacity>
                            </View> 
                        </View>)}
                                )
                            :null
                    
                    
                    
                    )}
                    <View style={{justifyContent:"center",alignItems:'center'}}>
                    <Text style={{fontSize:20,color:'#E73131',fontFamily:'Avenir'}}>Þessar Gourmet</Text>
                    </View>
                    {
                       this.state.allpizza.map(categorypizza=>
                            categorypizza.name=='Þessar Gourmet'?
                            categorypizza.pizzas.map(allpizza=>{
                                // console.log(allpizza) 
                    return(
                                
                        <View style={{alignItems:'center'}}>
                            {/* <FlipCard 
                            flip={this.state.flip}
                            flipHorizontal={false}
                            flipVertical={true}
                            friction={15}
                            clickable={false}
                            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                            // perspective={1000}
                            > */}
                            <View style={Styles.maincontainer}>
                                    {this.state.keyValue==allpizza.keyValue?
                                    
                                     <View>
                                       <View style={{width:360,height:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                       <TouchableOpacity onPress={()=>this.setState({keyValue:''})}>
                                       <Image
                                        source={require('../assets/images/cross.png')}
                                        style={{width:20,height:20,resizeMode:'contain'}}
                                      />
                                      </TouchableOpacity>
                                      </View>
                                     <View style={[Styles.backsizeview]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {stringsoflanguages.choosesize}
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                    
                                     {allpizza.availableSmall==true?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.small}</Text>:null}
                                    
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     
                                     {allpizza.availableMedium==true?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.medium}</Text>:null}
                                   
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableLarge==true?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.large}</Text>:null}
                                     </Text>
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                      {stringsoflanguages.choosebottom}
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={()=>this.selectbottom('normal')}>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text style={{fontFamily:'Avenir'}} >
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity  onPress={()=>this.selectbottom('Þykkbotna')}>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      
                                      {pizzasize=='large'?null:<Text style={{fontFamily:'Avenir'}}>Þykkbotna</Text>}
                                    
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,bottom)}>
                                    <View>
                                        
                                        <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700',fontFamily:'Avenir'}}>
                                          {
                                          pizzasize=='small'&&this.state.bottom=='keto'?this.state.selectedpizza['minimumAmountSmall']+700:
                                          pizzasize=='small'?this.state.selectedpizza['minimumAmountSmall']:
                                          pizzasize=='medium'?this.state.selectedpizza['minimumAmountMedium']:
                                          pizzasize=='large'?this.state.selectedpizza['minimumAmountLarge']:null
                                          } kr.</Text>
                                        <Image
                                        source={require('../assets/images/rightarrow.png')}
                                        style={{width:10,height:16,marginLeft:10}}
                                        />
                                    </View>
                                    
                                  </View>
                                  </View>
                                    :null}
                                    <TouchableOpacity onPress={()=>this.pizzadetail(allpizza)}>
                                    <View style={[this.state.keyValue==allpizza.keyValue?{display:'none'}:{display:'flex'}]}>
                                    <View style={{flexDirection:"row"}}>
                                    <View>

                                    <TouchableOpacity onPress={()=>this.pizzadetail(allpizza)}>
                                    <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 </TouchableOpacity>
                                     
                                    
                                      {/* {
                                      allpizza.toppings.map(toppings=>{
                                        const originalsplit = toppings.originalName.split('-')
                                        // const originalname = originalsplit[1]
                                        // console.log(originalname)
                                        return(
                                          <Text style={{paddingLeft:10,width:200}}>
                                            {originalsplit[1]}  
                                          </Text>
                                        )
                                      })
                                      } */}
                                      <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                  
                                  </View>
                                  <View>
                                  
                                  <Image
                                    source={{uri:this.imagebaseurl+allpizza.imageName}}
                                    style={{width:150,height:140,resizeMode:'contain'}}
                                  />
                                 
                                  </View>
                                  </View>
                                  <View style={Styles.bottomview}>
                                        <View>
                                          
                                          <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.selectsize}</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                  
{/*                                 
                                 <TouchableWithoutFeedback onPress={()=>alert('ok')}>
                                  <View style={Styles.bottomview}>
                                    <View>
                                    
                                        <Text>Add to order</Text>
                                       
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                       
                                        <Image
                                        source={require('../assets/images/rightarrow.png')}
                                        style={{width:10,height:16,marginLeft:10}}
                                        />
                                    </View>
                                    
                                  </View>
                                  
                                  </TouchableWithoutFeedback> */}
                                  </View>
                                  </TouchableOpacity>
                            </View> 
                        </View>)}
                                )
                            :null
                    
                    
                    
                    )}
                  
                      <View style={{justifyContent:"center",alignItems:'center'}}>
                    <Text style={{fontFamily:'Avenir',fontSize:20,color:'#E73131'}}>Ketó Pizzur</Text>
                    </View>
                    {
                       this.state.allpizza.map(categorypizza=>
                            categorypizza.name=='Ketó Pizzur'?
                            categorypizza.pizzas.map(allpizza=>{
                                // console.log(allpizza) 
                    return(
                                
                        <View style={{alignItems:'center'}}>
                            {/* <FlipCard 
                            flip={this.state.flip}
                            flipHorizontal={false}
                            flipVertical={true}
                            friction={15}
                            clickable={false}
                            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                            // perspective={1000}
                            > */}
                            <View style={Styles.maincontainer}>
                                    {this.state.keyValue==allpizza.keyValue?
                                    
                                     <View>
                                       <View style={{width:360,height:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                       <TouchableOpacity onPress={()=>this.setState({keyValue:''})}>
                                       <Image
                                        source={require('../assets/images/cross.png')}
                                        style={{width:20,height:20,resizeMode:'contain'}}
                                      />
                                      </TouchableOpacity>
                                      </View>
                                     <View style={[Styles.backsizeview]}>
                                    
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {stringsoflanguages.choosesize}
                                     </Text>
                                     
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {allpizza.availableSmall==true?<Text>{stringsoflanguages.small}</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     
                                    </View>
                                      <View style={Styles.backsizeview}>
                                    
                                      <Text style={{fontFamily:'Avenir'}}>
                                      {stringsoflanguages.choosebottom}
                                      </Text>
                                    
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                        {pizzasize=='small'?<Text style={{fontFamily:'Avenir'}} onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text style={{fontFamily:'Avenir'}} onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                     
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,bottom)}>
                                    <View>
                                        
                                        <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700',fontFamily:'Avenir'}}>
                                          {
                                          pizzasize=='small'&&this.state.bottom=='keto'?this.state.selectedpizza['minimumAmountSmall']+700:
                                          pizzasize=='small'?this.state.selectedpizza['minimumAmountSmall']:
                                          pizzasize=='medium'?this.state.selectedpizza['minimumAmountMedium']:
                                          pizzasize=='large'?this.state.selectedpizza['minimumAmountLarge']:null
                                          } kr.</Text>
                                        <Image
                                        source={require('../assets/images/rightarrow.png')}
                                        style={{width:10,height:16,marginLeft:10}}
                                        />
                                    </View>
                                    
                                  </View>
                                  </View>
                                    :null}
                                    <TouchableOpacity onPress={()=>this.pizzadetail(allpizza)}>
                                    <View style={[this.state.keyValue==allpizza.keyValue?{display:'none'}:{display:'flex'}]}>
                                    <View style={{flexDirection:"row"}}>
                                    <View>

                                    <TouchableOpacity onPress={()=>this.pizzadetail(allpizza)}>
                                    <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 </TouchableOpacity>
                                     
                                    
                                    
                                      <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                  
                                  </View>
                                  <View>
                                  
                                  <Image
                                    source={{uri:this.imagebaseurl+allpizza.imageName}}
                                    style={{width:150,height:140,resizeMode:'contain'}}
                                  />
                                 
                                  </View>
                                  </View>
                                  
                                  <View style={Styles.bottomview}>
                                        <View>
                                          
                                          <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.selectsize}</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                 
                                  </View>
                                  </TouchableOpacity>
                            </View> 
                        </View>)}
                                )
                            :null
                    
                    
                    
                    )}
              

                    <View style={{justifyContent:"center",alignItems:'center'}}>
                    <Text style={{fontFamily:'Avenir',fontSize:20,color:'#E73131'}}>Nýjar og Spennandi</Text>
                    </View>
                    {
                       this.state.allpizza.map(categorypizza=>
                            categorypizza.name=='Nýjar og Spennandi'?
                            categorypizza.pizzas.map(allpizza=>{
                                // console.log(allpizza) 
                    return(
                                
                        <View style={{alignItems:'center'}}>
                            {/* <FlipCard 
                            flip={this.state.flip}
                            flipHorizontal={false}
                            flipVertical={true}
                            friction={15}
                            clickable={false}
                            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                            // perspective={1000}
                            > */}
                            <View style={Styles.maincontainer}>
                                    {this.state.keyValue==allpizza.keyValue?
                                    
                                     <View>
                                       <View style={{width:360,height:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                       <TouchableOpacity onPress={()=>this.setState({keyValue:''})}>
                                       <Image
                                        source={require('../assets/images/cross.png')}
                                        style={{width:20,height:20,resizeMode:'contain'}}
                                      />
                                      </TouchableOpacity>
                                      </View>
                                     <View style={[Styles.backsizeview]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {stringsoflanguages.choosesize}
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {allpizza.availableSmall==true?<Text>{stringsoflanguages.small}</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {allpizza.availableMedium==true?<Text>{stringsoflanguages.medium}</Text>:null}
                                     </Text>
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                    
                                     {allpizza.availableLarge==true?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.large}</Text>:null}
                                  
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                      {stringsoflanguages.choosebottom}
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={()=>this.selectbottom('normal')}>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={()=>this.selectbottom('Þykkbotna')}>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      
                                      {pizzasize=='large'?null:<Text style={{fontFamily:'Avenir'}}>Þykkbotna</Text>}
                                      
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,bottom)}>
                                    <View>
                                        
                                        <Text onPress={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700',fontFamily:'Avenir'}}>
                                          {
                                          pizzasize=='small'&&this.state.bottom=='keto'?this.state.selectedpizza['minimumAmountSmall']+700:
                                          pizzasize=='small'?this.state.selectedpizza['minimumAmountSmall']:
                                          pizzasize=='medium'?this.state.selectedpizza['minimumAmountMedium']:
                                          pizzasize=='large'?this.state.selectedpizza['minimumAmountLarge']:null
                                          } kr.</Text>
                                        <Image
                                        source={require('../assets/images/rightarrow.png')}
                                        style={{width:10,height:16,marginLeft:10}}
                                        />
                                    </View>
                                    
                                  </View>
                                  </View>
                                    :null}
                                    <TouchableOpacity onPress={()=>this.pizzadetail(allpizza)}>
                                    <View style={[this.state.keyValue==allpizza.keyValue?{display:'none'}:{display:'flex'}]}>
                                    <View style={{flexDirection:"row"}}>
                                    <View>

                                    
                                    <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 
                                     
                                    
                                   
                                      
                                      <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                      
                                      
                                  
                                  </View>
                                  <View>
                                  
                                  <Image
                                    source={{uri:this.imagebaseurl+allpizza.imageName}}
                                    style={{width:150,height:140,resizeMode:'contain'}}
                                  />
                                 
                                  </View>
                                  </View>
                                  <View style={Styles.bottomview}>
                                        <View>
                                          
                                          <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.selectsize}</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                
                                 
                                  </View>
                                  </TouchableOpacity>
                            </View> 
                        </View>)}
                                )
                            :null
                    
                    
                    
                    )}

                    <View style={{justifyContent:"center",alignItems:'center'}}>
                    <Text style={{fontFamily:'Avenir',fontSize:20,color:'#E73131'}}>Þessar Klassísku</Text>
                    </View>
                    {
                       this.state.allpizza.map(categorypizza=>
                            categorypizza.name=='Þessar Klassísku'?
                            categorypizza.pizzas.map(allpizza=>{
                                // console.log(allpizza) 
                    return(
                                
                        <View style={{alignItems:'center'}}>
                          
                            <View style={Styles.maincontainer}>
                                    {this.state.keyValue==allpizza.keyValue?
                                    
                                     <View>
                                       <View style={{width:360,height:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                       <TouchableOpacity onPress={()=>this.setState({keyValue:''})}>
                                       <Image
                                        source={require('../assets/images/cross.png')}
                                        style={{width:20,height:20,resizeMode:'contain'}}
                                      />
                                      </TouchableOpacity>
                                      </View>
                                     <View style={[Styles.backsizeview]}>
                                     <Text style={{fontFamily:'Avenir'}}>
                                     {stringsoflanguages.choosesize}
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                    
                                     {allpizza.availableSmall==true?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.small}</Text>:null}
                                    
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     
                                     {allpizza.availableMedium==true?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.medium}</Text>:null}
                                   
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     
                                     {allpizza.availableLarge==true?<Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.large}</Text>:null}
                                     
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                      {stringsoflanguages.choosebottom}
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      
                                        {pizzasize=='small'?<Text style={{fontFamily:'Avenir'}} onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text style={{fontFamily:'Avenir'}} onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                     
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={()=>this.selectbottom('normal')}>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text style={{fontFamily:'Avenir'}}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={()=>this.selectbottom('Þykkbotna')}>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                      {pizzasize=='large'?null:<Text style={{fontFamily:'Avenir'}} >Þykkbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,bottom)}>
                                    <View>
                                        
                                        <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.addtoorder}</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700',fontFamily:'Avenir'}}>
                                          {
                                          pizzasize=='small'&&this.state.bottom=='keto'?this.state.selectedpizza['minimumAmountSmall']+700:
                                          pizzasize=='small'?this.state.selectedpizza['minimumAmountSmall']:
                                          pizzasize=='medium'?this.state.selectedpizza['minimumAmountMedium']:
                                          pizzasize=='large'?this.state.selectedpizza['minimumAmountLarge']:null
                                          } kr.</Text>
                                        <Image
                                        source={require('../assets/images/rightarrow.png')}
                                        style={{width:10,height:16,marginLeft:10}}
                                        />
                                    </View>
                                    
                                  </View>
                                  </View>
                                    :null}
                                    <TouchableOpacity onPress={()=>this.pizzadetail(allpizza)}>
                                    <View style={[this.state.keyValue==allpizza.keyValue?{display:'none'}:{display:'flex'}]}>
                                    <View style={{flexDirection:"row"}}>
                                    <View>

                                    
                                    <Text style={{fontFamily:'Avenir',fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 
                                     
                                    
                                     
                                      
                                      <Text style={{fontFamily:'Avenir',paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                      
                                      
                                  
                                  </View>
                                  <View>
                                  
                                  <Image
                                    source={{uri:this.imagebaseurl+allpizza.imageName}}
                                    style={{width:150,height:140,resizeMode:'contain'}}
                                  />
                                 
                                  </View>
                                  </View>
                                  <View style={Styles.bottomview}>
                                        <View>
                                          
                                          <Text style={{fontFamily:'Avenir'}}>{stringsoflanguages.selectsize}</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                
                                
                                  </View>
                                  </TouchableOpacity>
                            </View> 
                        </View>)}
                                )
                            :null
                    
                    
                    
                    )}

                   
               </ScrollView>
        }
              
            </View>
             </ImageBackground>
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
        backgroundColor:'#ffffff',
        backfaceVisibility:"hidden",
    },
    
    bottomview: {
        height:30,
        backgroundColor:'lightgrey',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginTop:10,
        width:370,
    },
    backsizeview: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:370,
        height:60,
        
    },
    buttonview: {
        height: 40,
        width:80,
        borderWidth:1,
        borderColor:'grey',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    }
})
function mapStateToProps(state){
    // console.log(state.pizza)
  return {
    // allpizza: state.pizza
  }
}

function mapDispatchToProps(dispatch){
  
  return bindActionCreators({addtocart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Pizza);

