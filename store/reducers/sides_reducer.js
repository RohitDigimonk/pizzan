export default function(state=null, action){
    switch(action.type){
        case 'Sides_list':
            return action.payload
            default:
                return state;
    }
}