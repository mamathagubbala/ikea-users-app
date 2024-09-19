import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [users, setUsers] = useState([]);
  const hostUrl = import.meta.env.PROD 
    ? window.location.href
     : 'http://localhost:8080/';
  //const hostUrl = 'http://localhost:8080/';  
  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson)
    setUsers(usersToJson);
  };

  const createUser = async (e) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/users`, {
    method: 'POST',
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({ 
      firstname: e.target.firstname.value, 
      lastname: e.target.lastname.value, 
      age: e.target.age.value, 
      Gender: e.target.Gender.value, 
      isAdmin: e.target.isAdmin.value
     })
    });
    const newUser = await response.json();
    setUsers([...users, newUser]);
}

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1>New User</h1>
    <form onSubmit={createUser}>
      <label htmlFor="firstname">firstname</label>
      <input type="text" name="firstname" id="firstName" />
      <label htmlFor="lastname">lastname</label>
      <input type="text" name="lastname" id="lastName" />
      <label htmlFor="age">age</label>
      <input type="text" name="age" id="ages" />
      <label htmlFor="Gender">Gender</label>
      <input type="text" name="Gender" id="Genders" />
      <label htmlFor="isAdmin">Is Admin</label>
      <input type="checkbox" name="isAdmin"/>
      <input type="submit" />
    </form>

      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>firstname</th>
            <th>lastname</th>
            <th>age</th>
            <th>Gender</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.age}</td>
              <td>{user.Gender}</td>
              <td>{user.isAdmin.toString()}</td>
              </tr>)
          )}
        </tbody>
      </table>
    </>
  );
}

export default App
