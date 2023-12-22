import { useNavigate } from "react-router";
import styles from "./search-page.module.css";
import { FC, useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";

import data from "./fake-vacancies.json";

interface IVacancy {
  id: number;
  userId: number;
  companyId: number;
  title: string;
  content: string;
  experience: string;
  location: string;
}

const SearchPage: FC = () => {
  const navigate = useNavigate();
  //used for fetching
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IVacancy>();

  //set search query to empty string
  const [q, setQ] = useState<string>("");
  const [searchParam] = useState(["capital", "name"]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setQ(event.currentTarget.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate({
      pathname: "search",
      search: `?${createSearchParams({
        search: q,
      })}`,
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/vacancies")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      <div className={styles.SearchFormContainer}>
        <div className={styles.Container}>
          <form onSubmit={handleSubmit} className={styles.ButtonContainer}>
            <input
              onChange={handleChange}
              className={styles.TextInput}
              type="search"
              name="search-form"
              placeholder="search..."
              id="search-form"
              value={q}
            />

            <button type="submit" className={styles.SearchButton}>
              <p className={styles.ButtonText}>Search</p>
            </button>
          </form>
        </div>
      </div>
      <div>
        <ul className={styles.VacanciesList}>
          {items?.map((item) => (
            <li className={styles.VacanciesListContainer}>
              <article className={styles.VacancyItem} key={item.id}>
                <h2 className={styles.VacancyTitle}>{item.title}</h2>
                <ol className={styles.DescriptionContainer}>
                  <li className={styles.VacancyExp}>
                    Experience: <span>{item.experience}</span>
                  </li>
                  <li className={styles.VacancyLoc}>
                    Location: <span>{item.location}</span>
                  </li>
                </ol>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { SearchPage };
