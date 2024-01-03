import { useEffect, useState } from "react";
import { IVacancy } from "./search-page";
import styles from "./single-vacancy-page.module.css";
import { useLocation } from "react-router";

export const SingleVacancy = () => {
  const [vacancy, setVacancy] = useState<IVacancy>({} as IVacancy);
  const location = useLocation();
  useEffect(() => {
    fetch(`http://localhost:8080/vacancies/${location.state.itemId}`)
      .then((res) => res.json())
      .then((result) => {
        setVacancy(result);
      });
  }, [location.state.itemId]);
  return (
    vacancy?.title && (
      <div className={styles.Container}>
        <div className={styles.MainContent}>
          <div className={styles.VacancyCard}>
            <h1 className={styles.CardTitle}>{vacancy.title}</h1>
            <p className={styles.CardExperience}>{vacancy.experience}</p>
          </div>
          <article className={styles.CardDescription}>
            {vacancy.content}
          </article>
        </div>
        <div className={styles.SideContent}>
          <div className={styles.CompanyCard}>
            <h2>{vacancy.company.title}</h2>
          </div>
        </div>
      </div>
    )
  );
};
