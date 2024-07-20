const UserTable = ({ users }) => {
    return (
      <table className="table">
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
              <td className="table-column">{user.firstName} {user.lastName}</td>
              <td className="table-column">{user.age}</td>
              <td className="table-column">{user.gender}</td>
              <td className="table-column">{user.phone}</td>
              <td className="table-column">{user.address.city}, {user.address.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default UserTable;