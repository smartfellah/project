interface VacancyCardProps {
  item: IVacancy;
}

import { FC } from "react";
import { IVacancy } from "../../pages/search-page";
import styles from "./vacancy-card.module.css";
export const VacancyCard: FC<VacancyCardProps> = ({ item }) => {
  return (
    <li className={styles.VacanciesListContainer}>
      <article className={styles.VacancyItem} key={item.id}>
        <h2 className={styles.VacancyTitle}>{item.title}</h2>
        <ol className={styles.DescriptionContainer}>
          <li>
            <p className={styles.VacancyExp}>Experience: {item.experience}</p>
          </li>
          <li>
            <p className={styles.VacancyLoc}>Location: {item.location}</p>
          </li>
        </ol>
      </article>
    </li>
  );
};
