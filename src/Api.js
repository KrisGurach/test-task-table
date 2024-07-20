class Api {
  getUsers = () => {
    const usersData = fetch('https://dummyjson.com/users')
        .then(res => res.ok ? res.json() : Promise.reject(res.status));

    return usersData;
  }
}

const api = new Api();

export default api;