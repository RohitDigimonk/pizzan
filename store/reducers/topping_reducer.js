export default function(state=[], action){
    switch(action.type){
        case 'Topping_list':
            return action.payload
            default:
                return state;
    }
}