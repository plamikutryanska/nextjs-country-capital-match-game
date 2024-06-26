import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  return (
      <main className={styles.main}>
        <h1 className={styles.welcomeTexpxt}>Welcome to Country Capital Match Game</h1>
        <Link 
          href={'/game'}
          className={styles.link}
          >
          Start Game
        </Link>
    </main>
  );
}
