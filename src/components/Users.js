import { Link, Route, Routes, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const { path, url } = useRouteMatch();
  console.log(path, url);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      {loading && <div>Loading...</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route exact path={path}>
          <h3>Please select a user.</h3>
        </Route>
        <Route path={`${path}/:id`} element={<User />}></Route>
      </Routes>
    </div>
  );
}

export default Users;
