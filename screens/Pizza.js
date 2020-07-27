import React, {Component} from 'react';
import {Text,View, SafeAreaView, StyleSheet,Image,ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Header from '../common/Header';
import Axios from 'axios';
import FlipCard from 'react-native-flip-card';
import styles from '../common/MenuStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pizzalist,addtocart } from '../store/actions';



class Pizza extends Component{

    state = {categorypizza:[],pizzasize:'',flip:false,bottom:'',display:'flex',keyValue:'',selectedpizza:[],allpizza:[]}

    imagebaseurl='https://assets.pizzan.is/images/pizzas/'

    componentDidMount=()=>{
        Axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu/categories/pizza')
        .then((response)=>{
            const data = response['data']
            // console.log(data)
            this.setState({allpizza:data})
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

   addtocart=(pizzadata,name,size)=>{
      const pizzaname = []
      pizzaname.push(name)
      const sidesname = []
      const selecteddrinks = []
      const keyValue = name+size
      const toppingname = []
      const addpizza = {name:pizzaname,size:size,price:this.state.price,keyValue,toppingname:toppingname,
                        selectedsides:sidesname,selecteddrinks:selecteddrinks}
      this.props.addtocart(addpizza)
      // console.log(addpizza)
    
   }
    
    render(){
        // console.log(this.state.selectedpizza)
        const {pizzasize,bottom} = this.state;
        // console.log(this.props.allpizza)
        return(
            <SafeAreaView>
            <View style={{height:'100%',width:'100%'}}>
                
               <Header
                
                 title={'PIZZA'}
                 menupress={this.props.navigation.toggleDrawer}
                 sideicon={require('../assets/images/menu.png')}
                 notificationicon={require('../assets/images/notification.png')}
                 carticon={require('../assets/images/cart.png')}
                 profileicon={require('../assets/images/profile.png')}
               />
               <ScrollView>
                    <View style={{justifyContent:"center",alignItems:'center'}}>
                    <Text style={{fontSize:20,color:'#E73131'}}>Þær Vinsælustu</Text>
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
                                     <Text>
                                       CHOOSE SIZE
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableSmall==true?<Text>SMALL</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableMedium==true?<Text>MEDIUM</Text>:null}
                                     </Text>
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableLarge==true?<Text>LARGE</Text>:null}
                                     </Text>
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text>
                                        CHOOSE BOTTOM
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text onPress={()=>this.selectbottom('normal')}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                      {pizzasize=='large'?null:<Text onPress={()=>this.selectbottom('Þykkbotna')}>Þykkbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,)}>
                                    <View>
                                        
                                        <Text>Add to order</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700'}}>
                                          {
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

                                    
                                    <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 
                                     
                                    
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
                                      
                                      <Text style={{paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                      
                                      
                                  
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
                                          
                                          <Text>Select Size</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                
                                 {/* <TouchableWithoutFeedback onPress={()=>alert('ok')}>
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
                    <Text style={{fontSize:20,color:'#E73131'}}>Þessar Gourmet</Text>
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
                                     <Text>
                                       CHOOSE SIZE
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableSmall==true?<Text>SMALL</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableMedium==true?<Text>MEDIUM</Text>:null}
                                     </Text>
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableLarge==true?<Text>LARGE</Text>:null}
                                     </Text>
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text>
                                        CHOOSE BOTTOM
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text onPress={()=>this.selectbottom('normal')}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                      {pizzasize=='large'?null:<Text onPress={()=>this.selectbottom('Þykkbotna')}>Þykkbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,)}>
                                    <View>
                                        
                                        <Text>Add to order</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700'}}>
                                          {
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
                                    <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
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
                                      <Text style={{paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                  
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
                                          
                                          <Text>Select Size</Text>
                                        
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
                    <Text style={{fontSize:20,color:'#E73131'}}>Ketó Pizzur</Text>
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
                                    
                                     <Text>
                                       CHOOSE SIZE
                                     </Text>
                                     
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableSmall==true?<Text>SMALL</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     {/* <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableMedium==true?<Text>MEDIUM</Text>:null}
                                     </Text>
                                     </View>
                                    </TouchableOpacity> */}
                                    {/* <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableLarge==true?<Text>LARGE</Text>:null}
                                     </Text>
                                     </View>
                                      </TouchableOpacity> */}
                                    </View>
                                      <View style={Styles.backsizeview}>
                                    
                                      <Text>
                                        CHOOSE BOTTOM
                                      </Text>
                                    
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      {/* <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text onPress={()=>this.selectbottom('normal')}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity> */}
                                      {/* <TouchableOpacity>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                      {pizzasize=='large'?null:<Text onPress={()=>this.selectbottom('Þykkbotna')}>Þykkbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity> */}
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,)}>
                                    <View>
                                        
                                        <Text>Add to order</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700'}}>
                                          {
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
                                    <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
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
                                      <Text style={{paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                  
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
                                          
                                          <Text>Select Size</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                 {/* <TouchableWithoutFeedback onPress={()=>alert('ok')}>
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
                   {/* {this.props.allpizza?
                       this.props.allpizza.map(categorypizza=>
                            categorypizza.name=='Ketó Pizzur'?
                            categorypizza.pizzas.map(allpizza=>
                                <View style={{alignItems:'center'}}>
                                
                                
                                
                            <View style={Styles.maincontainer}>
                                    <View style={{flexDirection:"row"}}>
                                    <View>
                                    
                                    <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 
                                     
                                    <Text style={{paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text>
                                  
                                  </View>
                                  <View>
                                
                                  <Image
                                    source={{uri:this.imagebaseurl+allpizza.imageName}}
                                    style={{width:150,height:160,resizeMode:'contain'}}
                                  />
                                  </View>
                                  </View>
                                  <View style={Styles.bottomview}>
                                    <View>
                                        <Text>Add to order</Text>
                                        
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700'}}>{allpizza.minimumAmountSmall} kr.</Text>
                                        <Image
                                        source={require('../assets/images/rightarrow.png')}
                                        style={{width:10,height:16,marginLeft:10}}
                                        />
                                    </View>
                                  </View>
                            </View>
                         
                            </View>
                                )
                            :null
                    
                    
                    
                    ):null} */}

                    <View style={{justifyContent:"center",alignItems:'center'}}>
                    <Text style={{fontSize:20,color:'#E73131'}}>Nýjar og Spennandi</Text>
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
                                     <Text>
                                       CHOOSE SIZE
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableSmall==true?<Text>SMALL</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableMedium==true?<Text>MEDIUM</Text>:null}
                                     </Text>
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableLarge==true?<Text>LARGE</Text>:null}
                                     </Text>
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text>
                                        CHOOSE BOTTOM
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text onPress={()=>this.selectbottom('normal')}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                      {pizzasize=='large'?null:<Text onPress={()=>this.selectbottom('Þykkbotna')}>Þykkbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,)}>
                                    <View>
                                        
                                        <Text>Add to order</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700'}}>
                                          {
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

                                    
                                    <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 
                                     
                                    
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
                                      
                                      <Text style={{paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                      
                                      
                                  
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
                                          
                                          <Text>Select Size</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                
                                 {/* <TouchableWithoutFeedback onPress={()=>alert('ok')}>
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
                    <Text style={{fontSize:20,color:'#E73131'}}>Þessar Klassísku</Text>
                    </View>
                    {
                       this.state.allpizza.map(categorypizza=>
                            categorypizza.name=='Þessar Klassísku'?
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
                                     <Text>
                                       CHOOSE SIZE
                                     </Text>
                                      <TouchableOpacity onPress={()=>{this.setState({pizzasize:'small',price:allpizza.minimumAmountSmall})}}>
                                     <View style={[Styles.buttonview,pizzasize=='small'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableSmall==true?<Text>SMALL</Text>:null}
                                     </Text>
                                     </View>
                                     </TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.setState({pizzasize:'medium',price:allpizza.minimumAmountMedium})}}>
                                     <View style={[Styles.buttonview,pizzasize=='medium'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableMedium==true?<Text>MEDIUM</Text>:null}
                                     </Text>
                                     </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setState({pizzasize:'large',price:allpizza.minimumAmountLarge})}}>
                                     <View style={[Styles.buttonview,pizzasize=='large'?{backgroundColor:'red'}:null]}>
                                     <Text>
                                     {allpizza.availableLarge==true?<Text>LARGE</Text>:null}
                                     </Text>
                                     </View>
                                      </TouchableOpacity>
                                    </View>
                                      <View style={Styles.backsizeview}>
                                      <Text>
                                        CHOOSE BOTTOM
                                      </Text>
                                      
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='keto'|| bottom=='Þunnbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                        {pizzasize=='small'?<Text onPress={()=>this.selectbottom('keto')}>keto</Text>:<Text onPress={()=>this.selectbottom('Þunnbotna')}>Þunnbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[Styles.buttonview,bottom=='normal'?{backgroundColor:'red'}:null]}>
                                      <Text onPress={()=>this.selectbottom('normal')}>
                                        Normal
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                      <View style={[pizzasize=='large'?null:Styles.buttonview,bottom=='Þykkbotna'?{backgroundColor:'red'}:null]}>
                                      <Text>
                                      {pizzasize=='large'?null:<Text onPress={()=>this.selectbottom('Þykkbotna')}>Þykkbotna</Text>}
                                      </Text>
                                      </View>
                                      </TouchableOpacity>
                                      
                                  </View>
                                  <View style={Styles.bottomview}>
                                  <TouchableOpacity onPress={()=>this.addtocart(allpizza,allpizza.name,pizzasize,)}>
                                    <View>
                                        
                                        <Text>Add to order</Text>
                                       
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontWeight:'700'}}>
                                          {
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

                                    
                                    <Text style={{fontSize:20,paddingTop:10,paddingLeft:10}}>{allpizza.name}</Text>
                                 
                                     
                                    
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
                                      
                                      <Text style={{paddingLeft:10,width:200}}>{allpizza.toppingsSummary}</Text> 
                                      
                                      
                                  
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
                                          
                                          <Text>Select Size</Text>
                                        
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          
                                          <Image
                                          source={require('../assets/images/rightarrow.png')}
                                          style={{width:10,height:16,marginLeft:10}}
                                          />
                                        </View>
                                  </View>
                                
                                 {/* <TouchableWithoutFeedback onPress={()=>alert('ok')}>
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
    console.log(state.pizza)
  return {
    allpizza: state.pizza
  }
}

function mapDispatchToProps(dispatch){
  
  return bindActionCreators({pizzalist,addtocart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Pizza);

