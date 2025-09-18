import React from "react";

function UserCard({ user }) {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;

  return (
    <div className="card shadow-sm">
      <img src={avatarUrl} className="card-img-top" alt={user.username} />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {user.email} <br />
          <strong>Phone:</strong> {user.phone} <br />
          <strong>Website:</strong>{" "}
          <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
            {user.website}
          </a>
          <br />
          <strong>Company:</strong> {user.company.name}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
