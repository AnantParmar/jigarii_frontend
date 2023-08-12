import React, {useContext, useEffect} from 'react'
import quoteContext from "../context/quotes/quoteContext"
import '../CSS/Home.css'
import Quotes from './Quotes'
import Loading from './Loading'
const Home = () => {
  const {getQuotes,quotes} = useContext(quoteContext)
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
  useEffect(() => {
    const secureCookie = getCookie('sessionID')
    console.log("secureCookie is "+secureCookie)
    // setLoginedUser()
    getQuotes()
    // eslint-disable-next-line
  }, []);
  return (
    <div id='homeDiv'>
      <Loading/>
      <Quotes/>
    </div>
  )
}

export default Home
