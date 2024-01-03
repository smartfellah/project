import styles from "./search-page.module.css";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //used for fetching
  const [error, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([] as IVacancy[]);

  const p = searchParams.get("q");
  const [q, setQ] = useState((p as string) || "");

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
          console.log(result);
          if (result) setItems([...result]);
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

export { SearchPage };
