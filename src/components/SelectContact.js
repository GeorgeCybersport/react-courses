import React from 'react';
import SingleContact from './SingleContact';
const SelectContact = ({contacts, users, setUsers}) => {
    const [openContacts, setOpenContacts]= React.useState(false);
    const [activeContacts, setActiveContacts]=React.useState([]);
    function changeData(e) {
        if (e.target.value) {
          const check = new RegExp(e.target.value, "i");
          const newContacts = contacts.filter(({name_first, name_last, name_middle}) => {
            const fullname=name_first+" "+ name_middle+" "+ name_last;
            const result = fullname.search(check);
            if (result !== -1) return true;
            else return false;
          });
          return setActiveContacts(newContacts);
        } else setActiveContacts(contacts);
    }
    React.useEffect(()=>{
        document.addEventListener('click', (event)=>{
            if(event.target.classList.contains("search-contact") || event.target.classList.contains("search-list") || event.target.classList.contains("user-button")){
                setOpenContacts(true);
            } else setOpenContacts(false);
        })
    }, [])
    return (
        <div className="search">
            <input onChange={changeData} onFocus={changeData} className={openContacts ? "search-contact active" : "search-contact"}/>
            {openContacts && (
                <div className="search-list" multiple={true}>
                {activeContacts.map(({id, name_first, name_middle,  name_last})=>
                    <SingleContact name_middle={name_middle} name_last={name_last} key={id} setUsers={setUsers} users={users} name_first={name_first} id={id}/>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectContact;