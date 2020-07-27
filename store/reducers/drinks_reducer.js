export default function(state=null, action){
    switch(action.type){
        case 'Drinks_list':
            return action.payload
            default:
                return state;
    }
}

