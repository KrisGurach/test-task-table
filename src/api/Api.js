class Api {
  getUsers = () => {
    const usersData = fetch('https://dummyjson.com/users')
        .then(res => res.ok ? res.json() : Promise.reject(res.status));

    return usersData;
  }

  findBy = (key, value) => {
    const findUsers = fetch(`https://dummyjson.com/users/filter?key=${key}&value=${value}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.status));

    return findUsers;
  }
}

const api = new Api();

export default api;