import styles from "./signup-page.module.css";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  return (
    <div className={styles.Container}>
      <form className={styles.Form} action="">
        <div>
          <label htmlFor="signup_email">Email: </label>
          <input type="email" name="email" id="signup_email" />
        </div>
        <div>
          <label htmlFor="signup_password">Password: </label>
          <input type="password" name="password" id="signup_password" />
        </div>
        <button className={styles.Button} type="submit">
          Sign up
        </button>
      </form>
      <Link className={styles.AlreadyHave} to={"/login"}>
        Already have an account?
      </Link>
    </div>
  );
};
