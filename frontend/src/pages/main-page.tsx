import styles from "./main-page.module.css";

import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";

import { FC, useState } from "react";

const MainPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchParams(value);
    event.preventDefault();

    navigate({
      pathname: "search",
      search: `?${createSearchParams({
        q: value,
      })}`,
    });
  };

  return (
    <div className={styles.Container}>
      <div></div>
      <div className={styles.BannerContainer}>
        <p className={styles.BannerText}>
          Labor was the first price, the original purchase - money that was paid
          for all things.
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.ButtonContainer}>
        <input
          onChange={handleChange}
          className={styles.TextInput}
          type="text"
          name=""
          id=""
        />

        <button type="submit" className={styles.SearchButton}>
          <p className={styles.ButtonText}>Find the job</p>
        </button>
      </form>
      <div></div>
    </div>
  );
};

export { MainPage };
