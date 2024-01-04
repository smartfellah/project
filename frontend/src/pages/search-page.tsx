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

  const p = searchParams.get("q");
  const [q, setQ] = useState((p as string) || "");

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setQ(event.currentTarget.value);
  }

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
  // useEffect(() => {
  //   setSearchParams({ q: q, ...searchParams });
  // }, [q, searchParams, setSearchParams]);
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

// interface ISuggestion {
//   id: number;
//   userId: number;
//   companyId: number;
//   title: string;
//   content: string;
//   experience: string;
//   location: string;
// }

export { SearchPage };
