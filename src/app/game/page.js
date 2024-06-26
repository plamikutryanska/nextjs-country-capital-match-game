import CountryCapitalMatch from '../components/CountyCapitalMatch'
import styles from '../components/countryCapitalMatch.module.css'

export default function Page() {
  return (
    <div className={styles.container}>
      <CountryCapitalMatch/>
    </div>
  );
}