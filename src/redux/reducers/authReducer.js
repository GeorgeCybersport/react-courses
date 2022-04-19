import { IS_AUTH } from "../keys";

export default function authReducer(state={}, action) {
    switch(action.type){
        case IS_AUTH:
            return{
                token: action.token,
                isAuth: true,
            }
        default: return state;    
    }
}