import CountryCapitalMatchLoading from '../components/CountryCpitalMatchLoading';
import styles from '../components/countryCapitalMatch.module.css'

export default async function Page() {
  return (
    <div className={styles.container}>
      <CountryCapitalMatchLoading/>
    </div>
  );
}