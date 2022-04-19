import React from "react";

const UserList = ({ users, setUsers }) => {
  function deleteUser(id) {
    const arr = users.filter((user) => user.id !== id);
    setUsers(arr);
  }
  return (
    <>
      {users.map(({ name_first, name_last, id }) => (
        <div className="selected-users" key={id}>
          {name_first} {name_last}{" "}
          <i onClick={() => deleteUser(id)} className="fas fa-times"></i>
        </div>
      ))}
    </>
  );
};

export default UserList;
