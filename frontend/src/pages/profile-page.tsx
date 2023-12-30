import { FC } from "react";

import styles from "./profile-page.module.css";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { User, addUser, userSelector } from "../services/reducers/userSlice";

const ProfilePage: FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([
    {
      id: 0,
      username: "",
      email: "",
      password: "",
      roleId: 1,
    },
  ]);
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
    fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify({
        email: newUserEmail,
        username: newUserName,
        password: "password",
        roleId: 1,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) setItems([...result.vacancies]);
          setError(false);
        },
        (error) => {
          console.log(error);
          setError(true);
        }
      )
      .finally(() => setIsLoaded(true));
  }
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) setItems([...result]);
          setError(false);
        },
        (error) => {
          console.log(error);
          setError(true);
        }
      )
      .finally(() => setIsLoaded(true));
  }, [items]);
  return (
    <div className={styles.Container}>
      <div className={styles.OptionsContainer}>
        <div className={styles.TitleBox}>
          <p className={styles.Title}>Profile settings</p>
        </div>
        <div className={styles.Options}>
          {items.map((item) => (
            <div className={item.id % 2 ? styles.InfoBox_1 : styles.InfoBox_2}>
              <div className={styles.InfoBar}>
                <div className={styles.InfoBox1}>
                  <p className={styles.InfoText}>Name</p>
                </div>
                <div className={styles.InfoBox2}>
                  <p className={styles.InfoText}>{item.username}</p>
                  <p className={styles.InfoText}>Change</p>
                </div>
              </div>
              <div className={styles.InfoBar}>
                <div className={styles.InfoBox1}>
                  <p className={styles.InfoText}>Email</p>
                </div>
                <div className={styles.InfoBox2}>
                  <p className={styles.InfoText}>{item.email}</p>
                  <p className={styles.InfoText}>Change</p>
                </div>
              </div>
            </div>
          ))}
          {/* {users.map((user) => (
            <li key={user.id}>
              {user.id} | {user.name} | {user.email}
            </li>
          ))} */}

          <div className={styles.AddUserForm}>
            <input
              className={styles.InputText}
              type="text"
              placeholder="Name"
              aria-label="name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            ></input>
            <input
              className={styles.InputText}
              type="text"
              placeholder="Email"
              aria-label="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            ></input>
            <button
              type="submit"
              className={styles.PostButton}
              onClick={handleAddUser}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
