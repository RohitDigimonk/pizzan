export default function(state=null,action){
    switch(action.type){
        case 'Offer_list':
            return action.payload
            default:
                return state;
    }
}