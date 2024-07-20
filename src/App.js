import './App.css';
import React, { useState } from 'react';

const userData = [
  { id: 1, name: 'Иванов Иван Иванович', age: 30, gender: 'М', phone: '123-456', city: 'Москва', street: 'Примерная' },
  // другие пользователи...
];

const UserTable = ({ users }) => {
  return (
    <table class="table">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Возраст</th>
          <th>Пол</th>
          <th>Номер телефона</th>
          <th>Адрес</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td class="table-column">{user.name}</td>
            <td class="table-column">{user.age}</td>
            <td class="table-column">{user.gender}</td>
            <td class="table-column">{user.phone}</td>
            <td class="table-column">{user.city}, {user.street}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  
  const filteredUsers = userData.filter(user =>
    Object.values(user)
      .join('') // преобразовать все значения в строки и объединить их
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
        onChange={handleChange}
      />
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default App;