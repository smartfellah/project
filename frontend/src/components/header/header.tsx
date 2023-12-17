import styles from "./header.module.css";

//icons import
import likeActive from "../../assets/like_active.svg";
import likeInactive from "../../assets/like_inactive.svg";
import profileActive from "../../assets/profile_active.svg";
import profileInactive from "../../assets/profile_inactive.svg";
import searchActive from "../../assets/search_active.svg";
import searchInactive from "../../assets/search_inactive.svg";
import logoActive from "../../assets/logo_active.svg";
import logoInactive from "../../assets/logo_inactive.svg";

import React, { FC } from "react";

const Header: FC = () => {
  return (
    <header className={styles.Header}>
      <nav className={styles.NavBar}>
        <menu className={styles.MenuBox}>
          <div
            className={
              // eslint-disable-next-line no-constant-condition
              true
                ? `${styles["MenuBox-Item"]} ${styles["MenuBox-Item-Active"]}`
                : `${styles["MenuBox-Item"]}`
            }
          >
            <img
              // eslint-disable-next-line no-constant-condition
              src={true ? likeActive : likeInactive}
              alt="liked vacancies image"
              height={24}
            />

            <p
              className={
                // eslint-disable-next-line no-constant-condition
                true
                  ? `${styles.LinkText} ${styles.LinkText_Active}`
                  : styles.LinkText
              }
            >
              Favorites
            </p>
          </div>
          <div
            className={
              // eslint-disable-next-line no-constant-condition
              true
                ? `${styles["MenuBox-Item"]}`
                : `${styles["MenuBox-Item"]} ${styles["MenuBox-Item-Active"]}`
            }
          >
            <img
              // eslint-disable-next-line no-constant-condition
              src={false ? searchActive : searchInactive}
              alt="liked vacancies image"
              height={24}
            />

            <p
              className={
                // eslint-disable-next-line no-constant-condition
                false
                  ? `${styles.LinkText} ${styles.LinkText_Active}`
                  : styles.LinkText
              }
            >
              Favorites
            </p>
          </div>
        </menu>
        <div className={styles.LogoBox}>
          <div
            className={
              // eslint-disable-next-line no-constant-condition
              true
                ? `${styles["LogoBox-Item"]}`
                : `${styles["LogoBox-Item"]} ${styles["LogoBox-Item-Active"]}`
            }
          >
            <img
              // eslint-disable-next-line no-constant-condition
              src={false ? logoActive : logoInactive}
              alt="liked vacancies image"
              height={40}
            />
          </div>
        </div>
        <div className={styles.ProfileBox}>
          <div className={`${styles["ProfileBox-Item"]}`}>
            <img
              // eslint-disable-next-line no-constant-condition
              src={true ? profileInactive : profileActive}
              alt="liked vacancies image"
              height={24}
            />
            <p className={styles.LinkText}>Profile</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
