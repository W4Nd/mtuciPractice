import { useNavigate } from 'react-router-dom';
import styles from '../styles/NotFound.module.scss';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <motion.div
      className={styles.notFound}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div className={styles.notFound__content}>
        <h1 className={styles.notFound__title}>404</h1>
        <p className={styles.notFound__text}>Page you’re looking for is not found.</p>
        <button className={styles.notFound__button} onClick={handleClick}>
          Take me home
        </button>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
