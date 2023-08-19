import React, {useContext, useEffect} from 'react'
import quoteContext from "../context/quotes/quoteContext"
import '../CSS/Home.css'
import Quotes from './Quotes'
import Loading from './Loading'
import { auth } from '../config'
const Home = () => {
  const {getQuotes} = useContext(quoteContext)

  useEffect(() => {
    getQuotes()
  }, [auth]);
  return (
    <div id='homeDiv'>
      <Loading/>
      <Quotes/>
    </div>
  )
}

export default Home
