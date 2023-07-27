import React from "react";

const UserList = ({ users, onUserSelect, selectedUser }) => (
  <div className="user-list">
    {users.map((user) => (
      <div
        key={user.id}
        onClick={() => onUserSelect(user)}
        className={`user ${selectedUser === user ? "selected" : ""}`}
      >
        {user.name}
      </div>
    ))}
  </div>
);

export default UserList;
