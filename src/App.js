import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import UserTable from "./UserTable";
import api from "./Api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current)
      return;

    api.getUsers()
      .then((x) => setUsers(x.users))
      .catch(console.error);

    hasFetchedData.current = true;
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // фильтрация по поиску
  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join("")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Таблица пользователей</h1>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default App;
