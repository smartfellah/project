import { useNavigate } from "react-router";
import styles from "./search-page.module.css";
import { FC, useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";

import data from "./fake-vacancies.json";

interface IVacancy {
  title: string;
  description: string;
  company: string;
  experience: number;
  location: string;
}

type Vacancy = typeof data;

const SearchPage: FC = () => {
  const navigate = useNavigate();
  //used for fetching
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Vacancy>();

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
    setItems(data);
    // fetch("https://restcountries.eu/rest/v2/all")
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       setIsLoaded(true);
    //       setItems(result);
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       setIsLoaded(true);
    //       setError(error);
    //     }
    //   );
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
      <ul className="card-grid">
        {items?.map((item) => (
          <li>
            <article className="card" key={item.id}>
              <div className="card-content">
                <h2 className="card-name">{item.title}</h2>
                <ol className="card-list">
                  <li>
                    population: <span>{item.company}</span>
                  </li>
                  <li>
                    Region: <span>{item.experience}</span>
                  </li>
                  <li>
                    Capital: <span>{item.location}</span>
                  </li>
                </ol>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SearchPage };
