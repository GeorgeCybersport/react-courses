import { GET_EVENTS, GET_MORE_EVENTS, ADD_EVENT, CHANGE_EVENT, REMOVE_EVENT } from "../keys";
const initaialState=[];
export default function(state=initaialState, action){
    switch(action.type){
        case GET_EVENTS:
            return [...action.payload];
        case GET_MORE_EVENTS:
            return state.concat(action.payload);
        case ADD_EVENT:
            return state.length<5 ? [...state, action.payload] : state;
        case CHANGE_EVENT: 
            const index=state.findIndex((contact)=>contact.id===action.payload.id)
            state[index]=action.payload;
            return [...state];
        case REMOVE_EVENT:
            const removeIndex=state.findIndex((contact)=>contact.id===action.payload)
            state.splice(removeIndex, 1);
            return [...state];
        default: return state;
    }
};