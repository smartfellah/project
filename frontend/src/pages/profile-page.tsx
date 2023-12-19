import { FC } from "react";

import styles from "./profile-page.module.css";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { User, addUser, userSelector } from "../services/reducers/userSlice";

const ProfilePage: FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const selectedUsers = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setUsers(selectedUsers);
    return () => {
      console.log("component unmounting...");
    };
  }, [selectedUsers]);
  function handleAddUser() {
    const newUser = {
      id: (users.length + 1).toString(),
      name: newUserName,
      email: newUserEmail,
    };
    dispatch(addUser(newUser));
  }
  return (
    <div className={styles.Container}>
      <div className={styles.OptionsContainer}>
        <p className={styles.MenuText}>Profile settings</p>
        <div className={styles.Options}>
          {/* {users.map((user) => (
            <li key={user.id}>
              {user.id} | {user.name} | {user.email}
            </li>
          ))} */}
          <div className={styles.InfoBar}>
            <div className={styles.InfoBox1}>
              <p className={styles.InfoText}>Name</p>
            </div>
            <div className={styles.InfoBox2}>
              <p className={styles.InfoText}>John</p>
              <p className={styles.InfoText}>Изменить</p>
            </div>
          </div>
          <div className={styles.InfoBar}>
            <div className={styles.InfoBox1}>
              <p className={styles.InfoText}>Name</p>
            </div>
            <div className={styles.InfoBox2}>
              <p className={styles.InfoText}>John</p>
              <p className={styles.InfoText}>Изменить</p>
            </div>
          </div>
          <div className={styles.InfoBar}>
            <div className={styles.InfoBox1}>
              <p className={styles.InfoText}>Name</p>
            </div>
            <div className={styles.InfoBox2}>
              <p className={styles.InfoText}>John</p>
              <p className={styles.InfoText}>Изменить</p>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Name"
              aria-label="name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Email"
              aria-label="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            ></input>
            <button type="submit" className="btn" onClick={handleAddUser}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
