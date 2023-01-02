import styles from './Home.module.scss';

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.Home}>
      <p>Home works!</p>
    </div>
  );
}
