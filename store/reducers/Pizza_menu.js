export default function(state=null, action){
    switch(action.type){
        case 'Pizza_menu':
            return action.payload
            default:
                return state;
    }
}