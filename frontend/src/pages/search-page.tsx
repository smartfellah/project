import { useNavigate } from "react-router";
import styles from "./search-page.module.css";
import { FC, useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";

import { useSearchParams } from "react-router-dom";

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

interface ISuggestion {
  id: number;
  userId: number;
  companyId: number;
  title: string;
  content: string;
  experience: string;
  location: string;
}

const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //used for fetching
  const [error, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([
    {
      id: 0,
      userId: 0,
      companyId: 0,
      title: "",
      content: "",
      experience: "",
      location: "",
    },
  ]);
  const [suggestions, setSuggestions] = useState<ISuggestion>();

  //set search query to empty string

  const p = searchParams.get("q");
  const [q, setQ] = useState(p);
  // const [searchParam] = useState(["capital", "name"]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    // setIsLoaded(false);
    setQ(event.currentTarget.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:8080/vacancies?" + searchParams)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) setItems([...result.vacancies]);
          setError(false);
        },
        (error) => {
          console.log(error);
          setError(true);
        }
      )
      .finally(() => setIsLoaded(true));
  };

  useEffect(() => {
    setSearchParams({ q: q });
  }, [q]);
  console.log(items);
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
          {isLoaded && !error
            ? items.map((item) => (
                <li className={styles.VacanciesListContainer}>
                  <article className={styles.VacancyItem} key={item.id}>
                    <h2 className={styles.VacancyTitle}>{item.title}</h2>
                    <ol className={styles.DescriptionContainer}>
                      <li>
                        <p className={styles.VacancyExp}>
                          Experience: {item.experience}
                        </p>
                      </li>
                      <li>
                        <p className={styles.VacancyLoc}>
                          Location: {item.location}
                        </p>
                      </li>
                    </ol>
                  </article>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export { SearchPage };
