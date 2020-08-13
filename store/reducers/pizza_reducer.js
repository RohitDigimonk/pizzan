export default function(state=null, action){
    switch(action.type){
        case 'Pizza_list':
            return action.payload
            default:
                return state;
    }
}