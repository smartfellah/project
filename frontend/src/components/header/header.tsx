//import styles
import styles from "./header.module.css";

//import Router
import { NavLink } from "react-router-dom";

//icons import
import likeActive from "../../assets/like_active.svg";
import likeInactive from "../../assets/like_inactive.svg";
import profileActive from "../../assets/profile_active.svg";
import profileInactive from "../../assets/profile_inactive.svg";
import searchActive from "../../assets/search_active.svg";
import searchInactive from "../../assets/search_inactive.svg";
import logoActive from "../../assets/logo_active.svg";
import logoInactive from "../../assets/logo_inactive.svg";

import { FC } from "react";

const Header: FC = () => {
  return (
    <header className={styles.Header}>
      <nav className={styles.NavBar}>
        <menu className={styles.MenuBox}>
          <NavLink to="/favorites" className={styles.BoxItem}>
            {function favoritesLink({ isActive }: { isActive: boolean }) {
              return (
                <div
                  className={
                    isActive
                      ? `${styles.Container} ${styles.Container_Active}`
                      : styles.Container
                  }
                >
                  <img
                    src={isActive ? likeActive : likeInactive}
                    alt="liked vacancies icon"
                    height={24}
                  />

                  <p
                    className={
                      isActive
                        ? `${styles.LinkText} ${styles.LinkText_Active}`
                        : styles.LinkText
                    }
                  >
                    Favorites
                  </p>
                </div>
              );
            }}
          </NavLink>
          <NavLink to="/search" className={styles.BoxItem}>
            {function searchLink({ isActive }: { isActive: boolean }) {
              return (
                <div
                  className={
                    isActive
                      ? `${styles.Container} ${styles.Container_Active}`
                      : styles.Container
                  }
                >
                  <img
                    src={isActive ? searchActive : searchInactive}
                    alt="search icon"
                    height={24}
                  />

                  <p
                    className={
                      isActive
                        ? `${styles.LinkText} ${styles.LinkText_Active}`
                        : styles.LinkText
                    }
                  >
                    Search
                  </p>
                </div>
              );
            }}
          </NavLink>
        </menu>
        <div className={styles.LogoBox}>
          <NavLink to="/" className={styles.BoxItem}>
            {function logoLink({ isActive }: { isActive: boolean }) {
              return (
                <img
                  src={isActive ? logoActive : logoInactive}
                  alt="project vvid logo"
                  height={40}
                />
              );
            }}
          </NavLink>
        </div>
        <div className={styles.ProfileBox}>
          <NavLink to="/profile" className={styles.BoxItem}>
            {function profileLink({ isActive }: { isActive: boolean }) {
              return (
                <div
                  className={
                    isActive
                      ? `${styles.Container} ${styles.Container_Active}`
                      : styles.Container
                  }
                >
                  <img
                    src={isActive ? profileActive : profileInactive}
                    alt="profile icon"
                    height={24}
                  />
                  <p
                    className={
                      isActive
                        ? `${styles.LinkText} ${styles.LinkText_Active}`
                        : styles.LinkText
                    }
                  >
                    Profile
                  </p>
                </div>
              );
            }}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export { Header };
