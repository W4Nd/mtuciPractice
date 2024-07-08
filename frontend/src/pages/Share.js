import styles from '../styles/Share.module.scss';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success('Скопировано!', {
      position: 'bottom-center',
      id: 'clipboard',
    });
  } catch (err) {
    toast.error('Что-то пошло не так.', {
      position: 'bottom-center',
      id: 'clipboard',
    });
  }
};

const ShareComponent = (props) => {
  const { suid, uuid, filesize } = props;
  const link = `https://p2p.mindes.ru/${suid}`;

  return (
    <motion.div
      className={styles.share}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <Toaster
        toastOptions={{
          className: styles.toaster,
          style: {
            borderRadius: '16px',
            padding: '5px 5px 5px 10px',
          },
          success: {
            iconTheme: {
              primary: '#2EA7F8',
              secondary: 'black',
            },
          },
        }}
      />
      <div className={styles.share__background}></div>

      <div className={styles.share__id} onClick={() => copyToClipboard(uuid)}>
        ID: {uuid}
      </div>

      <div className={styles.share__content}>
        <div className={styles.share__header}>
          <span className={styles.share__highlight}>Ссылка</span> на ваш файл
        </div>
        <div className={styles.share__link} onClick={() => copyToClipboard(link)}>
          {link}
        </div>
        <div className={styles.share__size}>Размер: {filesize}мб</div>
      </div>
    </motion.div>
  );
};

export default ShareComponent;
