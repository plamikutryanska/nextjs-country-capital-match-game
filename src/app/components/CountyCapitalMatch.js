"use client"
import {useState, useEffect} from 'react'
import { isSelectionCorrect, removeData } from '../utils/countryCapitalUtils'
import styles from '../components/countryCapitalMatch.module.css'
import _ from 'lodash'
import Link from 'next/link'

const mockData = [
  {
      "name": "Austria",
      "capital": "Vienna"
  },
  // {
  //     "name": "Belgium",
  //     "capital": "Brussels"
  // },
  {
      "name": "Bulgaria",
      "capital": "Sofia"
  },
  // {
  //     "name": "France",
  //     "capital": "Paris"
  // },
  // {
  //     "name": "Germany",
  //     "capital": "Berlin"
  // },
  // {
  //     "name": "Italy",
  //     "capital": "Rome"
  // },
  // {
  //     "name": "Netherlands",
  //     "capital": "Amsterdam"
  // },
  // {
  //     "name": "Poland",
  //     "capital": "Warsaw"
  // }
]

const CountryCapitalMatch = () => {
  const [shuffledCountries, setShuffledCountries] = useState([])
  const [shuffledCapitals, setShuffledCapitals] = useState([])

  const [correctMatches, setCorrectMatches] = useState([])

  const [selectedPair, setSelectedPair] = useState([])
  const [score, setScore] = useState(30)
  const [matchIsIncorrect, setMatchIsIncorrect] = useState(false)

  const [isPairCorrect, setIsPairCorrect] = useState(false)

  const buttonIsDisabled = selectedPair.length < 1


  useEffect(() => {
    setShuffledCountries(_.shuffle(mockData))
    setShuffledCapitals(_.shuffle(mockData))
  }, [])


  const handleSelectedCapital = (selectedCapitalData) => {
    setSelectedPair((prv) => [...prv, selectedCapitalData])

    if(_.isEqual(selectedCapitalData, selectedPair[0])){
      setScore(score + 7)
      setMatchIsIncorrect(false)
      setIsPairCorrect(true) //NEW

      setCorrectMatches((prvCorrectMatch) => [...prvCorrectMatch, selectedCapitalData])
      setTimeout(() => {
        setShuffledCapitals((prv) => removeData(prv, selectedCapitalData))
        setShuffledCountries((prv) => removeData(prv, selectedCapitalData))

      }, 1000)
    } else {
      setScore(score - 5)
      setMatchIsIncorrect(true)
      setIsPairCorrect(false) //NEW

    }
    setTimeout(()=> {
      setSelectedPair([])
      setMatchIsIncorrect(false)
      setIsPairCorrect(true) //NEW
    }, 1000)
  }


const ButtonComponent = ({data, onClick, pairIndex, objectKey}) => {
  return (
    <button 
      onClick={onClick}
      key={data[objectKey]}
      className={
        `${styles.button} 
        ${isSelectionCorrect(data, selectedPair) && styles.correctSelection}
        ${_.isEqual(selectedPair[pairIndex], data) && styles.activeSelection}
        ${(matchIsIncorrect && _.isEqual(selectedPair[pairIndex], data)) && styles.incorrectSelection}
        `
      }
    > 
      {data[objectKey]}
    </button>
  )
}

const CountryCapitlLists = () => {
    return (
      <div style={{display: 'flex'}}>
      <div className={styles.buttonContainer}>
      {shuffledCountries.map((data) => {
        return (
          <ButtonComponent data={data} pairIndex={0} onClick={() => setSelectedPair([data])} objectKey={'name'}/>
        )
      })}
      </div>
      <div className={styles.buttonContainer}>
      {shuffledCapitals.map((data) => {
        return (
          <ButtonComponent data={data} pairIndex={1} onClick={() => handleSelectedCapital(data)} objectKey={'capital'}/>
        )
      })}
      </div>
    </div>
    )
}


  return (
    <div className={styles.container}>
      {
        correctMatches.length !== mockData.length ? 
        <CountryCapitlLists/> : 
        <Link href={{pathname: '/results', query: {score: score}}} className={styles.link}>
          View Results
        </Link>}
    </div>

  )
}

export default CountryCapitalMatch