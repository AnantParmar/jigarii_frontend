import React, {useContext, useEffect} from 'react'
import quoteContext from "../context/quotes/quoteContext"
import '../CSS/Home.css'
import Quotes from './Quotes'
import Loading from './Loading'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config'
const Home = () => {
  const {getQuotes,getLikedCount,setUser} = useContext(quoteContext)

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        getLikedCount(user)
        console.log('Persisted user:', user);
      } else {
        console.log('No persisted user');
      }
    });

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
