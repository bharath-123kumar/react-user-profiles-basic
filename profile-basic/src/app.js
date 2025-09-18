import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Profiles</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 mb-4" key={user.id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
