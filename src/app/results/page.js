'use client'
import ScoreBoard from "../components/ScoreBoard";
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')

  return <ScoreBoard score={score}/>;
}