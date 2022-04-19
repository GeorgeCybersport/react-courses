import { ADD_CONTACT, GET_CONTACTS, GET_MORE_CONTACTS, REMOVE_CONTACT, CHANGE_CONTACT, HOST_URL} from "../keys";

export function getContactsList (token, limit=5){
    return async dispatch=>{
        try {
            const result=await fetch(HOST_URL + "contact/?limit="+limit, {
                headers: {
                    "Authorization": "Token " + token,
                    //"Content-Type": "application/json",
                    //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                    },
            })
            .then((res) => res.json())
            if(result.results){
                dispatch({
                    type: GET_CONTACTS,
                    payload: result.results,
                })
                return result.next;
            }    
            return false;   
        } catch (error) {
            throw new Error(error);
        }
        
    }
}
export function getMoreContacts (token, offset, limit=5){
    return async dispatch=>{
        try {
            const result=await fetch(HOST_URL + "contact/?limit="+limit+"&offset="+offset, {
            headers: {
                "Authorization": "Token " + token,
                //"Content-Type": "application/json",
                //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                },
            })
            .then((res) => res.json())
            if (result.results){
                dispatch({
                    type: GET_MORE_CONTACTS,
                    payload: result.results,
                })
                return result.next;
            } return false
        } catch (error) {
            throw new Error(error);
        }
    }
}
export function addToContactList(token, obj){
    if(obj){
        return async dispatch=>{
            const succes= await fetch(HOST_URL + "contact/", {
                headers: {
                    "Authorization": "Token " + token,
                    "Content-Type": "application/json",
                    //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                    },
                method: "POST",
                body: JSON.stringify({regList: [obj]}),    
            }).then(res=>res.json()).then(result=>{
                if(result.success){
                    dispatch({
                        type: ADD_CONTACT,
                        payload: result.success[0],
                    })
                    return true;
                }
            });
            return succes;
        }
    }
}
export function changeContactList(token, obj, id){
    return async (dispatch)=>{
        const succes= await fetch(HOST_URL + "contact/"+id+"/", {
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json",
                //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                },
            method: "PATCH",
            body: JSON.stringify(obj),    
        }).then(res=>res.json()).then(result=>{
            if(result.success){
                dispatch({
                    type: CHANGE_CONTACT,
                    payload: result.success,
                })
                return true;
            }
         });
        return succes;
    }
}
export function deleteContact(token, id){
    return async (dispatch)=>{
        const result = await fetch(HOST_URL + "contact/"+id+"/", {
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json",
                //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                },
            method: "DELETE",    
        }).then(res=>res.json()).then((result)=>{
            if(result.success==="object successfully destroy"){
                dispatch({
                    type: REMOVE_CONTACT,
                    payload: id,
                })
                return true;
            }
        }).catch(()=>{return false});
        return result;
    }
}