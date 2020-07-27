import { combineReducers } from 'redux';
import drinks from './drinks_reducer';
import sides from './sides_reducer';
import offer from './offer_reducer';
import addtocart from './cart_reducer';
import pizza from './pizza_reducer';
import topping from './topping_reducer';
import pizzamenu from './Pizza_menu';

const rootreducer = combineReducers({
    drinks,
    sides,
    offer,
    addtocart,
    pizza,
    topping,
    pizzamenu,
});

export default rootreducer;