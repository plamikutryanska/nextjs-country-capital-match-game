import styles from '../components/scoreBoard.module.css'
import { generateMessage } from '../utils/countryCapitalUtils'


const ScoreBoard = ({score}) => {
  return (
  <div className={styles.container}>
    <div className={styles.title}>Game Over</div>
    <div className={styles.message}>{generateMessage(score)}</div>
    <div className={styles.score}>Your Final Score:</div>
    <div className={styles.circle}>{score}</div>
  </div>
  )
}

export default ScoreBoard