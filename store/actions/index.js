import axios from 'axios';


export function drinkslist(){

    const request = axios.get('https://s1-api.pizzan.is/api/v1/drinks')
                    .then(response=>response.data)

    return {
        type: 'Drinks_list',
        payload: request
    }
}

export function sideslist(){
    const request = axios.get('https://s1-api.pizzan.is/api/v1/sideorders')
                    .then(response=>response.data)

    return {
        type: 'Sides_list',
        payload: request
    }
}

export function offerlist(){
    const request = axios.get('https://s1-api.pizzan.is/api/v1/offers?onlyActive=true')
                    .then(response=>response.data)

    return {
        type: 'Offer_list',
        payload: request
    }
}

export function addtocart(item){
    return {
        type:'Add_to_cart',
        payload: item
    }
}

// export function addvalue(price){
//     return {
//         type: 'Sub_total',
//         payload: price
//     }
// }
export function removefromcart(item){
    return {
        type: 'Remove_from_cart',
        payload: item
    }
}

export function pizzalist(){
    const request = axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu/categories/pizza')
                    .then(response=>response.data)
    return {
        type: 'Pizza_list',
        payload: request
    }
}

export function toppinglist(){
    const request = axios.get('https://s1-api.pizzan.is/api/v1/toppings')
                    .then(response=>response.data)

    return {
        type: 'Topping_list',
        payload: request
    }
}

export function pizzamenu(){
    const request = axios.get('https://s1-api.pizzan.is/api/v1/pizzas/menu')
                    .then(response=>response.data)

    return {
        type: 'Pizza_menu',
        payload: request
    }
}

