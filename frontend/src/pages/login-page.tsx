import { useState, SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./login-page.module.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../services/reducers/userSlice";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      const { token, username } = response.data;
      const user_email = response.data.email;
      dispatch(setUser({ id: "1", name: username, email: user_email }));
      Cookies.set("token", token, { expires: 1 }); // Expires in 1 day
      navigate("/profile");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.Container}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login_email">Email: </label>
          <input
            type="email"
            name="email"
            id="login_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="login_password">Password: </label>
          <input
            type="password"
            name="password"
            id="login_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.Button} type="submit">
          Log in
        </button>
        {error && <p>{error}</p>}
      </form>
      <Link className={styles.SecondaryButton} to={"/signup"}>
        I don't have an account
      </Link>
      <Link className={styles.SecondaryButton} to={"/forgot-password"}>
        Forgot password?
      </Link>
    </div>
  );
};
