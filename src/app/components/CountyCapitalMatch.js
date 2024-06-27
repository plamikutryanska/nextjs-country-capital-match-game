"use client"
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { isSelectionCorrect, removeData } from '../utils/countryCapitalUtils'
import styles from '../components/countryCapitalMatch.module.css'
import _ from 'lodash'

const CountryCapitalMatch = ({responseData}) => {

  const [shuffledCountries, setShuffledCountries] = useState([])
  const [shuffledCapitals, setShuffledCapitals] = useState([])

  const [correctMatches, setCorrectMatches] = useState([])
  const [selectedPair, setSelectedPair] = useState([])
  const [matchIsIncorrect, setMatchIsIncorrect] = useState(false)

  const [score, setScore] = useState(30)

  const buttonIsDisabled = selectedPair.length < 1


  useEffect(() => {
    setShuffledCountries(_.shuffle(responseData))
    setShuffledCapitals(_.shuffle(responseData))
  }, [])

  const calculteScore = (selectedCapital) => {
    if(_.isEqual(selectedCapital, selectedPair[0])){
      setScore(score + 7)
    } else {
      setScore(score - 5)
    }
  }


  const handleSelectedCapital = (selectedCapitalData) => {
    setSelectedPair((prv) => [...prv, selectedCapitalData])

    if(_.isEqual(selectedCapitalData, selectedPair[0])){
      setMatchIsIncorrect(false)

      setCorrectMatches((prvCorrectMatch) => [...prvCorrectMatch, selectedCapitalData])

      setTimeout(() => {
        setShuffledCapitals((prv) => removeData(prv, selectedCapitalData))
        setShuffledCountries((prv) => removeData(prv, selectedCapitalData))

      }, 1000)
    } else {
      setMatchIsIncorrect(true)
    }
    setTimeout(()=> {
      setSelectedPair([])
      setMatchIsIncorrect(false)
    }, 1000)
  }

const ButtonComponent = ({data, onClick, pairIndex, objectKey, isDisabled}) => {
  const style = `${styles.button} 
    ${isSelectionCorrect(data, selectedPair) && styles.correctSelection}
    ${_.isEqual(selectedPair[pairIndex], data) && styles.activeSelection}
    ${(matchIsIncorrect && _.isEqual(selectedPair[pairIndex], data)) && styles.incorrectSelection}
    ${isDisabled && styles.disabled}
  `
  return (
    <button 
      onClick={onClick}
      className={style}
      disabled={isDisabled}
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
          return <ButtonComponent 
                    data={data}
                    pairIndex={0}
                    onClick={() => setSelectedPair([data])}
                    objectKey={'name'}
                    key={data.name}
                    />
        })}
        </div>
        <div className={styles.buttonContainer}>
        {shuffledCapitals.map((data) => {
          return <ButtonComponent 
                  data={data}
                  pairIndex={1}
                  onClick={() => {handleSelectedCapital(data), calculteScore(data)}}
                  objectKey={'capital'}
                  key={data.capital}
                  isDisabled={buttonIsDisabled}
                  />
        })}
        </div>
      </div>
    )
}


  return (
    <div className={styles.container}>
      {
        correctMatches.length !== responseData.length ? 
        <CountryCapitlLists/> : 
        <Link href={{pathname: '/results', query: {score: score}}} className={styles.link}>
          View Results
        </Link>
      }
    </div>
  )
}

export default CountryCapitalMatch