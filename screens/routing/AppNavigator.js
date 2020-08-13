import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {  WelcomeScreen, Dashboard,Delivery,
          Category,Lastorder, Makeyourown,DrawerContainer,Makebottom } from '../index' 
import Drinks from '../Drinks';
import Sides from '../Sides';
import Offer from '../Offer';
import Cart from '../Cart';
import Pizza from '../Pizza';
import SignIn from '../SignIn';
import Takeaway from '../Takeaway';
import Toppingpage from '../Toppingpage';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Pizzasize from '../Offerpages/Pizzasize';
import Offerpizza from '../Offerpages/Offerpizza';
import Offerpizzatwo from '../Offerpages/Offerpizzatwo';
import Tilbodoffer from '../Offerpages/Tilbodoffer';
import Tilbodcoffer from '../Offerpages/Tilbodcoffer';
import Fjolskyoffer from '../Offerpages/Fjolskyoffer';
import Complete from '../Complete';
import Checkout from '../Checkout';
import Otppage from '../Otppage';

const AppNavigator = createStackNavigator({
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null
      }
    },
      SignIn: {
        screen: SignIn,
        navigationOptions: {
          header:null,
          gestureEnabled:false
          
        }
      },
      Dashboard: {
        screen: Dashboard,
        navigationOptions: {
          header:null,
          gestureEnabled:false
        }
      },
      Takeaway: {
        screen: Takeaway,
        navigationOptions: {
          header: null
        }
      },
      Delivery: {
        screen: Delivery,
        navigationOptions: {
          header: null
        }
      },
      Category: {
        screen: Category,
        navigationOptions: {
          header: null
        }
      },
      Offer: {
        screen: Offer,
        navigationOptions: {
          header:null
        }
      },
      Lastorder: {
        screen: Lastorder,
        navigationOptions: {
          header:null
        }
      },
      Pizza: {
        screen: Pizza,
        navigationOptions: {
          header:null
        }
      },
      Sides: {
        screen: Sides,
        navigationOptions: {
          header:null
        }
      },
      Drinks: {
        screen: Drinks,
        navigationOptions: {
          header:null
        }
      },
      Makeyourown: {
        screen: Makeyourown,
        navigationOptions: {
          header:null
        }
      },
      Makebottom: {
        screen: Makebottom,
        navigationOptions: {
          header:null
        }
      },
      Toppingpage: {
        screen: Toppingpage,
        navigationOptions: {
          header:null
        }
      },
      Cart: {
        screen: Cart,
        navigationOptions: {
          header:null,
          // gestureEnabled:false
        }
      },
      // Pizzaselection: {
      //   screen: Pizzaselection,
      //   navigationOptions: {
      //     header:null
      //   }
      // },
      // Pizzaselection2: {
      //   screen: Pizzaselection2,
      //   navigationOptions: {
      //     header:null
      //   }
      // },
      Pizzasize: {
        screen: Pizzasize,
        navigationOptions: {
          header:null
        }
      },
      // Sidesselection: {
      //   screen: Sidesselection,
      //   navigationOptions: {
      //     header:null
      //   }
      // },
      Offerpizza:{
        screen: Offerpizza,
        navigationOptions: {
          header: null
        }
      },
      Offerpizzatwo:{
        screen: Offerpizzatwo,
        navigationOptions: {
          header: null
        }
      },
      Tilbodoffer: {
        screen: Tilbodoffer,
        navigationOptions: {
          header:null
        }
      },
      Tilbodcoffer: {
        screen: Tilbodcoffer,
        navigationOptions: {
          header:null
        }
      },
      Fjolskyoffer: {
        screen: Fjolskyoffer,
        navigationOptions: {
          header:null
        }
      },
      Complete: {
        screen: Complete,
        navigationOptions: {
          header:null
        }
      },
      Checkout: {
        screen: Checkout,
        navigationOptions: {
          header:null
        }
      },
      Otppage: {
        screen: Otppage,
        navigationOptions: {
          header:null
        }
      },
  
  },{
    initialRouteName: 'Category'
  })
  
  const DrawerStack = createDrawerNavigator(
    {
      Main: AppNavigator
    },
    {
      drawerPosition: 'left',
      drawerType:'front',
      initialRouteName:'Main',
      drawerWidth:280,
      contentComponent: DrawerContainer
    }
  );


  export default AppContainer =  createAppContainer(DrawerStack);
