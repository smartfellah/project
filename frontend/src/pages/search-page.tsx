import styles from "./search-page.module.css";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VacancyCard } from "../components/vacancy-card/vacancy-card";

const PAGE_LIMIT = "10";

const SearchPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  //used for fetching
  const [error, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [vacancies, setvacancies] = useState([] as IVacancy[]);
  const [currentPage, setCurrentPage] = useState(1 as number);
  // const [totalCount, setTotalCount] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>(currentPage);

  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const [suggestions, setSuggestions] = useState([] as { title: string }[]);

  const p = searchParams.get("q");
  const [q, setQ] = useState((p as string) || "");

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setQ(event.currentTarget.value);
  }

  useEffect(() => {
    if (!q) setDisplaySuggestions(false);
    else setDisplaySuggestions(true);
  }, [q, setQ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchParams({ q: q, ...searchParams });
    event.preventDefault();
  };

  function Pagination(totalPages: number, currentPage: number) {
    return (
      <div className={styles.PaginationContainer}>
        <button
          onClick={onPreviousClick}
          className={currentPage > 1 ? styles.PrevActive : styles.PrevInactive}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          if (pageNumber != currentPage) {
            return (
              <button
                onClick={() => onPageClick(pageNumber)}
                className={styles.PaginationButton}
                key={i}
              >
                {pageNumber}
              </button>
            );
          } else
            return (
              <button
                onClick={() => onPageClick(pageNumber)}
                className={styles.ActivePaginationButton}
                key={i}
              >
                {pageNumber}
              </button>
            );
        })}
        <button
          onClick={onNextClick}
          className={
            currentPage < totalPages ? styles.PrevActive : styles.PrevInactive
          }
        >
          Next
        </button>
      </div>
    );
  }

  const onPreviousClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const toPage: number = currentPage - 1;
    if (currentPage > 1) {
      setSearchParams({
        q: q,
        page: toPage.toString(),
        limit: PAGE_LIMIT,
      });
      setCurrentPage(toPage);
    }
  };

  const onNextClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const toPage: number = Number(currentPage) + Number(1);
    if (currentPage < totalPages) {
      setSearchParams({
        q: q,
        page: toPage.toString(),
        limit: PAGE_LIMIT,
      });
      setCurrentPage(toPage);
    }
  };

  const onPageClick = (pageNumber: number) => {
    setSearchParams({
      q: q,
      page: pageNumber.toString(),
      limit: PAGE_LIMIT,
    });
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (currentPage && searchParams) {
      setIsLoaded(false);

      fetch("http://localhost:8080/vacancies?" + searchParams)
        .then((res) => res.json())
        .then(
          (result: VacanciesResponseObject) => {
            console.log(result);
            if (result) setvacancies([...result.vacancies]);
            setCurrentPage(result.currentPage);
            setTotalPages(result.totalPages);
            setError(false);
          },
          (error) => {
            console.log(error);
            setError(true);
          }
        )
        .finally(() => setIsLoaded(true));
    }
  }, [currentPage, searchParams]);
  useEffect(() => {
    if (q) {
      fetch(`http://localhost:8080/vacancy-suggestions?q=${q}`)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result) setSuggestions([...result.suggestions]);
            setError(false);
          },
          (error) => {
            console.log(error);
            setError(true);
          }
        )
        .finally(() => setIsLoaded(true));
    }
  }, [q, setQ]);

  // Render the filtered suggestions
  const renderSuggestions = () => {
    return suggestions.map((suggestion) => (
      <div
        onClick={() => setQ(suggestion.title)}
        className={styles.Suggestion}
        key={suggestion.title}
      >
        {suggestion.title}
      </div>
    ));
  };
  return (
    <div>
      <div className={styles.SearchAndSuggestions}>
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
                autoComplete="off"
                onFocus={() => setDisplaySuggestions(true)}
                onBlur={() => setDisplaySuggestions(false)}
              />
              <div className={styles.SuggestionsContainer}>
                {displaySuggestions ? renderSuggestions() : null}
              </div>

              <button type="submit" className={styles.SearchButton}>
                <p className={styles.ButtonText}>Search</p>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.MainContainer}>
        <section className={styles.FilterSection}>
          <h2 style={{ fontWeight: "bold", fontSize: "32px" }}>Filters</h2>
          <div className={styles.FilterContainer}>
            <label htmlFor="location">Location:</label>
            <select id="location" name="location">
              <option value="">All</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>
          <div className={styles.FilterContainer}>
            <label htmlFor="experience">Experience:</label>
            <select id="experience" name="experience">
              <option value="">All</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
            </select>
          </div>
        </section>
        <ul className={styles.VacanciesList}>
          {isLoaded && !error
            ? vacancies.map((item) => (
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
      {totalPages ? Pagination(totalPages, currentPage) : null}
    </div>
  );
};

export interface VacanciesResponseObject {
  vacancies: IVacancy[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
}
export interface IVacancy {
  id: number;
  salary: string;
  company: {
    title: string;
    logo: string;
    description: string;
  };
  title: string;
  content: string;
  experience: string;
  location: string;
}

export { SearchPage };
