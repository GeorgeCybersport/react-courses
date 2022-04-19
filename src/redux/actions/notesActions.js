import { CHANGE_CONTACT, HOST_URL } from "../keys";

export function addNote(token, text, obj){
    return async dispatch=>{
        return await fetch(HOST_URL + "note/", {
            method: "POST",
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json",
                //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            },
            body: JSON.stringify({regList: [{contact_id: obj.id, text}]})
        }).then(res=>res.json()).then(result=>{
            if(result.success){
                obj.notes.push(result.success[0]);
                dispatch({
                    type: CHANGE_CONTACT,
                    payload: obj,
                })
                return true;
            }
        })
    }
}
export function changeNote(token, obj, noteId, text){
    return async dispatch=>{
        return await fetch(HOST_URL + "note/"+noteId+"/", {
            method: "PATCH",
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json",
                //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            },
            body: JSON.stringify({text: text})
        }).then(res=>res.json()).then(result=>{
            if(result.success){
                const notes=change(obj.notes, noteId, text)
                obj.notes=[...notes];
                dispatch({
                    type: CHANGE_CONTACT,
                    payload: obj,
                })
                return true;
            }
        })
    }
}
export function deleteNote(token, noteId, obj){
    return async dispatch=>{
        return await fetch(HOST_URL + "note/"+noteId+"/", {
            method: "DELETE",
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json",
                //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            },
        }).then(res=>res.json()).then(result=>{
            if(result.success){
                const notes= remove(obj.notes, noteId);
                obj.notes=[...notes];
                dispatch({
                    type: CHANGE_CONTACT,
                    payload: obj,
                })
                return true;
            }
        })
    }
}
function change(objArr, id, text) {
    const index = objArr.findIndex((obj)=>{return obj.id===id});
    objArr[index].text=text;
    return objArr;
}
function remove(objArr, id) {
    const index = objArr.findIndex((obj)=>{return obj.id===id});
    objArr.splice(index, 1);
    return objArr;
}