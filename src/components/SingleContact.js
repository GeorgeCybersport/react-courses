import React from 'react';

const SingleContact = ({id, name_first, name_last, name_middle, users, setUsers}) => {
    const [selected, setSelected]=React.useState(false);
    function addItem() {
        if (users.findIndex(user=>user.id===id)!==-1){
            setUsers(users.filter((user)=>user.id!==id))
            setSelected(false);
            console.log(123);
        } else {
            setUsers([...users, {id, name_first, name_last, name_middle}]);
            setSelected(true);
            console.log(124);
        }
    }
    React.useEffect(()=>{
        users.findIndex(user=>user.id===id)!==-1 && setSelected(true);
    }, [])
    return (
        <button className={selected ? "user-button selected" : "user-button"} onClick={addItem}>{name_first} {name_middle} {name_last}</button>
    );
};

export default SingleContact;