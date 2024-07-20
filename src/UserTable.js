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
              <td class="table-column">{user.firstName} {user.lastName}</td>
              <td class="table-column">{user.age}</td>
              <td class="table-column">{user.gender}</td>
              <td class="table-column">{user.phone}</td>
              <td class="table-column">{user.address.city}, {user.address.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default UserTable;