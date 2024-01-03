import { FC, useEffect } from "react";

import styles from "./profile-page.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { useNavigate } from "react-router";

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  });
  return <div className={styles.Container}></div>;
};

export { ProfilePage };
