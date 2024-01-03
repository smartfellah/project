import styles from "./login-page.module.css";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className={styles.Container}>
      <form className={styles.Form} action="">
        <div>
          <label htmlFor="login_email">Email: </label>
          <input type="email" name="email" id="login_email" />
        </div>
        <div>
          <label htmlFor="login_password">Password: </label>
          <input type="password" name="password" id="login_password" />
        </div>
        <button className={styles.Button} type="submit">
          Log in
        </button>
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
