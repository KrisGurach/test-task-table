import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import UserTable from "../UserTable/UserTable";
import api from "../api/Api";

const App = () => {
  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  let usersToSet = []
  if (allUsers) {
    usersToSet = allUsers;
  }

  const [users, setUsers] = useState(usersToSet);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSortDown, setIsSortDown] = useState(false);

  const hasFetchedData = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (hasFetchedData.current)
      return;

    api.getUsers()
      .then((x) => {
        setUsers(x.users);

        localStorage.setItem(
          "allUsers",
          JSON.stringify(x.users)
        );
      })
      .catch(console.error);

    hasFetchedData.current = true;
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }  
  }, [isDisabled])

  // поиск юзеров по всем колонкам
  // ТЗ вынуждает выполнять большое кол-во параллельных api-запросов
  // по-хорошему нужно 
  // 1. либо реализовать поиск по кнопке,
  // 2. либо доработать api,
  // 3. либо выполнять фильтрацию на стороне frontend без api-запросов

  const searchByColumns = (value) => {
    const keys = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "phone",
      "address.city",
      "address.address"
    ];

    const promises = keys
        .map((key) => api.findBy(key, value))
        .map((result) => result
          .then((data) => data)
          .catch(console.error));

    Promise.allSettled(promises)
      .then((results) => {
        const dataArr = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);

        const foundUsers = dataArr.reduce(
          (acc, data) => acc.concat(data.users),
          []
        );

        setUsers(foundUsers);
      })
      .catch(console.error)
      .finally(() => {
        setIsDisabled(false);
      });
  }

  const handleSearch = (event) => {
    setIsDisabled(true);

    const value = event.target.value;
    if (!value) {
      setUsers(usersToSet);
      setIsDisabled(false);
    } else {
      searchByColumns(value);
    }
  };

  const [sortConditions, setSortConditions] = useState({});

  const sortBy = (field) => {
    const newType = sortConditions[field] === "asc" ? "desc" : "asc";

    const getValue = (obj) =>
      field.includes(".")
        ? field.split(".").reduce((o, i) => o[i], obj)
        : obj[field];

    const sortedUsers = [...users].sort((a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);

      return newType === "asc"
        ? valueA > valueB? 1 : -1 // Для сортировки по возрастанию
        : valueA < valueB? 1 : -1; // Для сортировки по убыванию
    });

    setUsers(sortedUsers);
    setSortConditions({ ...sortConditions, [field]: newType });

    setIsSortDown(!isSortDown);
  };

  return (
    <div>
      <h1>Таблица пользователей</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск..."
        onChange={handleSearch}
        disabled={isDisabled}
      />
      <UserTable 
        users={users}
        sortBy={sortBy}
        isSortDown={isSortDown}
      />
    </div>
  );
};

export default App;
