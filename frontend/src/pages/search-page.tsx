import styles from "./search-page.module.css";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VacancyCard } from "../components/vacancy-card/vacancy-card";

const SearchPage: FC = () => {
  const navigate = useNavigate();
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
  }, [q, setSearchParams]);
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
                <VacancyCard
                  goToVacancy={(e) => {
                    e.preventDefault();
                    navigate(`/vacancies/${item.id}`, {
                      state: { itemId: item.id },
                    });
                  }}
                  item={item}
                  key={item.id}
                ></VacancyCard>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export interface IVacancy {
  id: number;
  company: {
    title: string;
  };
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
