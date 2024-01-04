import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./signup-page.module.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../services/reducers/userSlice";

export const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        username,
        email,
        password,
      });
      const { token } = response.data;
      const name = response.data.username;
      const user_email = response.data.email;
      dispatch(setUser({ id: "1", name: name, email: user_email }));
      Cookies.set("token", token, { expires: 1 }); // Expires in 1 day
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.Container}>
      <form className={styles.Form} onSubmit={handleSignup}>
        <div>
          <label htmlFor="signup_username">Username: </label>
          <input
            type="text"
            name="username"
            id="signup_username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="signup_email">Email: </label>
          <input
            type="email"
            name="email"
            id="signup_email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="signup_password">Password: </label>
          <input
            type="password"
            name="password"
            id="signup_password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className={styles.Button} type="submit">
          Sign up
        </button>
        {error && <p className={styles.Error}>{error}</p>}
      </form>
      <Link className={styles.AlreadyHave} to="/login">
        Already have an account?
      </Link>
    </div>
  );
};
