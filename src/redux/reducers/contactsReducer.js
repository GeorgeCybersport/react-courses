import { GET_CONTACTS, ADD_CONTACT, GET_MORE_CONTACTS, CHANGE_CONTACT, REMOVE_CONTACT } from "../keys";

const initaialState=[];
export default function(state=initaialState, action){
    switch(action.type){
        case GET_CONTACTS:
            return action ? [...action.payload] : state;
        case GET_MORE_CONTACTS:
            return state.concat(action.payload);    
        case ADD_CONTACT:
            return state.length<5 ? [...state, action.payload] : state;
        case CHANGE_CONTACT: 
            const index=state.findIndex((contact)=>contact.id===action.payload.id)
            state[index]=action.payload;
            return [...state];
        case REMOVE_CONTACT:
            const removeIndex=state.findIndex((contact)=>contact.id===action.payload)
            state.splice(removeIndex, 1);
            return [...state];
        default: return state;
    }
};
