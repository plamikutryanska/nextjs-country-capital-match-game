import { Suspense } from "react"
import CountryCapitalMatch from "./CountyCapitalMatch"

const token = 'c4caaefe5fa7dc03456136d044ab89555941a2'

const CountryCapitalMatchLoading = async () => {

  const response = await fetch('https://lenotask.000webhostapp.com/getCountiesData', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if(!response.ok){
    throw new Error('Failed to fetch data from server')
  }

  const data = await response.json()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CountryCapitalMatch responseData={data}/>
    </Suspense>
  )
}

export default CountryCapitalMatchLoading;