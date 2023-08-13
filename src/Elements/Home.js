import React, {useContext, useEffect} from 'react'
import quoteContext from "../context/quotes/quoteContext"
import '../CSS/Home.css'
import Quotes from './Quotes'
import Loading from './Loading'
const Home = () => {
  const {getQuotes,quotes,setLoginedUser} = useContext(quoteContext)
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
    const secureCookie = getCookie('random')
    console.log("secureCookie is "+secureCookie)
    // setLoginedUser()
    const customToken=document.cookie.customToken;
    console.log("home"+customToken)
    if(customToken)
    setLoginedUser(customToken);
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
