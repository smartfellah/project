interface VacancyCardProps {
  goToVacancy: (e: React.MouseEvent<HTMLElement>) => void;
  item: IVacancy;
}

import { FC } from "react";
import { IVacancy } from "../../pages/search-page";
import styles from "./vacancy-card.module.css";
export const VacancyCard: FC<VacancyCardProps> = ({ item, goToVacancy }) => {
  return (
    <li onClick={goToVacancy} className={styles.VacanciesListContainer}>
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
