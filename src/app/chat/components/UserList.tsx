import React from "react";

interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
  selectedUser: User | null;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect, selectedUser }) => (
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
