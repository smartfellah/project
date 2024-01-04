import { FC, useEffect, useState } from "react";

import styles from "./profile-page.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../services/store";
import { useNavigate } from "react-router";
import { User, setUser } from "../services/reducers/userSlice";
import axios from "axios";

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    if (!user?.email) {
      navigate("/signup");
    }
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(setUser({} as User));
    deleteCookie("token");
    navigate("/login");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const updatedUser = { ...user, name, email };
    dispatch(setUser(updatedUser));
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // Set the authorization token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put("http://localhost:8080/api/user", { name, email }, config)
      .then((response) => {
        // Handle the response if needed
        console.log("User info updated successfully", response.data);
      })
      .catch((error) => {
        // Handle the error if needed
        console.error("Failed to update user info", error);
      });
  };

  return (
    <div className={styles.Container}>
      <div className={styles.UserInfo}>
        <h1 className={styles.Greeting}>
          Welcome, <span className={styles.Username}>{user?.name}</span>
        </h1>
        <div className={styles.UserInfoInput}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.UserInfoInput}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        {!isEditing && (
          <button className={styles.EditButton} onClick={handleEditClick}>
            Edit
          </button>
        )}
        {isEditing && (
          <>
            <button className={styles.EditButton} onClick={handleSaveClick}>
              Save
            </button>
            <button
              className={styles.CancelButton}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        )}
        <button className={styles.LogoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export { ProfilePage };
