import { Navigation } from './Navigation';
import { SocialRails } from '../common/SocialRails';
import { ScrollProgress } from '../common/ScrollProgress';
import styles from './Layout.module.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <ScrollProgress />
      <Navigation />
      <SocialRails />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
    </div>
  );
};
