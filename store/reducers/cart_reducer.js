export default function(state=[], action){
    switch(action.type){
        case 'Add_to_cart':
            return [...state,action.payload]
        case 'Remove_from_cart':
            return state.filter(state=>state.keyValue !==action.payload.keyValue)
            default:
                return state;
    }
}
