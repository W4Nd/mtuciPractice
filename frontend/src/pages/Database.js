import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Database.module.scss';
import { motion } from 'framer-motion';
import Pagination from '../components/Pagination';
import getAllVacancies from '../services/dbApi';
import createVacancyElements from '../utils/vacanciesBuilder';

const DatabasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [vacancies, setVacancies] = useState([]);
  const [info, setInfo] = useState({});
  const [setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);

  const currentPage = searchParams.get('page');

  const fetchVacancies = async () => {
    try {
      const data = await getAllVacancies(currentPage ? currentPage : 0);
      console.log(data);
      setVacancies(data.vacancies);
      setInfo(data.info);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', pageNumber - 1);
    navigate({ search: queryParams.toString() }, { replace: true });
    fetchVacancies();
  };

  useEffect(() => {
    fetchVacancies();
  },);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Все вакансии</h1>
          <span className={styles.count}>
            {info && info.totalVacancies ? info.totalVacancies : 0}{' '}
            вакансий
          </span>
        </div>
        <div className={styles.footer}>
          <Pagination
            totalPages={info ? info.totalPages : 1}
            currentPage={currentPage ? currentPage : 0}
            onPageChange={(page) => handlePageChange(page)}
          />
        </div>
        <div className={styles.vacancies}>
          {createVacancyElements(vacancies)}
        </div>
      </div>
    </motion.div>
  );
};

export default DatabasePage;
