import { useNavigate } from "react-router";
import styles from "./search-page.module.css";
import { FC, useState } from "react";
import { createSearchParams } from "react-router-dom";

const SearchPage: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate({
      pathname: "search",
      search: `?${createSearchParams({
        search: value,
      })}`,
    });
  };
  return (
    <div>
      <div className={styles.SearchFormContainer}>
        <div className={styles.Container}>
          <form onSubmit={handleSubmit} className={styles.ButtonContainer}>
            <input
              onChange={handleChange}
              className={styles.TextInput}
              type="text"
              name=""
              id=""
            />

            <button type="submit" className={styles.SearchButton}>
              <p className={styles.ButtonText}>Search</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { SearchPage };
