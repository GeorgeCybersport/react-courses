import React from 'react';

const SelectOption = ({id, name_first, name_last, name_middle, users, setUsers}) => {
    function addItem() {
        if (users.includes(id)){
            setUsers(users.filter((user)=>user!==id))
        } else (setUsers([...users, id]))
    }
    return (
        <option onClick={addItem}> {name_first} {name_middle} {name_last}</option>
    );
};

export default SelectOption;